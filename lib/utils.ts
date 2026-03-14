import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "just now"
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h ago`
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`
  return date.toLocaleDateString()
}

/**
 * Extracts a human-readable error message from an API response object.
 * Handles strings, FastAPI details (strings or arrays), and nested structures.
 */
export function extractErrorMessage(err: unknown): string {
    if (typeof err === 'string') return err
    if (!err) return 'An unknown error occurred'

    const responseData = (err as { response?: { data: unknown }; data?: unknown })?.response?.data || 
                         (err as { data?: unknown })?.data || 
                         err
    
    if (!responseData || typeof responseData === 'string') {
        return (responseData as string) || (err as Error)?.message || 'An unknown error occurred'
    }
    
    // Helper to find message in an object
    const findInObj = (obj: unknown): string | null => {
        if (!obj || typeof obj !== 'object') return null
        
        const o = obj as Record<string, unknown>
        
        // Priority 1: 'detail' (string or array)
        const detail = o.detail
        if (detail) {
            return Array.isArray(detail)
                ? detail.map((d: unknown) => {
                    const item = d as Record<string, unknown>
                    return String(item.msg || item.message || (typeof d === 'string' ? d : JSON.stringify(d)))
                  }).join(', ')
                : typeof detail === 'string' ? detail : JSON.stringify(detail)
        }

        // Priority 2: 'message'
        if (typeof o.message === 'string') return o.message
        
        // Priority 3: 'error'
        if (typeof o.error === 'string') return o.error

        return null
    }

    // Probe at different levels
    const typedResponse = responseData as Record<string, unknown>
    const dataObj = typedResponse.data as Record<string, unknown>
    
    const msg = findInObj(responseData) || 
                findInObj(dataObj) || 
                findInObj(dataObj?.data) || 
                (typeof typedResponse.message === 'string' ? typedResponse.message : null) || 
                (typeof typedResponse.error === 'string' ? typedResponse.error : null) ||
                (err as Error).message
    
    return typeof msg === 'string' ? msg : JSON.stringify(msg) || 'An unknown error occurred'
}

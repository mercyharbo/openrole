"use client"

import { useFetch } from "./use-fetch"
import { ApiResponse } from "@/types/api-response"
import { Generation } from "@/lib/types/generation"

/**
 * Hook for fetching generations from the API.
 * @param type The type of generation (resume, cover_letter, about_me)
 */
export function useGenerations(type: 'resume' | 'cover_letter' | 'about_me') {
  const { data: response, error, isLoading, mutate } = useFetch<ApiResponse<Generation[]>>(`applicants/generations?type=${type}`)

  return {
    generations: response?.data ?? [],
    error: error || response?.error,
    isLoading,
    refreshGenerations: mutate,
  }
}

"use client"

import { useState, useEffect } from "react"
import { Resume } from "@/lib/types/resume"
import { toast } from "react-toastify"

const STORAGE_KEY = "xjobs_stored_resumes"

/**
 * Hook for managing persisted resumes in localStorage.
 */
export function useResumes() {
  const [resumes, setResumes] = useState<Resume[]>(() => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (error) {
        console.error("Failed to parse stored resumes", error)
        return []
      }
    }
    return []
  })
  const [isLoaded] = useState(true)

  // Sync with localStorage whenever resumes change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes))
  }, [resumes])

  const saveResume = (resume: Resume) => {
    setResumes((prev) => {
      // Avoid duplicates by ID
      if (prev.some((r) => r.id === resume.id)) {
        toast.info("Resume already saved to dashboard")
        return prev
      }
      toast.success("Resume saved to dashboard")
      return [resume, ...prev]
    })
  }

  const deleteResume = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id))
    toast.success("Resume deleted successfully")
  }

  return {
    resumes,
    saveResume,
    deleteResume,
    isLoaded,
  }
}

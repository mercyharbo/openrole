"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useApi } from "@/hooks/use-api"
import { useDocuments } from "@/hooks/use-queries"
import { useProfileStore } from "@/lib/store/profile-store"
import { Loader2 } from "lucide-react"
import { toast } from "react-toastify"

export function DeleteDocumentDialog() {
  const { 
    docToDelete, 
    setDocToDelete, 
    isDeletingDoc, 
    setIsDeletingDoc 
  } = useProfileStore()
  
  const { delete: deleteReq } = useApi()
  const { refreshDocuments } = useDocuments()

  const handleDeleteDoc = async () => {
    if (!docToDelete) return
    setIsDeletingDoc(true)
    try {
      const { error } = await deleteReq(`applicants/me/documents/${docToDelete}`)
      if (error) throw new Error(error)
      toast.success("Document deleted successfully")
      refreshDocuments()
    } catch (err: unknown) {
      console.error("Delete document error:", err)
      const errorMsg = err instanceof Error ? err.message : "Failed to delete document"
      toast.error(errorMsg)
    } finally {
      setIsDeletingDoc(false)
      setDocToDelete(null)
    }
  }

  return (
    <Dialog open={!!docToDelete} onOpenChange={(open) => !open && setDocToDelete(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Document</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this document? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDocToDelete(null)} disabled={isDeletingDoc}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteDoc} disabled={isDeletingDoc}>
            {isDeletingDoc ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

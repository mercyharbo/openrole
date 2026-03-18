"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useApi } from "@/hooks/use-api"
import { useDocuments } from "@/hooks/use-queries"
import { useProfileStore } from "@/lib/store/profile-store"
import { cn } from "@/lib/utils"
import { FileText, Folder, Loader2, Trash2 } from "lucide-react"
import { toast } from "react-toastify"
import { DeleteDocumentDialog } from "./delete-document-dialog"

const DOC_TYPE_MAP: Record<string, string> = {
  "Recommendation Letter": "recommendation",
  "Certificate": "certificate",
  "Cover Letter": "cover_letter",
  "Transcript": "transcript",
  "Other": "other",
}

export function ResumeDocsTab() {
  const {
    resumeMode,
    setResumeMode,
    isUploadingResume,
    setIsUploadingResume,
    pasteText,
    setPasteText,
    docName,
    setDocName,
    docType,
    setDocType,
    isUploadingDoc,
    setIsUploadingDoc,
    setDocToDelete,
    selectedDocFile,
    setSelectedDocFile,
  } = useProfileStore()

  const { post } = useApi()
  const {
    documents,
    refreshDocuments,
    isLoading: isLoadingDocs,
  } = useDocuments()

  const handleResumeUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB")
      return
    }

    setIsUploadingResume(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      // Use the now-fixed useApi hook which supports binary uploads and unwraps data correctly
      const { error } = await post("applicants/resume/upload", formData)
      if (error) throw new Error(error)
      toast.success("Resume uploaded successfully")
    } catch (err: unknown) {
      console.error("Resume upload error:", err)
      const errorMsg =
        err instanceof Error ? err.message : "Failed to upload resume"
      toast.error(errorMsg)
    } finally {
      setIsUploadingResume(false)
    }
  }

  const handleResumePaste = async () => {
    if (!pasteText.trim()) {
      toast.error("Please paste your resume text")
      return
    }
    setIsUploadingResume(true)
    try {
      const { error } = await post("applicants/resume/paste", {
        text: pasteText,
      })
      if (error) throw new Error(error)
      toast.success("Resume text saved successfully")
    } catch (err: unknown) {
      console.error("Resume save error:", err)
      const errorMsg =
        err instanceof Error ? err.message : "Failed to save resume text"
      toast.error(errorMsg)
    } finally {
      setIsUploadingResume(false)
    }
  }

  const handleDocUpload = async () => {
    if (!docName.trim()) {
      toast.error("Please provide a document name")
      return
    }
    if (!selectedDocFile) {
      toast.error("Please select a document to upload")
      return
    }
    if (selectedDocFile.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB")
      return
    }

    setIsUploadingDoc(true)
    const formData = new FormData()
    formData.append("file", selectedDocFile)
    formData.append("name", docName)
    formData.append("doc_type", DOC_TYPE_MAP[docType] || docType.toLowerCase())

    try {
      const { error } = await post("applicants/me/documents", formData)
      if (error) throw new Error(error)

      toast.success("Document uploaded successfully")
      setDocName("")
      setSelectedDocFile(null)
      refreshDocuments()
    } catch (err: unknown) {
      console.error("Document upload error:", err)
      const errorMsg =
        err instanceof Error ? err.message : "Failed to upload document"
      toast.error(errorMsg)
    } finally {
      setIsUploadingDoc(false)
    }
  }

  return (
    <Card className="flex flex-col gap-5 bg-muted/50 p-5">
      {/* Resume Section */}
      <Card className="border-0 bg-muted/50">
        <CardHeader className="flex flex-col gap-4">
          <CardTitle className="text-xl font-medium text-zinc-950 dark:text-zinc-50">
            Resume
          </CardTitle>
          <div className="flex gap-4">
            <Button
              type="button"
              className={cn(
                "h-10 flex-1 font-medium",
                resumeMode === "upload"
                  ? "bg-[#172554] text-white dark:bg-zinc-50 dark:text-zinc-950"
                  : "border border-zinc-200 bg-transparent text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
              )}
              onClick={() => setResumeMode("upload")}
            >
              Upload PDF
            </Button>
            <Button
              type="button"
              className={cn(
                "h-10 flex-1 font-medium",
                resumeMode === "paste"
                  ? "bg-[#172554] text-white dark:bg-zinc-50 dark:text-zinc-950"
                  : "border border-zinc-200 bg-transparent text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
              )}
              onClick={() => setResumeMode("paste")}
            >
              Paste Text
            </Button>
          </div>
        </CardHeader>
        <CardContent className="">
          {resumeMode === "upload" ? (
            <div
              className="relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-white transition-all hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900/50"
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onDrop={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const file = e.dataTransfer.files?.[0]
                if (file && file.type === "application/pdf") {
                  handleResumeUpload(file)
                } else {
                  toast.error("Please upload a PDF file")
                }
              }}
              onClick={() => {
                const input = document.createElement("input")
                input.type = "file"
                input.accept = ".pdf"
                input.onchange = (e: Event) => {
                  const target = e.target as HTMLInputElement
                  const file = target.files?.[0]
                  if (file) handleResumeUpload(file)
                }
                input.click()
              }}
            >
              {isUploadingResume ? (
                <div className="flex flex-col items-center gap-2 text-primary">
                  <Loader2 className="size-8 animate-spin" />
                  <p className="text-sm font-medium">Uploading...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-3">
                    <Folder className="size-6 fill-amber-500 text-amber-500" />
                    <p className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
                      Click or drag PDF here
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Max 5MB
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex animate-in flex-col gap-4 fade-in slide-in-from-top-2">
              <Textarea
                placeholder="Paste your resume content here..."
                className="min-h-[220px] resize-none border-gray-200 p-4 text-base focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-950"
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
              />
              <Button
                className="h-10 text-white"
                onClick={handleResumePaste}
                disabled={isUploadingResume}
              >
                {isUploadingResume ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : null}
                Save Resume Content
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Supporting Documents Section */}
      <Card className="border-0 bg-muted/50">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="text-xl font-medium text-zinc-950 dark:text-zinc-50">
            Supporting Documents
          </CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Upload recommendation letters, certificates, transcripts, etc.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {isLoadingDocs ? (
              <div className="col-span-full flex h-32 items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary" />
              </div>
            ) : documents.length > 0 ? (
              documents.map((doc) => (
                <div
                  key={doc.id}
                  className="group flex flex-col overflow-hidden rounded-md border border-gray-100 bg-white transition-all dark:border-zinc-800 dark:bg-zinc-900/40"
                >
                  <div className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex size-10 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900">
                        <FileText className="size-5 text-zinc-400 dark:text-zinc-500" />
                        <div className="absolute -right-1 -bottom-1 flex h-3.5 items-center justify-center rounded-sm bg-zinc-200 px-1.5 text-[7px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                          {doc.doc_type.toUpperCase().replace("_", " ")}
                        </div>
                      </div>
                      <span className="text-[15px] font-medium text-zinc-950 dark:text-zinc-50">
                        {doc.name}
                      </span>
                    </div>
                    <button
                      onClick={() => setDocToDelete(doc.id)}
                      className="rounded-full p-1.5 text-red-400 transition-colors hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="size-5" />
                    </button>
                  </div>
                  <div className="group/preview relative h-[120px] w-full bg-gray-100/60 dark:bg-zinc-800/60">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover/preview:opacity-100">
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm backdrop-blur-sm hover:bg-white dark:bg-zinc-800/90 dark:text-white dark:hover:bg-zinc-800"
                      >
                        View Document
                      </a>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between px-5 py-4 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                    <span>Uploaded on</span>
                    <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-2 text-sm text-gray-500 dark:text-gray-400">
                No documents uploaded yet.
              </div>
            )}
          </div>

          <div className="space-y-6 border-t border-gray-100 pt-6 dark:border-zinc-800">
            <h3 className="text-base font-medium text-zinc-950 dark:text-zinc-50">
              Upload New Document
            </h3>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Document Name
              </Label>
              <Input
                placeholder="e.g., Recommendation from Prof. Smith"
                className="h-11 w-full border-gray-200 bg-white focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-950"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Document Type
              </Label>
              <Select value={docType} onValueChange={setDocType}>
                <SelectTrigger
                  size="lg"
                  className="h-10 w-full border-gray-200 bg-white focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Recommendation Letter">
                    Recommendation Letter
                  </SelectItem>
                  <SelectItem value="Certificate">Certificate</SelectItem>
                  <SelectItem value="Cover Letter">Cover Letter</SelectItem>
                  <SelectItem value="Transcript">Transcript</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div
              className="relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-white transition-all hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900/50"
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onDrop={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const file = e.dataTransfer.files?.[0]
                if (file && file.type === "application/pdf") {
                  setSelectedDocFile(file)
                  if (!docName) setDocName(file.name.replace(".pdf", ""))
                } else {
                  toast.error("Please upload a PDF file")
                }
              }}
              onClick={() => {
                const input = document.createElement("input")
                input.type = "file"
                input.accept = ".pdf"
                input.onchange = (e: Event) => {
                  const target = e.target as HTMLInputElement
                  const file = target.files?.[0]
                  if (file) {
                    setSelectedDocFile(file)
                    if (!docName) setDocName(file.name.replace(".pdf", ""))
                  }
                }
                input.click()
              }}
            >
              <div className="flex flex-col items-center gap-2">
                {isUploadingDoc ? (
                  <div className="flex flex-col items-center gap-2 text-primary">
                    <Loader2 className="size-8 animate-spin" />
                    <p className="text-sm font-medium">Uploading...</p>
                  </div>
                ) : selectedDocFile ? (
                  <div className="flex flex-col items-center gap-2 text-center text-primary">
                    <FileText className="size-10" />
                    <p className="max-w-[200px] truncate text-sm font-medium">
                      {selectedDocFile.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(selectedDocFile.size / 1024 / 1024).toFixed(2)}MB
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                      <Folder className="size-6 fill-amber-500 text-amber-500" />
                      <p className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
                        Click or drag PDF here
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Max 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Button
              className="h-11 w-full bg-[#172554] font-medium text-white hover:bg-blue-900 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              onClick={handleDocUpload}
              disabled={isUploadingDoc || !selectedDocFile}
            >
              {isUploadingDoc ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : null}
              Submit Document
            </Button>
          </div>
        </CardContent>
      </Card>

      <DeleteDocumentDialog />
    </Card>
  )
}

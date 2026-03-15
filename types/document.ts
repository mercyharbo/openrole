export interface Document {
    id: string
    applicant_id: string
    name: string
    doc_type: string
    file_url: string
    extracted_text: string
    extracted_data: Record<string, unknown>
    created_at: string
}

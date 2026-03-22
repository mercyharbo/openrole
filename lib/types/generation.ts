export interface Generation {
  id: string;
  type: 'resume' | 'cover_letter' | 'about_me';
  content: string;
  file_url: string;
  metadata: any;
  created_at: string;
}

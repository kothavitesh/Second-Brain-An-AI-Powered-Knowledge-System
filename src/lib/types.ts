export interface Note {
  id: string;
  title: string;
  content: string;
  summary?: string;
  sourceUrl?: string;
  tags: string[];
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteFormData {
  title: string;
  content: string;
  sourceUrl?: string;
  tags: string[];
  metadata?: Record<string, unknown>;
}

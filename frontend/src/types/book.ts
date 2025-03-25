export interface Book {
    isbn: string;
    title: string;
    authors: string[];
    description: string;
    cover_art?: string;
    status?: string;
  }
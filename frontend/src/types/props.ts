import { Book } from "./book";

export interface CarouselControlsProps {
    onScrollLeft: () => void;
    onScrollRight: () => void;
}

export interface LibraryCarouselProps {
    books: Book[]; // Assuming you have a Book type defined
    bookRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
    groupedBooks: Record<string, Book[]>; // Assuming groupedBooks is a map of books
  }

export interface BookCardProps {
  book: Book;
}

export interface BookListCardProps {
  book: Book;
  handleAddBook: (book: Book, status: string) => void;
}

export interface BookListProps {
  books: Book[];
  handleAddBook: (book: Book, status: string) => void;
}
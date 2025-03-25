import { Book } from "./book";

export interface CarouselControlsProps {
    onScrollLeft: () => void;
    onScrollRight: () => void;
}

export interface LibraryCarouselProps {
    books: Book[];
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
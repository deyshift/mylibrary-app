import { Book } from "./book";

export interface CarouselControlsProps {
    onScrollLeft: () => void;
    onScrollRight: () => void;
}

export interface LibraryCarouselProps {
    books: Book[];
    bookRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
    groupedBooks: { [key: string]: Book[] };
    onBookClick: (book: Book) => void; // New prop for handling book clicks
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

export interface BookInfoProps {
    open: boolean;
    onClose: () => void;
    book: Book;
    onUpdateStatus?: (status: string) => void;
}
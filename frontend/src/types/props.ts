import { Book } from "./book";

export interface CarouselControlsProps {
    onScrollLeft: () => void;
    onScrollRight: () => void;
}

export interface LibraryCarouselProps {
    books: Book[];
}
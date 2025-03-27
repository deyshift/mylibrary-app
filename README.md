# MyLibrary - A Personal Library Web Application

MyLibrary is a personal library web application I built to refine my full-stack development skills with Python and React (TypeScript). It features a modern, intuitive UI that allows users to search for books, add them to their digital library, and track their reading progress. The app also includes additional features like a daily random quote and author bios, enhancing the reading experience. Data is sourced via external APIs and web scraping with BeautifulSoup from public resources like Wikiquote and Open Library. The frontend is built with React and Vite for fast performance and efficient development, while the backend, powered by SQLite, manages book collections and user interactions seamlessly.

---

## Demo Video
[Watch the Demo Video](https://youtu.be/3ZNcONHXe4A)

## 🌟 Features

- **Add Books**: Easily add books to your personal library with details such as title, author, summaries, and more.
- **Alphabetical Organization**: Books are automatically organized alphabetically by author last name.
- **Carousel Bookshelf**: Browse your library with a smooth scrollin feature or jump to different sections organized alphabetically.
- **Track Reading**: Keep track of the books you have read, are currently reading, and plan to read.
- **Simple Search**: Quickly find books in the Google Books API or your personal library using a basic search feature.
- **Quote of the Day**: Fetches the quote of the day from Open Library.

---

## 🛠 Technologies Used

### Frontend
- **React**: For building reusable and dynamic user interfaces.
- **TypeScript**: Ensures type safety and better developer experience.
- **Vite**: Provides fast development with hot module replacement (HMR) and optimized production builds.
- **Material-UI**: For a consistent and visually appealing user interface.

### Backend
- **Python**: The core language for backend development.
- **Flask**: A lightweight framework for building the backend API.
- **SQLite**: A simple and efficient database for storing books and user data.
- **Beautiful Soup**: For web scraping additional book data, author bios, and quote of the day.

### APIs
- **Google Books API**: Fetches detailed book information, including title, author, and publication date.

---

## 📚 Architecture

### Backend API

The backend API is built with Python and leverages the following technologies:

- **Google Books API**: Used to fetch book information, including details such as title, author, and publication date. This ensures that users can easily add books to their library with accurate and comprehensive information.
- **Beautiful Soup**: Utilized for web scraping to gather additional book data from various online sources. This helps enrich the book information available to users.
- **SQLite Database**: Books and user data are stored in a simple SQLite database. SQLite was chosen for this project because it is lightweight, easy to set up, and sufficient for a small-scale application like MyLibrary. It allows for quick and efficient data storage and retrieval without the overhead of a more complex database system.

#### Why These Choices?

- **Google Books API**: Offers reliable and extensive book information, making it easier to populate the library with accurate data.
- **Beautiful Soup**: Provides flexibility in gathering additional data from various sources, ensuring that users have access to rich and diverse book information.
- **SQLite**: Ideal for small projects due to its simplicity and ease of use. It requires no separate server setup, making it perfect for a personal library application where the data volume is manageable and does not require the scalability of a more robust database system.

### Frontend

The frontend is built with TypeScript and utilizes the following technologies:

- **React**: The frontend is developed using React, a popular library for building user interfaces. React allows for the creation of reusable UI components, making the development process more efficient and the application more maintainable.
- **Vite**: The project uses Vite as the build tool and development server. Vite provides lightning-fast development with hot module replacement (HMR) and optimized production builds.
- **Material-UI**: The user interface is styled using Material-UI, a popular React UI framework. Material-UI provides a set of customizable components that follow Google's Material Design guidelines, ensuring a consistent and visually appealing user experience.

#### Why These Choices?

- **React**: Provides a component-based architecture that simplifies the development and maintenance of the user interface. Its virtual DOM implementation improves performance by minimizing direct manipulation of the actual DOM.
- **Vite**: Offers a modern development experience with fast builds, instant server startup, and HMR, making it ideal for modern web applications.
- **Material-UI**: Enhances the user experience with a set of pre-built components that are easy to customize and integrate, ensuring a professional and consistent look and feel.

---

## Installation

### Prerequisites

- Node.js (v14.x or higher)
- Python (v3.8 or higher)
- npm (v6.x or higher)

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/RivTechProjects/mylibrary-app.git
   cd mylibrary-app/backend
   ```

2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required Python packages:
   ```sh
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```sh
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```

2. Install the required npm packages:
   ```sh
   npm install
   ```

3. Start the frontend server:
   ```sh
   npm start
   ```

## Usage

1. Open your web browser and navigate to `http://localhost:5137`.
2. Register for an account or log in if you already have one.
3. Start adding and organizing your books.


## Challenges and Solutions

One challenge I faced was optimizing API calls to fetch author bios, as the Open Library server can take unexpectedly long times. To solve this, I implemented a caching mechanism to store the data locally, which significantly improved performance.


## Future Improvements

- **Organization**: Add the ability to organize books by genre and group them into custom shelves.
- **State Management**: Integrate Redux or React Query for more robust state management and caching.
- **Enhanced API Handling**: Use Axios for better error handling and request configuration.
- **User Profiles**: Add support for multiple user profiles to allow shared libraries.
- **Mobile Responsiveness**: Improve the UI to ensure a seamless experience on mobile devices.
- **Dark Mode**: Add a dark mode toggle for better accessibility.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

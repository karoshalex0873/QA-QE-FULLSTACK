// FetchBooks.tsx
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaReadme } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BookModal from "../modals/BookModal";

interface Book {
  book_id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  publisher: string;
  price: number;
  image?: string;
  copies?: number;
}

const FetchBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<number | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Fetch books data
  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/books/get", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        navigate("/auth/login");
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      setBooks(data.books);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Delete book copy
  const deleteBook = async (book_id: number) => {
    if (!confirm("Are you sure you want to remove a copy of this book?")) return;

    try {
      const response = await fetch(`http://localhost:3000/api/v1/books/delete/${book_id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete book copy");

      setBooks(prevBooks => prevBooks
        .map(book => book.book_id === book_id ? {
          ...book,
          copies: Math.max((book.copies ?? 1) - 1, 0)
        } : book)
        .filter(book => (book.copies ?? 1) > 0)
      );
    } catch (error) {
      alert(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  // Update book
  const updateBook = async (book_id: number, updatedData: Partial<Book>) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/books/update/${book_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to update book");
      
      await fetchBooks(); // Refresh the book list
      alert("Book updated successfully!");
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Error updating book.");
    }
  };

  // Get user role
  const fetchUserRole = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/user-role", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch user role");
      setRole(await response.json());
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchUserRole();
  }, []);

  return (
    <div className="p-2 dark:bg-slate-900 overflow-auto mx-auto">
      {/* Loading and error states */}
      {loading && (
        <div className="grid grid-cols-1 px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg p-2">
              <div className="aspect-[3/4] bg-slate-200 dark:bg-slate-700 rounded-lg mb-2" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/5 mb-1.5" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/5" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg text-sm mb-3">
          ⚠️ {error}
        </div>
      )}

      {/* Book grid */}
      <div className="grid grid-cols-1 px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book.book_id}
            className="group relative bg-white dark:bg-slate-800 rounded-xl p-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-slate-200 dark:border-slate-700"
          >
            {/* Book content */}
            <div className="relative mb-3 overflow-hidden rounded-xl aspect-[6/5.5]">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
              <img
                src={book.image || "/placeholder-dark.jpg"}
                alt={book.title}
                className="w-full object-center object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-2 px-4 not-only-of-type:left-2 bg-primary/90 dark:bg-primary/80 text-white py-1 rounded-md text-xs font-semibold backdrop-blur-sm">
                {book.genre}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col space-y-3">
                <h3 className="text-base font-bold text-slate-800 dark:text-gray-300 truncate">
                  {book.title}
                </h3>
                <p className="text-md text-slate-600 dark:text-slate-400 font-medium truncate">
                  By {book.author}
                </p>
              </div>

              <div className="flex mx-auto flex-col gap-x-2 gap-y-1 text-sm w-full text-slate-600 dark:text-slate-300">
                <span className="bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-md">
                  Year: {book.year}
                </span>
                <span className="bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-md">
                  Pages: {book.pages}
                </span>
                <span className="truncate bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-md">
                  Publisher: {book.publisher}
                </span>
              </div>

              <div className="flex mt-2">
                <button className="flex flex-col text-sm justify-center items-center p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 dark:hover:text-green-300 transition-colors">
                  <FaReadme className="w-4 h-4" />
                  Borrow
                </button>

                {role !== 1 && (
                  <>
                    <button
                      onClick={() => setSelectedBook(book)}
                      className="p-1.5 flex flex-col justify-center items-center hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm"
                      title="Edit book"
                    >
                      <FaEdit className="w-4 h-4" />
                      Edit
                    </button>

                    <button
                      onClick={() => deleteBook(book.book_id)}
                      className="p-1.5 flex flex-col items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors text-sm"
                      title="Delete book"
                    >
                      <FaTrash className="w-4 h-4" />
                      Delete
                    </button>
                    <span className="text-sm flex items-center gap-1 text-gray-400 px-2 py-1 rounded-md">
                      {book.copies} <span className="font-extralight italic font-serif text-xs">copies</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Book modal */}
      {selectedBook && (
        <BookModal
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          onSubmit={(updatedData) => {
            updateBook(selectedBook.book_id, updatedData);
            setSelectedBook(null);
          }}
          bookToEdit={selectedBook}
        />
      )}
    </div>
  );
};

export default FetchBooks;
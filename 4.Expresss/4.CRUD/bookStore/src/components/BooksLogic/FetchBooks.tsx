// FetchBooks.tsx
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaStar, FaReadme } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
}

const FetchBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ...  fetch logic ...
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

  useEffect(() => {
    fetchBooks();
  }, []);

  //delet book and edit
  
  return (
    <div className="p-2 dark:bg-slate-900 overflow-auto mx-auto ">
      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg p-2">
              <div className="aspect-[3/4] bg-slate-200 dark:bg-slate-700 rounded-lg mb-2" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/5 mb-1.5" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/5" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg text-sm mb-3">
          ⚠️ {error}
        </div>
      )}
      {/* Book Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book.book_id}
            className="group relative bg-white dark:bg-slate-800 rounded-xl p-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-slate-200 dark:border-slate-700"
          >
            {/* Image Container */}
            <div className="relative mb-3 overflow-hidden rounded-xl aspect-[6/5.5]">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />

              <img
                src={book.image || "/placeholder-dark.jpg"}
                alt={book.title}
                className="w-full object-center object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Genre Badge */}
              <div className="absolute bottom-2 px-4 not-only-of-type:left-2 bg-primary/90 dark:bg-primary/80 text-white  py-1  rounded-md text-xs font-semibold backdrop-blur-sm">
                {book.genre}
              </div>

              {/* Rating Badge */}
              {/* <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/80 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 backdrop-blur-sm">
              <FaStar className="text-yellow-400 w-3.5 h-3.5" />
              <span className="text-slate-800 dark:text-slate-200">4.8</span>
            </div> */}
            </div>

            {/* Text Content */}
            <div className="space-y-2">
              <div className="flex flex-col space-y-3">
                <h3 className="text-base font-bold text-slate-800 dark:text-gray-300 truncate leading-tight">
                <span className="text-gray-50 font-semibold px-3">title</span> {book.title}
                </h3>
                <p className="text-md text-slate-600 dark:text-slate-400 font-medium truncate ">
                  <span className="text-gray-50 font-semibold px-3">BY</span> {book.author}
                </p>
              </div>

              {/* Metadata */}
              <div className="flex mx-auto flex-col  gap-x-2 gap-y-1 text-sm w-full text-slate-600 dark:text-slate-300">
                <span className="bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-md">
                <span className="text-gray-50 font-semibold px-3">Year</span> {book.year}
                </span>
                <span className="bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-md">
                <span className="text-gray-50 font-semibold px-3">pages</span>  {book.pages} <span className="text-gray-50 font-semibold px-3">pages</span>
                </span>
                <span className="truncate bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-md">
                <span className="text-gray-50 font-semibold px-3">publisher</span> {book.publisher}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-around  mt-2">
              <button
                  className=" flex flex-col text-sm justify-center items-center p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 dark:hover:text-green-300 transition-colors"
                  title="Edit book"
                >
                  <FaReadme className="w-4 h-4" />
                  Borrow
                </button>
                
                <button
                  className="p-1.5 flex flex-col  justify-center items-center hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm"
                  title="Edit book"
                >
                  <FaEdit className="w-4 h-4" />
                  edit
                </button>
                <button
                  className="p-1.5 flex flex-col  items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors text-sm"
                  title="Delete book"
                >
                  <FaTrash className="w-4 h-4" />
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchBooks;
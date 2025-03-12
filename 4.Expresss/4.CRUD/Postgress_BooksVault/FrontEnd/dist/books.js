var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// boots.ts
import { showMessage } from "./modal";
// Delete handler function
const handleDelete = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('Deleting book ID:', bookId); // Debug log
        if (!bookId || bookId === 'undefined') {
            showMessage("⚠️ Invalid book ID", false);
            return;
        }
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            showMessage("⚠️ User not found. Please log in again.", false);
            return;
        }
        const user = JSON.parse(storedUser);
        if (!user.id) {
            showMessage("⚠️ User ID not found. Please log in again.", false);
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            showMessage("⚠️ Authentication token not found. Please log in again.", false);
            return;
        }
        // Debug URL
        const url = `http://localhost:3000/api/v1/books/delete/${bookId}`;
        console.log('Request URL:', url); // Debug log
        const response = yield fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ user_id: user.id }),
        });
        const responseData = yield response.json();
        console.log('Server response:', responseData); // Debug log
        if (!response.ok) {
            throw new Error(responseData.message || "Failed to delete book");
        }
        (_a = document.querySelector(`[data-bookid="${bookId}"]`)) === null || _a === void 0 ? void 0 : _a.remove();
        showMessage("✔️ Book deleted successfully!", true);
    }
    catch (error) {
        console.error("Delete error:", error);
        showMessage(`❌ ${error instanceof Error ? error.message : "Deletion failed"}`, false);
    }
});
// Book population function
export const populateBooks = (books) => {
    try {
        const bookHTML = books.map((book) => `
      <div class="relative flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-out overflow-hidden flex-1 min-w-[300px] max-w-[320px] m-2" data-bookid="${book.bookid}">
        
        <!-- Image Section -->
        <div class="relative flex-shrink-0 h-64 bg-gray-100 dark:bg-slate-700 overflow-hidden rounded-2xl">
          <img 
            src="${book.image}" 
            alt="${book.title}" 
            class="w-full h-auto px-3 py-2 object-cover justify-center items-center transition-transform duration-500 hover:scale-105"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
          
          <!-- Genre Badge -->
          <div class="absolute bottom-4 left-2 bg-primary/70 backdrop-blur-sm text-white px-6 py-3 rounded-md text-sm font-serif shadow-sm">
            ${book.genre}
          </div>
        </div>

        <!-- Content Section -->
        <div class="flex flex-col flex-grow p-5 pt-4 space-y-3">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white truncate hover:text-primary transition-colors">
            ${book.title}
          </h3>
          <p class="text-md text-slate-600 dark:text-light-100 font-medium"> BY ${' '} 
            ${book.author}
          </p>

          <!-- Metadata -->
          <div class="flex flex-col space-y-2 text-md text-slate-600 dark:text-slate-400">
            <div class="flex items-center space-x-2">
              <span>${book.year}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span>${book.pages} pages</span>
            </div>
            <div class="flex items-center space-x-2">
              <span>${book.publisher}</span>
            </div>
          </div>

          <!-- Price & CTA -->
          <div class="mt-auto pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <div class="space-y-1">
              <span class="text-sm text-slate-500">Price</span>
              <p class="text-2xl font-bold dark:text-white text-primary ">Ksh ${book.price}</p>
            </div>

          <div class="flex gap-1 absolute right-0">
            <button
              class="delete-btn flex items-center space-x-2 bg-primary/20 backdrop-blur-md hover:bg-light-100/40 text-white px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg"
              data-bookid="${book.bookid}"
            >
              <i class="fas fa-trash text-md text-white"></i>
            </button>
            <button
              class="delete-btn flex items-center space-x-2 bg-primary/20 backdrop-blur-md hover:bg-light-100/40 text-white px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg"
              data-bookid="${book.bookid}"
            >
              <i class="fas fa-edit text-md text-white"></i>
            </button>
            <button
              class="delete-btn flex items-center space-x-2 bg-primary/20 backdrop-blur-md hover:bg-light-100/40 text-white px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg"
              data-bookid="${book.bookid}"
            >
              <i class="fas fa-heart text-md text-white"></i>
            </button>
          </div>
          </div>
        </div>
      </div>`).join("");
        const booksContainer = document.getElementById("books");
        booksContainer.innerHTML = bookHTML;
        // Event listeners for delete buttons
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                const bookId = this.getAttribute("data-bookid");
                if (bookId) {
                    const confirmDelete = confirm("Are you sure you want to delete this book?");
                    if (confirmDelete)
                        handleDelete(bookId);
                }
            });
        });
        // Remove loader
        const loader = document.querySelector(".loader-container");
        if (loader)
            loader.remove();
    }
    catch (error) {
        console.error("Error populating books:", error);
        showMessage("❌ Failed to load books", false);
    }
};
//# sourceMappingURL=books.js.map
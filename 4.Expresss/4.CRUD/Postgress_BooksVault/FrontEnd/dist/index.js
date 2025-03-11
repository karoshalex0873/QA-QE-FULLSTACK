var _a, _b, _c, _d;
// importing nessesary imports
import { loginUser, registerUser } from "./auth";
import { populateBooks } from "./books";
import { fetchBooks } from "./endpoints_Fetching";
import { applyFilter } from "./filter";
import { setupModals } from "./modal";
setupModals();
registerUser();
loginUser();
(_a = document.getElementById("filterOptions")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", applyFilter);
(_b = document.getElementById("search_name")) === null || _b === void 0 ? void 0 : _b.addEventListener("input", applyFilter);
(_c = document.getElementById("search_year")) === null || _c === void 0 ? void 0 : _c.addEventListener("input", applyFilter);
(_d = document.getElementById("search_genre")) === null || _d === void 0 ? void 0 : _d.addEventListener("input", applyFilter);
const loader = document.getElementById("loader_books");
loader === null || loader === void 0 ? void 0 : loader.classList.remove("hidden");
setTimeout(() => {
    fetchBooks()
        .then((books) => {
        const booksContainer = document.getElementById("books");
        if (!booksContainer)
            return; // Ensure container exists
        if (books.length === 0) {
            booksContainer.innerHTML = "<p class='text-center text-light-100 text-4xl font-orbitron '>No books available</p>";
        }
        else {
            console.log("Fetched books:", books);
            populateBooks(books);
        }
    })
        .catch((error) => console.error("Fetch error:", error));
}, 2000);
//# sourceMappingURL=index.js.map
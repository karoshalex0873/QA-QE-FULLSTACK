var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { populateBooks } from "./books";
import { fetchBooks, fetchBooksFilter } from "./endpoints_Fetching";
import { showMessage } from "./modal";
export const applyFilter = () => __awaiter(void 0, void 0, void 0, function* () {
    const loader = document.getElementById("loader"); // Consistent selector
    try {
        const filters = {};
        // Get UI elements
        const filterElement = document.getElementById("filterOptions");
        const searchTitleInput = document.getElementById("search_name");
        const searchYearInput = document.getElementById("search_year");
        const searchGenreInput = document.getElementById("search_genre");
        const selectedFilter = (filterElement === null || filterElement === void 0 ? void 0 : filterElement.value.toLowerCase()) || "";
        // Show loader and clear books
        loader === null || loader === void 0 ? void 0 : loader.classList.remove("hidden");
        populateBooks([]);
        // Build filters
        if (selectedFilter === "title" && (searchTitleInput === null || searchTitleInput === void 0 ? void 0 : searchTitleInput.value.trim())) {
            filters.title = searchTitleInput.value.trim();
        }
        else if (selectedFilter === "genre" && (searchGenreInput === null || searchGenreInput === void 0 ? void 0 : searchGenreInput.value.trim())) {
            filters.genre = searchGenreInput.value.trim();
        }
        else if (selectedFilter === "year" && (searchYearInput === null || searchYearInput === void 0 ? void 0 : searchYearInput.value.trim())) {
            filters.year = Number(searchYearInput.value.trim());
        }
        const queryParams = new URLSearchParams(filters).toString();
        window.history.pushState(null, "", `?${queryParams}`);
        // Simulate loading and fetch
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const filteredBooks = yield fetchBooksFilter(`?${queryParams}`);
                if (!filteredBooks || filteredBooks.length === 0) {
                    showMessage("No books found. Resetting search in a few seconds...", false);
                    setTimeout(() => fetchBooks().then(populateBooks), 5000);
                }
                else {
                    populateBooks(filteredBooks);
                }
            }
            catch (error) {
                console.error("Fetch error:", error);
                showMessage("Error fetching books. Please try again.", false);
            }
            finally {
                loader === null || loader === void 0 ? void 0 : loader.classList.add("hidden"); // Hide loader after fetch/error
            }
        }), 2000);
    }
    catch (error) {
        console.error("Error applying filter:", error);
        showMessage("Something went wrong. Please try again.", false);
        loader === null || loader === void 0 ? void 0 : loader.classList.add("hidden"); // Hide loader on initial error
    }
});
//# sourceMappingURL=filter.js.map
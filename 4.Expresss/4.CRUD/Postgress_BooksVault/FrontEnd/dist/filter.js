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
import { fetchBooksFilter } from "./endpoints_Fetching";
import { showMessage } from "./modal";
export const applyFilter = () => __awaiter(void 0, void 0, void 0, function* () {
    const filters = {};
    // Get dropdown selection
    const filterElement = document.getElementById("filterOptions");
    const selectedFilter = filterElement ? filterElement.value.toLowerCase() : "";
    // Get input elements
    const searchTitleInput = document.getElementById("search_name");
    const searchYearInput = document.getElementById("search_year");
    const searchGenreInput = document.getElementById("search_genre");
    // let isFilterApplied = false;
    if (selectedFilter === "title" && (searchTitleInput === null || searchTitleInput === void 0 ? void 0 : searchTitleInput.value.trim())) {
        filters.title = searchTitleInput.value.trim();
        // isFilterApplied = true;
    }
    if (selectedFilter === "genre" && (searchGenreInput === null || searchGenreInput === void 0 ? void 0 : searchGenreInput.value.trim())) {
        filters.genre = searchGenreInput.value.trim();
        // isFilterApplied = true;
    }
    if (selectedFilter === "year" && (searchYearInput === null || searchYearInput === void 0 ? void 0 : searchYearInput.value.trim())) {
        filters.year = Number(searchYearInput.value.trim());
        // isFilterApplied = true;
    }
    // if (!isFilterApplied) {
    //   showMessage("Please enter a value to search.", false);
    //   return;
    // }
    const queryParams = new URLSearchParams(filters).toString();
    window.history.pushState(null, "", `?${queryParams}`);
    const filteredBooks = yield fetchBooksFilter(`?${queryParams}`);
    if (filteredBooks.length === 0) {
        showMessage("No books found. Resetting search in a few seconds...", false);
        return;
    }
    // **Populate only if books exist**
    populateBooks(filteredBooks);
});
//# sourceMappingURL=filter.js.map
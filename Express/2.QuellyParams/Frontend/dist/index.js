var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchBooks, populateBooks } from "./books";
import { fetchBooksFilter } from "./filter";
// Function to toggle dropdown visibility
document.addEventListener("DOMContentLoaded", () => {
    function dropdownFunction() {
        const dropdown = document.getElementById("myDropdown");
        if (dropdown) {
            dropdown.classList.toggle("show");
        }
    }
    // Attach event listener to dropdown button
    const dropdownButton = document.querySelector(".dropbtn");
    if (dropdownButton) {
        dropdownButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevents immediate closing
            dropdownFunction();
        });
    }
    // Close dropdown when clicking outside
    window.addEventListener("click", (event) => {
        const target = event.target;
        if (!target.matches(".dropbtn") && !target.closest(".dropdown-content")) {
            document.querySelectorAll(".dropdown-content.show").forEach((dropdown) => {
                dropdown.classList.remove("show");
            });
        }
    });
});
setTimeout(() => {
    fetchBooks()
        .then((books) => {
        console.log("Fetched books:", books);
        populateBooks(books);
    })
        .catch((error) => console.error("Fetch error:", error));
}, 2000);
// search
// search
document.querySelectorAll(".dropdown-content input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", () => __awaiter(void 0, void 0, void 0, function* () {
        applyFilters();
    }));
});
const applyFilters = () => __awaiter(void 0, void 0, void 0, function* () {
    const filters = {};
    // Get checkboxes
    const filterNameCheckbox = document.getElementById("filter_name") || null;
    const filterYearCheckbox = document.getElementById("filter_year") || null;
    const filterGenreCheckbox = document.getElementById("filter_genre") || null;
    // Get input elements for each filter type
    const searchNameInput = document.getElementById("search_name") || null;
    const searchYearInput = document.getElementById("search_year") || null;
    const searchGenreInput = document.getElementById("search_genre") || null;
    // Apply name filter
    if ((filterNameCheckbox === null || filterNameCheckbox === void 0 ? void 0 : filterNameCheckbox.checked) && (searchNameInput === null || searchNameInput === void 0 ? void 0 : searchNameInput.value)) {
        filters.title = searchNameInput.value;
    }
    // Apply year filter
    if ((filterYearCheckbox === null || filterYearCheckbox === void 0 ? void 0 : filterYearCheckbox.checked) && (searchYearInput === null || searchYearInput === void 0 ? void 0 : searchYearInput.value)) {
        filters.year = parseInt(searchYearInput.value, 10);
    }
    // Apply genre filter
    if ((filterGenreCheckbox === null || filterGenreCheckbox === void 0 ? void 0 : filterGenreCheckbox.checked) && (searchGenreInput === null || searchGenreInput === void 0 ? void 0 : searchGenreInput.value)) {
        filters.genre = searchGenreInput.value;
    }
    const queryParams = new URLSearchParams(filters).toString();
    const filteredBooks = yield fetchBooksFilter(`?${queryParams}`);
    populateBooks(filteredBooks);
});
//# sourceMappingURL=index.js.map
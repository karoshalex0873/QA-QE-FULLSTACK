import { populateBooks } from "./books";
import { fetchBooks, fetchBooksFilter } from "./endpoints_Fetching";
import { showMessage } from "./modal";

export const applyFilter = async () => {
  const filters: { title?: string; year?: number; genre?: string } = {};

  // Get dropdown selection
  const filterElement = document.getElementById("filterOptions") as HTMLSelectElement | null;
  const selectedFilter = filterElement ? filterElement.value.toLowerCase() : "";

  // Get input elements
  const searchTitleInput = document.getElementById("search_name") as HTMLInputElement | null;
  const searchYearInput = document.getElementById("search_year") as HTMLInputElement | null;
  const searchGenreInput = document.getElementById("search_genre") as HTMLInputElement | null;

  // let isFilterApplied = false;

  setTimeout(() => {
    
  }, 3000);

  if (selectedFilter === "title" && searchTitleInput?.value.trim()) {
    filters.title = searchTitleInput.value.trim();
    // isFilterApplied = true;
  }
  if (selectedFilter === "genre" && searchGenreInput?.value.trim()) {
    filters.genre = searchGenreInput.value.trim();
    // isFilterApplied = true;
  }
  if (selectedFilter === "year" && searchYearInput?.value.trim()) {
    filters.year = Number(searchYearInput.value.trim());
    // isFilterApplied = true;
  }

  // if (!isFilterApplied) {
  //   showMessage("Please enter a value to search.", false);
  //   return;
  // }

  const queryParams = new URLSearchParams(filters as any).toString();
  window.history.pushState(null, "", `?${queryParams}`);

  const filteredBooks = await fetchBooksFilter(`?${queryParams}`);


  if (filteredBooks.length === 0) {
    showMessage("No books found. Resetting search in a few seconds...", false);
    return;
  }

  // **Populate only if books exist**
  populateBooks(filteredBooks);
};

import { populateBooks } from "./books";
import { fetchBooks, fetchBooksFilter } from "./endpoints_Fetching";
import { showMessage } from "./modal";

export const applyFilter = async () => {
  const loader = document.getElementById("loader") as HTMLDivElement | null; // Consistent selector

  try {
    const filters: { title?: string; year?: number; genre?: string } = {};

    // Get UI elements
    const filterElement = document.getElementById("filterOptions") as HTMLSelectElement | null;
    const searchTitleInput = document.getElementById("search_name") as HTMLInputElement | null;
    const searchYearInput = document.getElementById("search_year") as HTMLInputElement | null;
    const searchGenreInput = document.getElementById("search_genre") as HTMLInputElement | null;

    const selectedFilter = filterElement?.value.toLowerCase() || "";

    // Show loader and clear books
    loader?.classList.remove("hidden");
    populateBooks([]);

    // Build filters
    if (selectedFilter === "title" && searchTitleInput?.value.trim()) {
      filters.title = searchTitleInput.value.trim();
    } else if (selectedFilter === "genre" && searchGenreInput?.value.trim()) {
      filters.genre = searchGenreInput.value.trim();
    } else if (selectedFilter === "year" && searchYearInput?.value.trim()) {
      filters.year = Number(searchYearInput.value.trim());
    }

    const queryParams = new URLSearchParams(filters as any).toString();
    window.history.pushState(null, "", `?${queryParams}`);

    // Simulate loading and fetch
    setTimeout(async () => {
      try {
        const filteredBooks = await fetchBooksFilter(`?${queryParams}`);

        if (!filteredBooks || filteredBooks.length === 0) {
          showMessage("No books found. Resetting search in a few seconds...", false);
          setTimeout(() => fetchBooks().then(populateBooks), 5000);
        } else {
          populateBooks(filteredBooks);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        showMessage("Error fetching books. Please try again.", false);
      } finally {
        loader?.classList.add("hidden"); // Hide loader after fetch/error
      }
    }, 2000);

  } catch (error) {
    console.error("Error applying filter:", error);
    showMessage("Something went wrong. Please try again.", false);
    loader?.classList.add("hidden"); // Hide loader on initial error
  }
};
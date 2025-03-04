import { fetchBooks, populateBooks } from "./books";
import { fetchBooksFilter } from "./filter";


// Function to toggle dropdown visibility
document.addEventListener("DOMContentLoaded", () => {
  function dropdownFunction(): void {
    const dropdown = document.getElementById("myDropdown") as HTMLElement | null;
    if (dropdown) {
      dropdown.classList.toggle("show");
    }
  }

  // Attach event listener to dropdown button
  const dropdownButton = document.querySelector(".dropbtn") as HTMLElement | null;
  if (dropdownButton) {
    dropdownButton.addEventListener("click", (event: MouseEvent) => {
      event.stopPropagation(); // Prevents immediate closing
      dropdownFunction();
    });
  }

  // Close dropdown when clicking outside
  window.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (!target.matches(".dropbtn") && !target.closest(".dropdown-content")) {
      document.querySelectorAll(".dropdown-content.show").forEach((dropdown) => {
        (dropdown as HTMLElement).classList.remove("show");
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
  checkbox.addEventListener("change", async () => {
    applyFilters();
  });
});

const applyFilters = async () => {
  const filters: { title?: string; year?: number; genre?: string } = {};

  // Get checkboxes
  const filterNameCheckbox = document.getElementById("filter_name") as HTMLInputElement || null;
  const filterYearCheckbox = document.getElementById("filter_year") as HTMLInputElement || null;
  const filterGenreCheckbox = document.getElementById("filter_genre") as HTMLInputElement || null;

  // Get input elements for each filter type
  const searchNameInput = document.getElementById("search_name") as HTMLInputElement || null;
  const searchYearInput = document.getElementById("search_year") as HTMLInputElement || null;
  const searchGenreInput = document.getElementById("search_genre") as HTMLInputElement || null ;

  // Apply name filter
  if (filterNameCheckbox?.checked && searchNameInput?.value) {
    filters.title = searchNameInput.value;
  }

  // Apply year filter
  if (filterYearCheckbox?.checked && searchYearInput?.value) {
    filters.year = parseInt(searchYearInput.value, 10);
  }

  // Apply genre filter
  if (filterGenreCheckbox?.checked && searchGenreInput?.value) {
    filters.genre = searchGenreInput.value;
  }

  const queryParams = new URLSearchParams(filters as any).toString();
  const filteredBooks = await fetchBooksFilter(`?${queryParams}`);

  populateBooks(filteredBooks);
};

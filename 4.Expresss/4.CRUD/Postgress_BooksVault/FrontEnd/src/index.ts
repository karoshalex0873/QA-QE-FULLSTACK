// importing nessesary imports
import { loginUser, registerUser } from "./auth";
import { populateBooks } from "./books";
import { fetchBooks } from "./endpoints_Fetching";
import { applyFilter } from "./filter";
import { setupModals } from "./modal";
import { loadUsers } from "./userTables";


setupModals();
registerUser();
loginUser();

document.getElementById("filterOptions")?.addEventListener("change", applyFilter);
document.getElementById("search_name")?.addEventListener("input", applyFilter);
document.getElementById("search_year")?.addEventListener("input", applyFilter);
document.getElementById("search_genre")?.addEventListener("input", applyFilter);

const loader = document.getElementById("loader_books") as HTMLDivElement | null;
  loader?.classList.remove("hidden")
  setTimeout(() => {
    fetchBooks()
      .then((books) => {
        const booksContainer = document.getElementById("books") as HTMLDivElement | null;
  
        if (!booksContainer) return; // Ensure container exists
  
        if (books.length === 0) {
          booksContainer.innerHTML = "<p class='text-center text-light-100 text-4xl font-orbitron '>No books available</p>";
        } else {
          console.log("Fetched books:", books);
          populateBooks(books);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, 2000);
  
  document.getElementById("manageUsersBtn")?.addEventListener("click", () => {
    // Call the function to fetch and display users
    loadUsers
  });

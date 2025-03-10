// importing nessesary imports
import { loginUser, registerUser } from "./auth";
import { populateBooks } from "./books";
import { fetchBooks } from "./endpoints_Fetching";
import { applyFilter } from "./filter";
import { setupModals } from "./modal";


setupModals();
registerUser();
loginUser();

document.getElementById("filterOptions")?.addEventListener("change", applyFilter);
document.getElementById("search_name")?.addEventListener("input", applyFilter);
document.getElementById("search_year")?.addEventListener("input", applyFilter);
document.getElementById("search_genre")?.addEventListener("input", applyFilter);


setTimeout(() => {
  fetchBooks()
  .then((books) => {
    console.log("Fetched books:", books);
    populateBooks(books);
  })
  .catch((error) => console.error("Fetch error:", error));
}, 2000);

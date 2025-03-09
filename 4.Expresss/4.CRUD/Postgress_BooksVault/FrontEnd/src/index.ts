// importing nessesary imports
import { loginUser, registerUser } from "./auth";
import { populateBooks } from "./books";
import { fetchBooks } from "./endpoints_Fetching";
import { setupModals } from "./modal";


setupModals();
registerUser();
loginUser()

setTimeout(() => {
  fetchBooks()
  .then((books) => {
    console.log("Fetched books:", books);
    populateBooks(books);
  })
  .catch((error) => console.error("Fetch error:", error));
}, 2000);

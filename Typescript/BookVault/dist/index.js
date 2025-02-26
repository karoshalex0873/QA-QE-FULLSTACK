import { fetchBooks, populateBooks } from "./books";
export function dropdownFunction() {
    const dropdown = document.getElementById("myDropdown");
    const button = document.querySelector(".dropbtn");
    if (dropdown && button) {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        button.classList.toggle("active");
    }
}
window.addEventListener("click", (event) => {
    const target = event.target;
    if (!target.matches(".dropbtn") && !target.closest(".dropdown")) {
        const dropdown = document.getElementById("myDropdown");
        const button = document.querySelector(".dropbtn");
        if (dropdown && button) {
            dropdown.style.display = "none";
            button.classList.remove("active");
        }
    }
});
setTimeout(() => {
    fetchBooks()
        .then((books) => {
        console.log("Fetched books:", books);
        populateBooks(books);
    })
        .catch((error) => console.error("Fetch error:", error));
}, 2000);
//# sourceMappingURL=index.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { showMessage } from "./modal";
// fecthig book from an endpoint
export const fetchBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("http://localhost:3000/api/v1/books");
        const books = yield response.json();
        if (!Array.isArray(books)) {
            throw new Error("Fetched data is not an array");
        }
        return books;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
});
// serching endpoint
export const fetchBooksFilter = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (queryParams = "") {
    try {
        const response = yield fetch(`http://localhost:3000/api/v1/books/filter${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            showMessage("erros", true);
            setTimeout(() => {
                fetchBooks();
            }, 5000);
        }
        return yield response.json();
    }
    catch (error) {
        console.error("Error fecting events", error);
        return [];
    }
});
//# sourceMappingURL=endpoints_Fetching.js.map
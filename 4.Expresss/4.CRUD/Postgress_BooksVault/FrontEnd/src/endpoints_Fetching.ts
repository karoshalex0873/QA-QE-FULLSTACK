import { showMessage } from "./modal";
import {BookInformationType } from "./Types";

// fecthig book from an endpoint
export const fetchBooks = async (): Promise<BookInformationType[]> => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/books");
    const books: BookInformationType[] = await response.json();

    if (!Array.isArray(books)) {
      throw new Error("Fetched data is not an array");
    }
    return books;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// serching endpoint
export const fetchBooksFilter = async (queryParams: string = "") => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/books/filter${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      showMessage(`ther was an erraor fecting your books`,false)
    }

    return await response.json()

  } catch (error) {
    console.error("Error fecting events", error)
    return [];
  }
}







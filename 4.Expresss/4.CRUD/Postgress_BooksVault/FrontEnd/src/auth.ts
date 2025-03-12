import { showMessage } from "./modal";
import { BookFormData, LoginResponse } from "./Types";

const registerForm = document.getElementById("registerForm") as HTMLFormElement | null;
const loginForm = document.getElementById("loginForm") as HTMLFormElement | null;

export const registerUser = async () => {
  if (!registerForm) return;

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("registerUsername") as HTMLInputElement | null;
    const emailInput = document.getElementById("registerEmail") as HTMLInputElement | null;
    const passwordInput = document.getElementById("registerPassword") as HTMLInputElement | null;

    if (!nameInput || !emailInput || !passwordInput) {
      showMessage("Form inputs not found!", false);
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Ensure all fields are filled
    if (!name || !email || !password) {
      showMessage(`⚠️ All fields are required`, false);
      return;
    }

    // Push data into the database
    try {
      const response = await fetch("http://localhost:3000/api/V1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage("✔️ Registration successful!", true);
        registerForm.reset();

        // Hide register modal & show login modal
        document.getElementById("userRegisterModal")?.classList.add("hidden");
        document.getElementById("userLoginModal")?.classList.remove("hidden");
      } else {
        showMessage(` ⚠️ : ${data.message}`, false);
      }
    } catch (error) {
      console.error("Error:", error);
      showMessage("Something went wrong. Please try again.", false);
    }
  });
};


// ✅ LOGIN FUNCTION
export const loginUser = async () => {
  const loginForm = document.getElementById("loginForm") as HTMLFormElement | null;
  if (!loginForm) return;

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("loginEmail") as HTMLInputElement | null;
    const passwordInput = document.getElementById("loginPassword") as HTMLInputElement | null;

    if (!emailInput || !passwordInput) {
      showMessage("⚠️ Form inputs not found!", false);
      return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // ✅ Ensure fields are filled
    if (!email || !password) {
      showMessage("⚠️ All fields are required", false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        showMessage(`⚠️ ${data.message}`, false);
        return;
      }

      if (data.token) {
        // ✅ Store user & token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        showMessage("✔️ Login successful!", true);
        loginForm.reset();
        document.getElementById("userLoginModal")?.classList.add("hidden");

        // Redirect after login
        // window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Login error:", error);
      showMessage("Something went wrong. Please try again.", false);
    }
  });
};

// ✅ FETCH USER ID FROM LOCALSTORAGE
const fetchUserId = (): string | null => {
  const user = localStorage.getItem("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    return parsedUser.id || null; 
  }
  return null;
};


//HANDLE BOOK FORM SUBMISSION
const handleFormSubmit = async (event: SubmitEvent) => {
  event.preventDefault();

  // Get user_id from localStorage
  const userId = fetchUserId();
  if (!userId) {
    showMessage("⚠️ User not authenticated. Please log in.",false);
    return;
  }

  // ✅ Get form element
  const bookForm = event.target as HTMLFormElement;

  
  const bookData: BookFormData = {
    bookId: (document.getElementById("bookId") as HTMLInputElement).value.trim(),
    title: (document.getElementById("title") as HTMLInputElement).value.trim(),
    author: (document.getElementById("author") as HTMLInputElement).value.trim(),
    genre: (document.getElementById("genre") as HTMLInputElement).value.trim(),
    year: parseInt((document.getElementById("year") as HTMLInputElement).value, 10) || undefined,
    pages: parseInt((document.getElementById("pages") as HTMLInputElement).value, 10) || undefined,
    publisher: (document.getElementById("publisher") as HTMLInputElement).value.trim(),
    price: parseFloat((document.getElementById("price") as HTMLInputElement).value) || undefined,
    description: (document.getElementById("description") as HTMLTextAreaElement).value.trim(),
    image: (document.getElementById("image") as HTMLInputElement).value.trim(),
    pdf: (document.getElementById("pdf") as HTMLInputElement).value.trim(),
    user_id: userId, 
  };

  try {
    const response = await fetch("http://localhost:3000/api/v1/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      showMessage("⚠️ Failed to add book !",false);
    }

    const result = await response.json();

    if(response.status ===201){
      showMessage(result.message,true)
    }else{
      showMessage(result.message,false)
    }
    // showMessage(result.message);
    
    bookForm.reset();
  } catch (error) {
    console.error("Error submitting book:", error);
    showMessage('failed to add the book',false)
  }
};

// ✅ ATTACH EVENT LISTENER TO FORM
document.addEventListener("DOMContentLoaded", () => {
  const bookForm = document.getElementById("bookForm") as HTMLFormElement | null;
  if (bookForm) {
    bookForm.addEventListener("submit", handleFormSubmit);
  }
});


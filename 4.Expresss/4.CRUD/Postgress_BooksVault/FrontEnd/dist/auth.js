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
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
export const registerUser = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!registerForm)
        return;
    registerForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        event.preventDefault();
        const nameInput = document.getElementById("registerUsername");
        const emailInput = document.getElementById("registerEmail");
        const passwordInput = document.getElementById("registerPassword");
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
            const response = yield fetch("http://localhost:3000/api/v1/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = yield response.json();
            if (response.ok) {
                showMessage("Registration successful!", true);
                registerForm.reset();
                // Hide register modal & show login modal
                (_a = document.getElementById("userRegisterModal")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
                (_b = document.getElementById("userLoginModal")) === null || _b === void 0 ? void 0 : _b.classList.remove("hidden");
            }
            else {
                showMessage(` ⚠️ : ${data.message}`, false);
            }
        }
        catch (error) {
            console.error("Error:", error);
            showMessage("Something went wrong. Please try again.", false);
        }
    }));
});
// ✅ LOGIN FUNCTION
export const loginUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm)
        return;
    loginForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        event.preventDefault();
        const emailInput = document.getElementById("loginEmail");
        const passwordInput = document.getElementById("loginPassword");
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
            const response = yield fetch("http://localhost:3000/api/v1/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = yield response.json();
            if (!response.ok) {
                showMessage(`⚠️ ${data.message}`, false);
                return;
            }
            if (data.token) {
                // ✅ Store user & token in localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                showMessage("✅ Login successful!", true);
                loginForm.reset();
                (_a = document.getElementById("userLoginModal")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
                // Redirect after login
                // window.location.href = "/dashboard";
            }
        }
        catch (error) {
            console.error("Login error:", error);
            showMessage("Something went wrong. Please try again.", false);
        }
    }));
});
// ✅ FETCH USER ID FROM LOCALSTORAGE
const fetchUserId = () => {
    const user = localStorage.getItem("user");
    if (user) {
        const parsedUser = JSON.parse(user);
        return parsedUser.id || null;
    }
    return null;
};
//HANDLE BOOK FORM SUBMISSION
const handleFormSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    // Get user_id from localStorage
    const userId = fetchUserId();
    if (!userId) {
        showMessage("⚠️ User not authenticated. Please log in.", false);
        return;
    }
    // ✅ Get form element
    const bookForm = event.target;
    const bookData = {
        bookId: document.getElementById("bookId").value.trim(),
        title: document.getElementById("title").value.trim(),
        author: document.getElementById("author").value.trim(),
        genre: document.getElementById("genre").value.trim(),
        year: parseInt(document.getElementById("year").value, 10) || undefined,
        pages: parseInt(document.getElementById("pages").value, 10) || undefined,
        publisher: document.getElementById("publisher").value.trim(),
        price: parseFloat(document.getElementById("price").value) || undefined,
        description: document.getElementById("description").value.trim(),
        image: document.getElementById("image").value.trim(),
        pdf: document.getElementById("pdf").value.trim(),
        user_id: userId,
    };
    try {
        const response = yield fetch("http://localhost:3000/api/v1/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookData),
        });
        if (!response.ok) {
            showMessage("❌ Failed to add book", false);
        }
        const result = yield response.json();
        showMessage(result.message);
        bookForm.reset();
    }
    catch (error) {
        console.error("Error submitting book:", error);
        showMessage('failed to add the book', false);
    }
});
// ✅ ATTACH EVENT LISTENER TO FORM
document.addEventListener("DOMContentLoaded", () => {
    const bookForm = document.getElementById("bookForm");
    if (bookForm) {
        bookForm.addEventListener("submit", handleFormSubmit);
    }
});
//# sourceMappingURL=auth.js.map
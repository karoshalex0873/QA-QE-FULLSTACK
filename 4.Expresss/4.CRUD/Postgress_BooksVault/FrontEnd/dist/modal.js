// Get modal elements
const toggleModalBtn = document.getElementById("userBtn");
const registerModal = document.getElementById("userRegisterModal");
const loginModal = document.getElementById("userLoginModal");
const showLoginLink = document.getElementById("showLogin");
const showRegisterLink = document.getElementById("showRegister");
// Modal handling functions
function toggleModals() {
    const isRegisterVisible = registerModal === null || registerModal === void 0 ? void 0 : registerModal.classList.contains("hidden");
    const isLoginVisible = loginModal === null || loginModal === void 0 ? void 0 : loginModal.classList.contains("hidden");
    if (isRegisterVisible && isLoginVisible) {
        registerModal === null || registerModal === void 0 ? void 0 : registerModal.classList.remove("hidden");
    }
    else {
        registerModal === null || registerModal === void 0 ? void 0 : registerModal.classList.add("hidden");
        loginModal === null || loginModal === void 0 ? void 0 : loginModal.classList.add("hidden");
    }
}
function showRegisterModal() {
    registerModal === null || registerModal === void 0 ? void 0 : registerModal.classList.remove("hidden");
    loginModal === null || loginModal === void 0 ? void 0 : loginModal.classList.add("hidden");
}
function showLoginModal() {
    loginModal === null || loginModal === void 0 ? void 0 : loginModal.classList.remove("hidden");
    registerModal === null || registerModal === void 0 ? void 0 : registerModal.classList.add("hidden");
}
// Event Listeners
export const setupModals = () => {
    // Toggle modals with user button
    toggleModalBtn === null || toggleModalBtn === void 0 ? void 0 : toggleModalBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleModals();
    });
    // Switch between modals
    showLoginLink === null || showLoginLink === void 0 ? void 0 : showLoginLink.addEventListener("click", (e) => {
        e.preventDefault();
        showLoginModal();
    });
    showRegisterLink === null || showRegisterLink === void 0 ? void 0 : showRegisterLink.addEventListener("click", (e) => {
        e.preventDefault();
        showRegisterModal();
    });
    // Close modals when clicking outside
    document.addEventListener("click", (e) => {
        const target = e.target;
        if (!(registerModal === null || registerModal === void 0 ? void 0 : registerModal.contains(target)) &&
            !(loginModal === null || loginModal === void 0 ? void 0 : loginModal.contains(target)) &&
            target !== toggleModalBtn) {
            registerModal === null || registerModal === void 0 ? void 0 : registerModal.classList.add("hidden");
            loginModal === null || loginModal === void 0 ? void 0 : loginModal.classList.add("hidden");
        }
    });
    // Close on ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            registerModal === null || registerModal === void 0 ? void 0 : registerModal.classList.add("hidden");
            loginModal === null || loginModal === void 0 ? void 0 : loginModal.classList.add("hidden");
        }
    });
};
// messages alert modal
export const showMessage = (message, isSuccess = true) => {
    const modal = document.getElementById("messageModal");
    const messageText = document.getElementById("messageText");
    if (!modal || !messageText) {
        console.error("Message modal elements not found.");
        return;
    }
    messageText.textContent = message;
    modal.classList.remove("hidden", "error", "success");
    modal.classList.add(isSuccess ? "success" : "error", "opacity-100");
    setTimeout(() => {
        modal.classList.add("hidden");
    }, 2000);
};
//# sourceMappingURL=modal.js.map
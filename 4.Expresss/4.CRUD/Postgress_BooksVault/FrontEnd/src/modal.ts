// Get modal elements
const toggleModalBtn = document.getElementById("userBtn");
const registerModal = document.getElementById("userRegisterModal");
const loginModal = document.getElementById("userLoginModal");
const showLoginLink = document.getElementById("showLogin");
const showRegisterLink = document.getElementById("showRegister");

// Modal handling functions
function toggleModals() {
  const isRegisterVisible = registerModal?.classList.contains("hidden");
  const isLoginVisible = loginModal?.classList.contains("hidden");
  
  if (isRegisterVisible && isLoginVisible) {
    registerModal?.classList.remove("hidden");
  } else {
    registerModal?.classList.add("hidden");
    loginModal?.classList.add("hidden");
  }
}

function showRegisterModal() {
  registerModal?.classList.remove("hidden");
  loginModal?.classList.add("hidden");
}

function showLoginModal() {
  loginModal?.classList.remove("hidden");
  registerModal?.classList.add("hidden");
}

// Event Listeners
export const setupModals = () => {
  // Toggle modals with user button
  toggleModalBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleModals();
  });

  // Switch between modals
  showLoginLink?.addEventListener("click", (e) => {
    e.preventDefault();
    showLoginModal();
  });

  showRegisterLink?.addEventListener("click", (e) => {
    e.preventDefault();
    showRegisterModal();
  });

  // Close modals when clicking outside
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!registerModal?.contains(target) && 
        !loginModal?.contains(target) && 
        target !== toggleModalBtn) {
      registerModal?.classList.add("hidden");
      loginModal?.classList.add("hidden");
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      registerModal?.classList.add("hidden");
      loginModal?.classList.add("hidden");
    }
  });
};


// messages alert modal
export const showMessage = (message: string, isSuccess: boolean = true) => {
  const modal = document.getElementById("messageModal") as HTMLDivElement | null;
  const messageText = document.getElementById("messageText") as HTMLParagraphElement | null;

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



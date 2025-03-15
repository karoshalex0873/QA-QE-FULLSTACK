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
// Sanitize user input to prevent XSS
const escapeHtml = (unsafe) => {
    return unsafe.replace(/[&<"'>]/g, (m) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
    }[m] || m));
};
// Fetch users from backend
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("http://localhost:3000/api/v1/users/appUsers", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (!response.ok) {
            showMessage("⚠️ Failed to fetch users", false);
            return null;
        }
        return yield response.json();
    }
    catch (error) {
        console.error("Fetch users error:", error);
        showMessage("❌ Failed to load user accounts", false);
        return null;
    }
});
// Populate users table
const populateUsersTable = (users, isAdmin) => {
    var _a;
    const modal = document.getElementById("userAccountsModal");
    if (!modal)
        return;
    // Sort users with Admins first
    users.sort((a, b) => {
        if (a.role_name === "Admin" && b.role_name !== "Admin")
            return -1;
        if (b.role_name === "Admin" && a.role_name !== "Admin")
            return 1;
        return 0;
    });
    const storedUser = localStorage.getItem("user");
    const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
    const usersHTML = `  
  <div class="flex justify-between items-center mb-3">
    <h3 class="text-lg font-semibold flex items-center gap-2">
      <i class="fas fa-users text-blue-500"></i> User Accounts
    </h3>
    <button id="closeModalBtn" class="text-gray-500 hover:text-red-500 text-lg">&times;</button>
  </div>

  <div class="max-h-80 overflow-y-auto">
    <table class="min-w-full text-sm">
      <thead class="bg-gray-50 dark:bg-slate-800 text-white">
        <tr>
          <th class="px-3 py-2 text-left"><i class="fas fa-user text-gray-400"></i> Name</th>
          <th class="px-3 py-2 text-left"><i class="fas fa-envelope text-gray-400"></i> Email</th>
          <th class="px-3 py-2 text-left"><i class="fas fa-user-tag text-gray-400"></i> Role</th>
          ${isAdmin ? '<th class="px-3 py-2 text-center">Actions</th>' : ""}
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-slate-700">
        ${users
        .map((user) => `
          <tr key="${user.user_id}" class="hover:bg-gray-100 dark:hover:bg-slate-800/50">
            <td class="px-3 py-2 flex items-center gap-2">
              <i class="fas fa-user text-primary"></i> ${escapeHtml(user.name)}
            </td>
            <td class="px-3 py-2">${escapeHtml(user.email)}</td>
            <td class="px-3 py-2">${escapeHtml(user.role_name)}</td>
            ${isAdmin && user.user_id !== (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.user_id)
        ? `
            <td class="px-3 py-2 text-center flex gap-2 justify-center">
              ${user.role_name !== "Admin"
            ? `
                <button class="toggle-role-btn bg-green-900 hover:bg-green-950 text-white px-2 py-1 rounded-md cursor-pointer" 
                  data-userid="${user.user_id}" data-newrole="Admin">
                  <i class="fas fa-user-shield"></i> Make Admin
                </button>`
            : `
                <button class="toggle-role-btn bg-red-900 hover:bg-red-950 text-white px-2 py-1 rounded-md"
                  data-userid="${user.user_id}" data-newrole="User">
                  <i class="fas fa-user-times"></i> Revoke Admin
                </button>`}
              
              ${user.role_name !== "Librarian"
            ? `
                <button class="toggle-role-btn bg-blue-900 hover:bg-blue-950 text-white px-2 py-1 rounded-md" 
                  data-userid="${user.user_id}" data-newrole="Librarian">
                  <i class="fas fa-book"></i> Make Librarian
                </button>`
            : `
                <button class="toggle-role-btn bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md"
                  data-userid="${user.user_id}" data-newrole="User">
                  <i class="fas fa-user-minus"></i> Revoke Librarian
                </button>`}
            </td>
            `
        : ""}
          </tr>
        `)
        .join("")}
      </tbody>
    </table>
  </div>`;
    modal.innerHTML = usersHTML;
    modal.classList.remove("hidden");
    // Add close modal handler
    (_a = document.getElementById("closeModalBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
    if (isAdmin) {
        document.querySelectorAll(".toggle-role-btn").forEach((button) => {
            button.addEventListener("click", handleRoleToggle);
        });
    }
};
// Handle role updates
const handleRoleToggle = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = this.dataset.userid;
        const newRole = this.dataset.newrole;
        const originalHTML = this.innerHTML;
        if (!userId || !newRole)
            return;
        try {
            // Show loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            this.classList.add("opacity-50", "cursor-not-allowed");
            const response = yield fetch(`http://localhost:3000/api/v1/users/updateRole/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ newRole: newRole }),
            });
            if (!response.ok) {
                const error = yield response.json();
                throw new Error(error.message);
            }
            showMessage(`✔️ User role changed to ${newRole}`, true);
            showUserAccounts(); // Refresh the table
        }
        catch (error) {
            console.error("Role update error:", error);
            showMessage(`❌ ${error instanceof Error ? error.message : "Failed to update role"}`, false);
        }
        finally {
            // Restore button state
            this.innerHTML = originalHTML;
            this.classList.remove("opacity-50", "cursor-not-allowed");
        }
    });
};
// Main export to show user accounts
export const showUserAccounts = () => __awaiter(void 0, void 0, void 0, function* () {
    const modal = document.getElementById("userAccountsModal");
    if (!modal)
        return;
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (!user || user.role_name !== "Admin") {
        showMessage("⚠️ Admin access required", false);
        return;
    }
    const users = yield fetchUsers();
    if (users) {
        populateUsersTable(users, true);
    }
});
//# sourceMappingURL=userTables.js.map
import { showMessage } from "./modal";

interface UserType {
  user_id: string;
  name: string;
  email: string;
  role_name: string;
}

// Fetch users
const fetchUsers = async (): Promise<UserType[] | null> => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/users/appUsers", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      showMessage("⚠️ Failed to fetch users", false);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    showMessage("❌ Unable to load users", false);
    return null;
  }
};

// Display users in modal
const displayUsers = (users: UserType[]) => {
  const modal = document.getElementById("userAccountsModal");
  if (!modal) return;

  modal.innerHTML = `
    <div class="flex justify-between items-center mb-3">
      <h3 class="text-lg font-semibold">User Accounts</h3>
      <button id="closeModalBtn" class="text-gray-500 hover:text-red-500 text-lg">&times;</button>
    </div>

    <table class="min-w-full text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-3 py-2 text-left">Name</th>
          <th class="px-3 py-2 text-left">Email</th>
          <th class="px-3 py-2 text-left">Role</th>
          <th class="px-3 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${users
          .map(
            (user) => `
          <tr>
            <td class="px-3 py-2">${user.name}</td>
            <td class="px-3 py-2">${user.email}</td>
            <td class="px-3 py-2">${user.role_name}</td>
            <td class="px-3 py-2 text-center">
              <button class="role-btn bg-blue-500 text-white px-2 py-1 rounded"
                data-id="${user.user_id}" data-role="${user.role_name}">
                Change Role
              </button>
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

  modal.classList.remove("hidden");

  document.getElementById("closeModalBtn")?.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  document.querySelectorAll(".role-btn").forEach((btn) =>
    btn.addEventListener("click", handleRoleUpdate)
  );
};

// Update user role
const handleRoleUpdate = async function (this: HTMLButtonElement) {
  const userId = this.dataset.id;
  const currentRole = this.dataset.role;
  const newRole = currentRole === "User" ? "Admin" : "User"; 

  try {
    this.textContent = "Updating...";
    this.disabled = true;

    const response = await fetch(
      `http://localhost:3000/api/v1/users/updateRole/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ newRole }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update role");
    }

    showMessage(`✔️ Role updated to ${newRole}`, true);
    loadUsers(); 
  } catch (error) {
    showMessage("❌ Role update failed", false);
  } finally {
    this.textContent = "Change Role";
    this.disabled = false;
  }
};

// Load users and show modal
export const loadUsers = async () => {
  const modal = document.getElementById("userAccountsModal");
  if (!modal) return;

  const users = await fetchUsers();
  if (users) displayUsers(users);
};

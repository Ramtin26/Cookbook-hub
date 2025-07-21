import { wait } from "../utils/helpers";

const API_URL_USERS = "http://localhost:3001/users";

export async function signup(userData) {
  const res = await fetch(API_URL_USERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) throw new Error("Failed to sign up");

  const newUser = await res.json();

  localStorage.setItem("user", JSON.stringify(newUser));

  return newUser;
}

export async function login({ email, password }) {
  await wait(300);
  const res = await fetch(`${API_URL_USERS}?email=${email}`);

  if (!res.ok) throw new Error("Failed to fetch user");

  const users = await res.json();

  if (users.length === 0) throw new Error("User not found");

  const user = users[0];

  if (user.password !== password) throw new Error("Incorrect password");

  localStorage.setItem("user", JSON.stringify(user));

  return { user };
}

export async function getCurrentUser() {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) return null;

  const user = JSON.parse(storedUser);

  return user;
}

export async function getUserFromServer(id) {
  const res = await fetch(`${API_URL_USERS}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user from server");

  const user = await res.json();
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export async function logout() {
  await wait(300);
  localStorage.removeItem("user");
  return null;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  await wait(500);
  const storedUser = localStorage.getItem("user");
  if (!storedUser) throw new Error("No logged-in user");

  const currentUser = JSON.parse(storedUser);

  const updatedFields = { ...currentUser };

  if (password) updatedFields.password = password;
  if (fullName) updatedFields.username = fullName;
  if (avatar) updatedFields.avatarImage = avatar;

  const res = await fetch(`${API_URL_USERS}/${currentUser.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  });

  if (!res.ok) throw new Error("Failed to update user");

  const updatedUser = await res.json();

  localStorage.setItem("user", JSON.stringify(updatedUser));

  return { user: updatedUser };
}

export async function getUsersByIds(ids) {
  const res = await fetch(API_URL_USERS);

  if (!res.ok) throw new Error("User could not be found");

  const data = await res.json();

  return data.filter((item) => ids.includes(String(item.id)));
}

export async function getAllUsers() {
  const res = await fetch(API_URL_USERS);

  if (!res.ok) throw new Error("Users couldn't be found");

  return await res.json();
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json();
}

export async function createUser(user) {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json();
}

export default API_URL;

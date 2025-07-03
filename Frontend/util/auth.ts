

// my-fullstack-app/Frontend/util/auth.ts
  const TOKEN_KEY = 'access_token';

export const saveAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
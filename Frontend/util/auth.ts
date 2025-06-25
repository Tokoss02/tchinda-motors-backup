export const getAuthToken = (): string | null => {
    return localStorage.getItem('access_token');
  };
  
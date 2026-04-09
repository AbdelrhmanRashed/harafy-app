export const getIdFromToken = (): number | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.ClientId ? Number(payload.ClientId) : null;
  } catch {
    return null;
  }
};

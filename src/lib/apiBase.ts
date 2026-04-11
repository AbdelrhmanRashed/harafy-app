/** Shared API origin — used by axios, getImageUrl, and any raw fetch. */
export const API_BASE = (
  import.meta.env.VITE_BASE_URL as string | undefined
)?.replace(/\/$/, '') || 'https://iti-final-project.runasp.net';

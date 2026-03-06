/**
 * API base URL — resolves to the backend.
 *
 * In DEVELOPMENT  → empty string (Vite proxy handles /api and /admin)
 * In PRODUCTION   → the Render backend URL from VITE_API_URL env var
 */
export const API_BASE =
    import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== '/'
        ? import.meta.env.VITE_API_URL.replace(/\/+$/, '')   // trim trailing slash
        : '';

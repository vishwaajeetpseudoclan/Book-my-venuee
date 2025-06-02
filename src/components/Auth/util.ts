/**
 * Check if user is authenticated
 * @returns {boolean} - Returns true if user is authenticated
 */
export const isAuthenticated = () => !!localStorage.getItem("AUTH_TOKEN");

/**
 * Get user role
 * @returns {string} - User role
 */
export const getRole = () => localStorage.getItem("ROLE");

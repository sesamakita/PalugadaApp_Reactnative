/**
 * StorageService
 * Manages all local device storage operations for the Palugada App.
 * Uses a standardized naming convention to avoid collisions.
 */

const PREFIX = 'palugada_';

export const STORAGE_KEYS = {
    AUTH_TOKEN: `${PREFIX}auth_token`,
    USER_SESSION: `${PREFIX}user_session`,
    IS_LOGGED_IN: `${PREFIX}is_logged_in`,
    CART_ITEMS: `${PREFIX}cart_items`,
    USER_FAVORITES: `${PREFIX}user_favorites`,
    USER_LOCATION: `${PREFIX}user_location`,
    LOCAL_USERS: `${PREFIX}local_users`,
    CURRENT_USER: `${PREFIX}current_user`,
    APP_ROLE: `${PREFIX}app_role`,
    NOTIFICATION_SETTINGS: `${PREFIX}notif_settings`,
    THEME_MODE: `${PREFIX}theme_mode`,
};

const StorageService = {
    /**
     * Save data to local storage
     * @param {string} key 
     * @param {any} value 
     */
    save(key, value) {
        try {
            const serialized = typeof value === 'string' ? value : JSON.stringify(value);
            localStorage.setItem(key, serialized);
            return true;
        } catch (error) {
            console.error('StorageService: Save failed', error);
            return false;
        }
    },

    /**
     * Get data from local storage
     * @param {string} key 
     * @param {any} defaultValue 
     */
    get(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            if (data === null) return defaultValue;
            
            // Try to parse if it looks like JSON
            if (data.startsWith('{') || data.startsWith('[')) {
                return JSON.parse(data);
            }
            
            // Handle booleans
            if (data === 'true') return true;
            if (data === 'false') return false;
            
            return data;
        } catch (error) {
            console.error('StorageService: Get failed', error);
            return defaultValue;
        }
    },

    /**
     * Remove specific key
     * @param {string} key 
     */
    remove(key) {
        localStorage.removeItem(key);
    },

    /**
     * Clear all Palugada related data
     */
    clearApp() {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    },

    /**
     * Clear session only (for logout)
     */
    clearSession() {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_SESSION);
        localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'false');
    }
};

export default StorageService;

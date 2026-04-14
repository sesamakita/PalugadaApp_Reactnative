import StorageService, { STORAGE_KEYS } from './StorageService';

/**
 * AuthService
 * Emulates a backend authentication system using local storage.
 * Stores users in an array and verifies credentials locally.
 */

const AuthService = {
    /**
     * Register a new user locally
     * @param {Object} userData { name, email, phone, password }
     */
    register(userData) {
        try {
            const users = StorageService.get(STORAGE_KEYS.LOCAL_USERS, []);
            
            // Check if user already exists
            const exists = users.find(u => u.email === userData.email);
            if (exists) {
                return { success: false, message: 'Email sudah terdaftar.' };
            }
            
            // Add new user
            const newUser = {
                ...userData,
                id: Date.now().toString(),
                role: 'Member Gold', // Default role
                createdAt: new Date().toISOString()
            };
            
            users.push(newUser);
            StorageService.save(STORAGE_KEYS.LOCAL_USERS, users);
            
            return { success: true, user: newUser };
        } catch (error) {
            return { success: false, message: 'Terjadi kesalahan saat pendaftaran.' };
        }
    },

    /**
     * Login user locally
     * @param {string} email 
     * @param {string} password 
     */
    login(email, password) {
        try {
            const users = StorageService.get(STORAGE_KEYS.LOCAL_USERS, []);
            
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Return user without sensitive data if needed, 
                // but for simulation we return all except password
                const { password: _, ...userSession } = user;
                return { success: true, user: userSession };
            }
            
            return { success: false, message: 'Email atau kata sandi salah.' };
        } catch (error) {
            return { success: false, message: 'Terjadi kesalahan saat masuk.' };
        }
    },

    /**
     * Get the current logged in user session
     */
    getCurrentSession() {
        return StorageService.get(STORAGE_KEYS.CURRENT_USER, null);
    }
};

export default AuthService;

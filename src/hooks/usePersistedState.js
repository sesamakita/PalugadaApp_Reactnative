import { useState, useEffect } from 'react';
import StorageService from '../services/StorageService';

/**
 * usePersistedState
 * A custom hook that functions like useState but persists the value to local storage.
 * 
 * @param {string} key - The storage key to use
 * @param {any} defaultValue - Initial value if none is found in storage
 */
function usePersistedState(key, defaultValue) {
    // 1. Initialize state with value from storage or default
    const [state, setState] = useState(() => {
        return StorageService.get(key, defaultValue);
    });

    // 2. Sync with storage whenever state changes
    useEffect(() => {
        StorageService.save(key, state);
    }, [key, state]);

    return [state, setState];
}

export default usePersistedState;

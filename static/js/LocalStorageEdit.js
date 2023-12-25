// version for raw javascript

export function useLocalStorageStateRaw(key, defaultValue) {
    function setValue(newValue) {
        window.localStorage.setItem(key, newValue);
        window.dispatchEvent(
            new StorageEvent("storage", { key, newValue })
        );
    }
    
    
    const store = {
        getSnapshot: () => localStorage.getItem(key),
    };
    
    if (store.getSnapshot() === null) {
        setValue(defaultValue);
    }
    
    return [
        store.getSnapshot(),
        setValue,
    ];
}

export function useLocalStorageStateBoolRaw(key, defaultValue) {
    function setValue(newValue) {
        window.localStorage.setItem(key, newValue);
        window.dispatchEvent(
            new StorageEvent("storage", { key, newValue })
        );
    }
    
    
    const store = {
        getSnapshot: () => (localStorage.getItem(key) === "true"),
    };
    
    if (store.getSnapshot() === null) {
        setValue(defaultValue);
    }
    
    return [
        store.getSnapshot(),
        setValue,
    ];
}
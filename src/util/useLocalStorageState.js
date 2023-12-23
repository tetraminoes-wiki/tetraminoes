import {useSyncExternalStore} from "react";

export function useLocalStorageState(key, defaultValue) {
    function setValue(newValue) {
        window.localStorage.setItem(key, newValue);
        window.dispatchEvent(
            new StorageEvent("storage", { key, newValue })
        );
    }
    
    const store = {
        getSnapshot: () => localStorage.getItem(key),
        subscribe: (listener) => {
            window.addEventListener("storage", listener);
            return () => void window.removeEventListener("storage", listener);
        },
    };
    
    if (store.getSnapshot() === null) {
        setValue(defaultValue);
    }
    
    const stored = useSyncExternalStore(
        store.subscribe,
        store.getSnapshot,
    );
    
    return [
        stored,
        setValue,
    ];
}


export function useLocalStorageStateBool(key, defaultValue) {
    function setValue(newValue) {
        window.localStorage.setItem(key, newValue);
        window.dispatchEvent(
            new StorageEvent("storage", { key, newValue })
        );
    }
    
    const store = {
        getSnapshot: () => (localStorage.getItem(key) === "true"),
        subscribe: (listener) => {
            window.addEventListener("storage", listener);
            return () => void window.removeEventListener("storage", listener);
        },
    };
    
    if (store.getSnapshot() === null) {
        setValue(defaultValue);
    }
    
    const stored = useSyncExternalStore(
        store.subscribe,
        store.getSnapshot,
    );
    
    return [
        stored,
        setValue,
    ];
}


export const getLocalStorageItem = (name) => localStorage.getItem(name) || '';

export const setLocalStorageItem = (name, value) => localStorage.setItem(name, value )

export const removeLocalStorageItem = (name) => localStorage.removeItem(name)
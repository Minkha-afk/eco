export const STORAGE_KEYS = {
  CART_DATA: 'eco2_cart_data',
  ADDRESSES: 'eco2_addresses',
  SELECTED_ADDRESS_ID: 'eco2_selected_address_id'
} as const;

export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    console.warn(`Failed to parse ${key} from localStorage`);
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn(`Failed to save ${key} to localStorage`);
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(key);
  } catch {
    console.warn(`Failed to remove ${key} from localStorage`);
  }
}

export function clearStorage(): void {
  if (typeof window === 'undefined') return;

  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch {
    console.warn('Failed to clear localStorage');
  }
}

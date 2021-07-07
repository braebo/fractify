import { writable } from 'svelte/store';

const client = typeof window !== "undefined";

const setAsync = async (key: string, value: any): Promise<void> => {
	return Promise.resolve().then(() => {
		typeof value != 'string'
			? localStorage.setItem(key, JSON.stringify(value))
			: localStorage.setItem(key, value);
	});
}

const getAsync = async (key: string): Promise<JSON> => {
	return Promise.resolve().then(() => {
		let value = localStorage.getItem(key);
		return typeof value != 'string'
			? JSON.parse(value)
			: value;
	});
};

// Adapted from https://svelte.dev/repl/7b4d6b448f8c4ed2b3d5a3c31260be2a?version=3.34.0
export const localStorageStore = (key: string, value: any) => {
	const { set: setStore, ...readableStore } = writable(value, () => {
		if (!client) return;

		getAndSetFromLocalStorage();

		const updateFromStorageEvents = (event) => {
			if (event.key === key) getAndSetFromLocalStorage();
		};
		window.addEventListener("storage", updateFromStorageEvents);
		return () => window.removeEventListener("storage", updateFromStorageEvents);
	});

	// Set both localStorage and this Svelte store
	const set = async (value: any) => {
		setStore(value);
		try {
			await setAsync(key, value);
		} catch (error) {
			console.error(`the \`${key}\` store's new value \`${value}\` could not be persisted to localStorage because of ${error}`);
		}
	};

	// Synchronize the Svelte store with localStorage
	const getAndSetFromLocalStorage = async () => {
		let localValue = null;
		localValue = await getAsync(key).catch((error) => {
			console.error(`the \`${key}\` store's value could not be restored from localStorage because of ${error}`);
		})

		if (localValue === null) {
			await setAsync(key, value);
		}
		else {
			try {
				// await setAsync(key, localValue);
				setStore(localValue);
			} catch (error) {
				console.error(`the \`${key}\` store's value could not be added to localStorage because of ${error}`);
			}
		}
	};

	return { ...readableStore, set };
};

export default localStorageStore
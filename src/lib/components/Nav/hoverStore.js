import { writable } from 'svelte/store';

export const hoverState = writable({ item: null, hovering: false });

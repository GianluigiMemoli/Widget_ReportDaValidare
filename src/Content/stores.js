import {writable} from "svelte/store";

export const selectedProgetto = writable("");
export const selectedFrequenza = writable("");
export const selectedPeriodo = writable("");
export const drafts = writable({});
export const selectedDraft = writable({});
export const commenti = writable([]);

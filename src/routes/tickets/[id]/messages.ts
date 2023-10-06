import { writable } from 'svelte/store';
import type { Message } from '../../../app';

export const messages = writable<Message[]>([]);

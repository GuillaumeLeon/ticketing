// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { Database } from './types/database.types.js';
import { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
    namespace App {
        interface Locals {
            supabase: SupabaseClient<Database>;
            getSession(): Promise<Session | null>;
            protected(): Promise<void>;
        }
        interface PageData {
            session: Session | null;
        }
        // interface Error {}
        // interface Platform {}
    }
}

export type Ticket = Database['public']['Tables']['tickets']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];

export {};

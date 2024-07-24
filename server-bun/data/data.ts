import type { User } from "./types.d.ts";

// a map to keep track of all users
export const users = new Map<WebSocket, User | {}>();

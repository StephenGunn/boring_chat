export type User = {
  id: string;
  joined_at: number;
  name?: string;
  room?: string;
};

export type Message = {
  id: string;
  user: User;
  timestamp: number;
  content: string;
};

export type Room = {
  users: Map<string, User>;
  messages: Message[];
  name: string;
};

export type ConsoleMessage = {
  timestamp: number;
  content: string;
};

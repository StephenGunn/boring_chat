type User = {
  id: string;
  joined_at: number;
  name?: string;
  room?: string;
};

type Message = {
  id: string;
  user: User;
  timestamp: number;
  content: string;
};

type RoomData = {
  users: User[]; // user.id -> user
  messages: Message[];
  name: string;
};

type IncomingMessage = {
  type: string;
  data: Message;
};

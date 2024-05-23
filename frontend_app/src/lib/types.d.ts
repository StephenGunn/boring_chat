type User = {
  id: string;
  name: string;
};

type Message = {
  id: string;
  user: User;
  timestamp: number;
  content: string;
};

type Room = {
  users: User[];
  messages: Message[];
  id: string;
  name: string;
};

type ConsoleMessage = {
  timestamp: number;
  content: string;
};

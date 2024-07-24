export class Room {
  users: User[] = $state([]);
  messages: Message[] = $state([]);
  name: string = $state('');

  constructor(name: string) {
    this.name = name;
  }

  inject_data(data: RoomData) {
    this.users = data.users;
    this.messages = data.messages;
    this.name = data.name;
  }

  update_user_list(users: User[]) {
    this.users = users;
  }

  add_message(message: Message) {
    this.messages.push(message);
  }

  // return the state
  get_messages() {
    return this.messages;
  }

  get_users() {
    return this.users;
  }

  get_user_count() {
    return this.users.length;
  }

  get_name() {
    return this.name;
  }
}

export const current_room = new Room('welcome');

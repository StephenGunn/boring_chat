export class Room {
  users: User[] = $state([]);
  messages: Message[] = $state([]);
  id: string = $state('');
  name: string = $state('');

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  // Manage the state
  add_user(user: User) {
    this.users.push(user);
  }

  remove_user(user: User) {
    this.users = this.users.filter((u) => u.id !== user.id);
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

  get_id() {
    return this.id;
  }

  get_name() {
    return this.name;
  }
}

export const current_room = new Room('welcome', 'Welcome');

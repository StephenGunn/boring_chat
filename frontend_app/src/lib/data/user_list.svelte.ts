export class UserList {
  users: User[] = $state([]);

  add_user(user: User) {
    this.users = [...this.users, user];
  }

  remove_user(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  get_users() {
    return this.users;
  }

  get_user(id: string) {
    return this.users.find((user) => user.id === id);
  }
}

export const user_list = new UserList();

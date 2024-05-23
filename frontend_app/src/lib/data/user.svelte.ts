// holds the current user's data
class CurrentUser {
  id: string = $state('');
  name: string = $state('');
  current_room: Room | undefined = $state();
  connected_at: number | undefined = $state();

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.connected_at = Date.now();
  }

  // setters
  set_new_user(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  set_current_room(room: Room) {
    this.current_room = room;
  }

  get_id() {
    return this.id;
  }

  get_name() {
    return this.name;
  }

  get_current_room() {
    return this.current_room;
  }

  get_user() {
    return {
      id: this.id,
      name: this.name,
      connected_at: this.connected_at
    };
  }
}

export const current_user = new CurrentUser('', '');

import { Room } from './room.svelte';
class RoomList {
  rooms: Room[] = $state([]);

  constructor() {
    // Create a default room
    this.add_room(new Room('welcome', 'Welcome'));
  }

  add_room(room: Room) {
    this.rooms.push(room);
  }

  remove_room(room: Room) {
    this.rooms = this.rooms.filter((r) => r.id !== room.id);
  }

  get_rooms() {
    return this.rooms;
  }

  get_room_count() {
    return this.rooms.length;
  }

  get_room_by_id(id: string) {
    return this.rooms.find((r) => r.id === id);
  }
}

export const room_list = new RoomList();

// All the websocket connection logic goes here
// We will be using runes and svelte5 storage to keep track of the connection
// We will also be updating the other data stores from here

import { current_room } from '$lib/data/room.svelte.js';

class WebsocketConnection {
  private socket: WebSocket | null = null;
  private server = 'ws://localhost:5556';
  user: User | null = null;
  connected: boolean = $state(false);
  trying_to_reconnect: boolean = $state(false);

  // generate an ID for the user without a 3rd party dependency
  private generate_silly_id() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
  }

  // Establish the connection with the server
  connect() {
    console.log('Connecting to server...');
    this.socket = new WebSocket(this.server);

    this.socket.onopen = () => {
      console.log('Connected to server');
      this.connected = true;
      this.user = {
        id: this.generate_silly_id(),
        joined_at: Date.now()
      };
      this.send('join', this.user);
    };

    this.socket.onmessage = (event) => {
      const { type, data }: { type: string; data: RoomData } = JSON.parse(event.data);
      console.log(`Incoming message of type: "${type}"`, data);

      switch (type) {
        // when we join a room, we get all associated data about the room
        case 'room_data':
          current_room.inject_data(data);
          break;

        // when another user joins a room we're in, we need to update our room's user list
        case 'room_user_data':
          current_room.update_user_list(data.users);
          break;
      }
    };

    this.socket.onclose = () => {
      console.log('Disconnected from server');
      this.connected = false;
      this.reconnect();
    };
  }

  // auto rejoin logic
  reconnect() {
    console.log('Trying to reconnect to server...');
    let interval: ReturnType<typeof setInterval> | null = null;

    const reconnect = () => {
      if (this.connected) {
        this.trying_to_reconnect = false;
        clearInterval(interval!);
        return;
      }

      this.connect();
    };

    // only set up one interval once
    if (this.trying_to_reconnect) {
      return;
    }
    // try to reconnect every 10 seconds
    interval = setInterval(reconnect, 10000);
    this.trying_to_reconnect = true;
  }

  // send a chat message
  send_message(type: string, data: any) {
    if (this.socket) {
      this.socket.send(JSON.stringify({ type, data }));
    }
  }

  // send a generic message
  send(type: string, data: any) {
    if (this.socket) {
      this.socket.send(JSON.stringify({ type, data }));
    }
  }

  // this will be used to set the initial name and update the name in the future
  set_user_name(name: string) {
    if (!this.user) {
      return;
    }

    this.user.name = name;
    this.send('update_user', this.user);
  }

  // set the users room
  add_user_to_room(room: string) {
    if (!this.user) {
      return;
    }

    // are we already in this room?
    if (this.user.room === room) {
      return;
    }

    // keep track of the old room
    const old_room = this.user.room;

    // set the state in the browser
    this.user.room = room;

    // send the update to the server, this will result in the server
    // sending back all the data about that room
    this.send('add_user_to_room', { new_room: room, old_room, user: this.user });
  }

  // if a user creates a room
  create_room(room: string) {
    this.send('create_room', { room, user: this.user });
  }

  // EXPOSE STATE TO UI COMPONENTS //
  // allow our UI to check if the connection is established
  is_connected = () => this.connected;

  // allow our UI to check if the connection is trying to reconnect
  is_reconnecting = () => this.trying_to_reconnect;

  // return our user info
  get_user = () => this.user;
}

export const connection = new WebsocketConnection();

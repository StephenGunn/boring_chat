// Keep track of users in a map using the ws connection as the key
// We also use a user_id that we generate on the frontend to keep
// track of users in the frontend - this isn't necessary but it'<s>h</s>
import type { ServerWebSocket } from "bun";
import type { User, Room } from "./data/types.d.ts";

// types
type WebSocketInit = {};

// data storage
const users = new Map<ServerWebSocket<WebSocketInit>, User | {}>();
// start with our default #welcome room
const rooms = new Map<string, Room>([
  [
    "welcome",
    { users: new Map<string, User>(), messages: [], name: "welcome" },
  ],
]);

// utility function to convert a map to an array of objects to send over the wire
const convert_room_user_map = (map: Map<string, User>) => {
  const arr: User[] = [];
  map.forEach((value) => {
    arr.push(value);
  });
  return arr;
};

// format a room to send over the wire
const format_room = (room?: Room) => {
  if (!room) {
    console.error("Cannot format room, no data", room);
    return null;
  }
  return {
    name: room.name,
    users: convert_room_user_map(room.users),
    messages: room.messages,
  };
};

// room and user management functions
const create_new_room = (name: string, first_user: User) => {
  // check if the room already exists
  if (rooms.has(name)) {
    return;
  }

  // create a new room
  rooms.set(name, {
    name,
    users: new Map<string, User>([[first_user.id, first_user]]),
    messages: [],
  });
};

const does_room_exist = (name: string) => rooms.has(name);

const add_user_to_room = (room: string, user: User) => {
  // check if the room exists
  if (!does_room_exist(room)) {
    return;
  }

  // add the user to the room
  rooms.get(room)?.users.set(user.id, user);

  console.log("added user to room", room, user);
  console.log("rooms state", rooms);
};

const remove_user_from_room = (room: string, user: User) => {
  // check if the room exists
  if (!does_room_exist(room)) {
    return;
  }

  // remove the user from the room
  rooms.get(room)?.users.delete(user.id);
};

// BUN SERVER
// All remaining websocket management logic will be done in this file
const server = Bun.serve<WebSocketInit>({
  async fetch(req, server) {
    // try to upgrade the connection to a websocket connection
    const success = server.upgrade(req);

    if (success) {
      console.log("a HTTP connection has been upgraded to WebSocket");
      return undefined; // return undefined to signal that the connection has been upgraded
    }
    // return a simple message for anyone else
    return new Response(
      "This Bun server only accepts WebSocket connections, but it is working :)",
    );
  },
  websocket: {
    // connection logic - this happens immediately after a successful upgrade
    open(ws) {
      // we just have the connection and no additional data
      // add the anon user to the users map
      users.set(ws, {});
    },
    // this is called when a message is received
    async message(ws, message) {
      // message parsing
      let msg: { type: string; data: Record<string, unknown> };
      try {
        msg = JSON.parse(message.toString());
      } catch (e) {
        console.error("could not parse message", message);
        return;
      }

      // QOL destructuring
      const { type, data } = msg;

      // control flow for our different types of incoming messages
      switch (type) {
        case "join":
          console.log("user joined", data);

          // update the user in the users map
          users.set(ws, data);
          break;
        case "update_user":
          console.log("user updated", data);

          // update the user in the users map
          users.set(ws, data);
          break;
        case "add_user_to_room":
          {
            console.log("adding user to room", data);

            const user = data.user as User;
            const old_room = data.old_room as string;
            const new_room = data.new_room as string;

            // check to make sure we have our data
            if (!user || !new_room) {
              console.error("missing data for add_user_to_room", data);
              return;
            }

            // update the user in the users map
            users.set(ws, user);

            // check if the old room exists and make sure it's not #Welcome
            if (does_room_exist(old_room) && old_room !== "welcome") {
              remove_user_from_room(old_room, user);
            }

            // check if the old room exists
            if (does_room_exist(new_room)) {
              add_user_to_room(new_room, user);
            } else {
              create_new_room(new_room, user);
            }

            // subscribe to the new room
            ws.subscribe(new_room);

            const new_room_data = rooms.get(new_room);

            const room_data = JSON.stringify({
              type: "room_data",
              data: format_room(new_room_data),
            });

            console.log("sending room data", room_data);

            // send the updated room data to the user
            ws.send(room_data);

            // format the new user data to send to the other users in the room
            const room_user_list = convert_room_user_map(new_room_data?.users!);

            const room_user_data = JSON.stringify({
              type: "room_user_data",
              data: room_user_list,
            });

            // send the updated room data to all users in the room
            ws.publish(new_room, room_user_data);
          }

          break;
        case "message":
          console.log("user sent a message", data);
          break;
        default:
          console.log("unknown message type", data);
          break;
      }
    },
    close(ws) {
      console.log("closed connection", ws);
    },
  },
});

console.log(
  `The boring_chat Bun server has started and is listening on ${server.hostname}:${server.port}`,
);

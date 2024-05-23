# boring_chat

A testing ground for languages and frameworks using a standardized chat application.

## Goals

The goal of this project is to create a simple chat application that can be used to test out different languages and frameworks.

Since I am a web-developer, I examnine technology through a web-development lens. This project is meant to help facilitate that examination through building a simple chat application with the same specifications across different languages and frameworks.

## Frontend

The frontend app is a simple sveltekit application meant to be run locally on your machine with little to no config needed. I did add
some basic styling and quality of life features to the app, but the main focus will be on the various backends.

The frontend is built with typescript and a hand-rolled websocket client that uses Svelte 5's runes and stores to manage the state of the chat application.

## Backend(s)

Each backend will be a simple websocket server that will handle the chat application's logic. The server will be responsible for handling the following events:

- `join`: When a user joins the chat
- `leave`: When a user leaves the chat
- `message`: When a user sends a message to the chat
- `create_room`: When a user creates a new room
- `join_room`: When a user joins a room
- `leave_room`: When a user leaves a room

The server will also be responsible for maintaining the state of the chat application, including the list of users, the list of rooms, and the messages in each room. The server will also be responsible for broadcasting messages to all users in a room and holding each room state so that when a user joins, they can see the chat history.

Beyond that, the languages and frameworks will determine the specifics of the backend.

### Containerization

I hope to provide a docker container for each backend so that you can easily run the server on your machine.

I'm not sure if I will containerize the frontend.

## Languages/Frameworks

### Completed

### Planned Backends

- [ ] Node.js
- [ ] Node (Socket.io ?)
- [ ] Deno
- [ ] Bun
- [ ] Rust (Actix?)
- [ ] Go (Gorilla)
- [ ] Python (FastAPI)
- [ ] Ruby?
- [ ] Elixer?
- [ ] Gleam?
- [ ] Roc?

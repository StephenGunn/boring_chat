export class Console {
  messages: ConsoleMessage[] = $state([]);

  constructor() {
    this.messages = [];
  }

  add_message(message: ConsoleMessage) {
    this.messages.push(message);
  }

  clear_messages() {
    this.messages = [];
  }

  get_latest_message() {
    return this.messages[this.messages.length - 1];
  }

  get_messages() {
    return this.messages;
  }

  get_message_count() {
    return this.messages.length;
  }
}

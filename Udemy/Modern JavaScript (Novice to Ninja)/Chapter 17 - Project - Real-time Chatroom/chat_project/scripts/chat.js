// Adding new chat documents
// Setting up a real-time listener to get new chats
// Updating the username
// Updating the room

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
  }

  async addChat(message) {
    // Format a chat object
    const now = new Date();
    const chat = {
      message: message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    // Save the chat document
    const response = await this.chats.add(chat);
    return response;
  }

  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // Update the UI
          callback(change.doc.data());
        }
      });
    })
  }

  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }

  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    if (this.unsub) {
      this.unsub();
    }
  }
}




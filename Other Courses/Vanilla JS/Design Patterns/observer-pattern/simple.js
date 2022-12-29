// class Observable {
//   constructor() {
//     this.subscribers = [];
//   }
//
//   subscribe(fn) {
//     this.subscribers.push(fn);
//   }
//   unsubscribe(fn) {
//     this.subscribers = this.subscribers.filter((item) => item !== fn);
//   }
//   broadcast(data) {
//     for (const func of this.subscribers) {
//       func(data);
//     }
//   }
// }

function createObservable() {
  return {
    subscribers: [],
    subscribe(fn) {
      this.subscribers.push(fn);
    },
    unsubscribe(fn) {
      this.subscribers = this.subscribers.filter((item) => item !== fn);
    },
    broadcast(data) {
      for (const func of this.subscribers) {
        func(data);
      }
    }
  }
}

// const observer = new Observable();
const observer = createObservable();

const fn = (data) => {
  console.log("Callback was executed with data", data);
};

observer.subscribe(fn);
observer.broadcast("Hello from the observable");

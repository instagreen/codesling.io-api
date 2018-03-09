// const startingText =
// `function hello() {
//   console.log('hello!');
// }

// hello();
// `;

const startingText =
`function nameOfFunc() {
  console.log();
}`;

const getFuncName = async () => {
  // try {
  //     const data = await axios.get(/**/);
  //     console.log('data from await axios', data);
  //   } catch (err) {
  //     console.log('err from Sling', err);
  //   }
}
/**
 *
 *  Rooms store
 *
 */
export default class Rooms {
  constructor(io) {
    this.io = io;
    this.store = new Map();
  }

  findOrCreate(roomId) {
    let room = this.store.get(roomId);
    if (!room) {
      room = new Map();
      room.set('id', roomId);
      room.set('text', startingText);
      this.store.set(roomId, room);
    }
    return room;
  }
}

/**
 *
 *  Server emissions
 *
 */
export const serverInitialState = ({ client, room }, payload) => {
  if (!room.get('challenge')) {
    room.set('challenge', payload);
    client.emit('server.initialState', {
      id: client.id,
      text: room.get('text'),
      challenge: payload,
    });
  } else {
    client.emit('server.initialState', {
      id: client.id,
      text: room.get('text'),
      challenge: room.get('challenge'),
    });
  }
};

export const serverChanged = ({ io, room }) => {
  const roomId = room.get('id');
  const text = room.get('text');
  const email = room.get('email');
  io
    .in(roomId)
    .emit('server.changed', { text, email });
};

export const serverLeave = ({ io, room }) => {
  io
    .in(room.get('id'))
    .emit('server.leave');
};

export const serverRun = ({ io, room }, { stdout, email }) => {
  console.log('serverEvents.js stdout, typeof, split', stdout, typeof stdout, Array.isArray(stdout.split('\n')));
  io
    .in(room.get('id'))
    .emit('server.run', { stdout, email });
};

export const serverMessage = ({ io, room }, message) => {
  io
    .in(room.get('id'))
    .emit('server.message', message);
};

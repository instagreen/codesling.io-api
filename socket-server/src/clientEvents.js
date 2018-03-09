import axios from 'axios';

import { success } from './lib/log';
import {
  serverInitialState,
  serverChanged,
  serverLeave,
  serverRun,
  serverMessage,
} from './serverEvents';

/**
 *
 *  Client emissions (server listeners)
 *
 *  more on socket emissions:
 *  @url {https://socket.io/docs/emit-cheatsheet/}
 *
 *  @param room is an ES6 Map, containing { id, state }
 *  @url {https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map}
 *
 */
const clientReady = ({ io, client, room }, payload) => {
  success('client ready heard');
  serverInitialState({ io, client, room }, payload);
};

const clientUpdate = ({ io, client, room }, payload) => {
  const { text, email } = payload;
  success('client update heard. payload.text = ', payload);
  room.set('text', text);
  room.set('email', email);
  serverChanged({ io, client, room });
};

const clientDisconnect = ({ io, room }) => {
  success('client disconnected');
  serverLeave({ io, room });
};

const clientRun = async ({ io, room }, payload) => {
  success('running code from client. room.get("text") = ', room.get('text'));
  const { text, email } = payload;
  const url = process.env.CODERUNNER_SERVICE_URL;
  try {
    const testCases = await axios.get(`http://localhost:3396/testCases/2`);
    const funcName = await axios.get(`http://localhost:3396/challenges/39`);
    const { data } = await axios.post(`${url}/submit-code`, { code: text, testCases: testCases.data.rows, funcName: funcName.data });
    const stdout = data;
    console.log('stdout', stdout);
    serverRun({ io, room }, { stdout, email });
  } catch (e) {
    success('error posting to coderunner service from socket server. e = ', e);
  }

  // try {
  //   // const urlRest = process.env.REST_SERVER_URL; :4990
  //   const funcName = await axios.get(`http://localhost:3396/challenges/39`);
  //   // const stdout2 = funcName;
  //   // console.log('stdout2', stdout2);
  //   console.log('response!!!!!!', funcName.data);
  // } catch (e) {
  //   success('error posting to coderunner service from socket server. e = ', e);
  // }

  // try {
  //   // const urlRest = process.env.REST_SERVER_URL; :4990
  //   const testCases = await axios.get(`http://localhost:3396/testCases/2`);
  //   // const stdout2 = funcName;
  //   // console.log('stdout2', stdout2);
  //   console.log('testCases!!!!!!', testCases.data.rows);
  // } catch (e) {
  //   success('error posting to coderunner service from socket server. e = ', e);
  // }
};

const clientMessage = async ({ io, room }, payload) => {
  success('client message heard');
  const url = process.env.REST_SERVER_URL;
  try {
    const { data } = await axios.post(`${url}/messages/`, payload);
    serverMessage({ io, room }, data);
  } catch (e) {
    success('error saving message to the database. e = ', e);
  }
};

const clientEmitters = {
  'client.ready': clientReady,
  'client.update': clientUpdate,
  'client.disconnect': clientDisconnect,
  'client.run': clientRun,
  'client.message': clientMessage,
};

export default clientEmitters;

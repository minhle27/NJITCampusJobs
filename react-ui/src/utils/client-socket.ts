import { io } from 'socket.io-client';

const endpoint = window.location.hostname + ':' + 3001;

export const socket = io(endpoint);


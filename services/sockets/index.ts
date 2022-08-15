import { io } from 'socket.io-client';
import { DATABASE_URL } from '../../utils/api';

export const socket = io(DATABASE_URL);

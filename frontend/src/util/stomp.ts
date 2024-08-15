import {Client} from '@stomp/stompjs';

const stompClient = new Client({
  brokerURL: import.meta.env.VITE_WEBSOCKET_URL + '/ws',
});

export default stompClient;
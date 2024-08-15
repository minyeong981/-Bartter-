import {Client} from '@stomp/stompjs';

import useRootStore from '@/store';

const {token} = useRootStore.getState();

const stompClient = new Client({
  brokerURL: import.meta.env.VITE_WEBSOCKET_URL + '/ws',
  connectHeaders: {
    Authorization: `Bearer ${token}`,
  },
});

export default stompClient;
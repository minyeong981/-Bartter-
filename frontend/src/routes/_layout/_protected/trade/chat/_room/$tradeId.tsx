import {Client} from '@stomp/stompjs';
import {createFileRoute} from '@tanstack/react-router';
import type {AxiosResponse} from 'axios';
import classnames from 'classnames/bind';
import type {ChangeEvent, KeyboardEvent, UIEvent} from 'react';
import {useEffect, useMemo, useRef, useState} from 'react';

import useRootStore from '@/store';
import axios from '@/util/axios.ts';

import styles from './chat.module.scss';

const cx = classnames.bind(styles);

const chatMessages: ChatMessage[] = [
  {type: 'CHAT', content: '안녕하세요!', senderId: 1, tradeId: 101},
  {type: 'CHAT', content: '반갑습니다.', senderId: 2, tradeId: 101},
  {type: 'JOIN', content: '', senderId: 3, tradeId: 102},
  {type: 'CHAT', content: '거래 시작할까요?', senderId: 3, tradeId: 102},
  {type: 'CHAT', content: '네, 준비됐습니다.', senderId: 4, tradeId: 102},
  {type: 'LEAVE', content: '', senderId: 1, tradeId: 101},
  {
    type: 'CHAT',
    content: '거래 품목은 확인하셨나요?',
    senderId: 3,
    tradeId: 102,
  },
  {type: 'CHAT', content: '네, 잘 확인했습니다.', senderId: 4, tradeId: 102},
  {type: 'CHAT', content: '궁금한 점이 있나요?', senderId: 3, tradeId: 102},
  {type: 'CHAT', content: '현재로선 없습니다.', senderId: 4, tradeId: 102},
  {type: 'CHAT', content: '잘 진행되길 바랍니다.', senderId: 3, tradeId: 102},
  {type: 'CHAT', content: '고맙습니다.', senderId: 4, tradeId: 102},
  {type: 'JOIN', content: '', senderId: 5, tradeId: 103},
  {
    type: 'CHAT',
    content: '이 거래 관련해서 문의드립니다.',
    senderId: 5,
    tradeId: 103,
  },
  {type: 'CHAT', content: '문의 사항 말씀해주세요.', senderId: 6, tradeId: 103},
  {
    type: 'CHAT',
    content: '거래 조건이 어떻게 되나요?',
    senderId: 5,
    tradeId: 103,
  },
  {type: 'CHAT', content: '조건은 이러합니다...', senderId: 6, tradeId: 103},
  {
    type: 'CHAT',
    content: '확인했습니다, 감사합니다.',
    senderId: 5,
    tradeId: 103,
  },
  {type: 'LEAVE', content: '', senderId: 4, tradeId: 102},
  {
    type: 'CHAT',
    content: '저도 나가겠습니다. 좋은 하루 보내세요!',
    senderId: 3,
    tradeId: 102,
  },
  {type: 'CHAT', content: '안녕하세요!', senderId: 1, tradeId: 101},
  {type: 'CHAT', content: '반갑습니다.', senderId: 2, tradeId: 101},
  {type: 'JOIN', content: '', senderId: 3, tradeId: 102},
  {type: 'CHAT', content: '거래 시작할까요?', senderId: 3, tradeId: 102},
  {type: 'CHAT', content: '네, 준비됐습니다.', senderId: 4, tradeId: 102},
  {type: 'LEAVE', content: '', senderId: 1, tradeId: 101},
  {
    type: 'CHAT',
    content: '거래 품목은 확인하셨나요?',
    senderId: 3,
    tradeId: 102,
  },
  {type: 'CHAT', content: '네, 잘 확인했습니다.', senderId: 4, tradeId: 102},
  {type: 'CHAT', content: '궁금한 점이 있나요?', senderId: 3, tradeId: 102},
  {type: 'CHAT', content: '현재로선 없습니다.', senderId: 4, tradeId: 102},
  {type: 'CHAT', content: '잘 진행되길 바랍니다.', senderId: 3, tradeId: 102},
  {type: 'CHAT', content: '고맙습니다.', senderId: 4, tradeId: 102},
  {type: 'JOIN', content: '', senderId: 5, tradeId: 103},
  {
    type: 'CHAT',
    content: '이 거래 관련해서 문의드립니다.',
    senderId: 5,
    tradeId: 103,
  },
  {type: 'CHAT', content: '문의 사항 말씀해주세요.', senderId: 6, tradeId: 103},
  {
    type: 'CHAT',
    content: '거래 조건이 어떻게 되나요?',
    senderId: 5,
    tradeId: 103,
  },
  {type: 'CHAT', content: '조건은 이러합니다...', senderId: 6, tradeId: 103},
  {
    type: 'CHAT',
    content: '확인했습니다, 감사합니다.',
    senderId: 5,
    tradeId: 103,
  },
  {type: 'LEAVE', content: '', senderId: 4, tradeId: 102},
  {
    type: 'CHAT',
    content: '저도 나가겠습니다. 좋은 하루 보내세요!',
    senderId: 3,
    tradeId: 102,
  },
];

export const Route = createFileRoute(
  '/_layout/_protected/trade/chat/_room/$tradeId',
)({
  component: ChatPage,
});

function ChatPage() {
  const {tradeId} = Route.useParams();
  const userId = useRootStore(state => state.userId);
  const token = useRootStore(state => state.token);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [page, setPage] = useState(0); // 무한 스크롤에서 사용하기 위한 page, setPage 변수
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 판단
  const scrollRef = useRef<HTMLDivElement>(null); // 현재 바라보고 있는 스크롤 (참조)
  const prevScrollHeightRef = useRef(0); // 메시지 추가 후 복원하기 위한 참조
  const limit = 10; // 한 번에 불러올 메시지 수 : 무한 스크롤에서 사용합니다.

  const client = useMemo(
    () =>
      new Client({
        brokerURL: 'ws://localhost:8080/ws',
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        onConnect: async () => {
          sendJoin(client);
          await loadMessages(page);

          client.subscribe(`/sub/trade/chat/${tradeId}`, message => {
            const data: ChatMessage = JSON.parse(message.body);
            setMessages(prevMessages => [...prevMessages, data]);
          });
        },
        onStompError: error => {
          console.error('Stomp Error:', error);
        },
      }),
    [tradeId],
  );

  useEffect(() => {
    client.activate();

    window.addEventListener('unload', () => sendLeave(client));
    return () => {
      if (client && client.connected) {
        window.removeEventListener('unload', () => sendLeave(client));
        sendLeave(client);
        client.deactivate();
      }
    };
  }, [tradeId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight - prevScrollHeightRef.current;
    }
  }, [messages]);

  // 메시지를 불러오기
  const loadMessages = async (page: number) => {
    try {
      const response = await axios.get<AxiosResponse<ChatMessage[]>>(
        `/trades/chat/${tradeId}`,
        {
          params: {page, limit},
        },
      );
      const dataList = response.data.data;
      if (dataList.length > 0) {
        setMessages(prevMessages => [...dataList, ...prevMessages]);
        setHasMore(dataList.length === limit); // 데이터가 충분히 반환되지 않으면 끝으로 판단함
      } else {
        setHasMore(false); // 더 이상 데이터가 없음
      }
    } catch (error) {
      console.error('Failed to load messages', error);
    }
  };

  // 스크롤 이동시 위치 저장 최상단이면 이전 메시지로드
  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const {scrollTop, scrollHeight} = event.currentTarget;
    prevScrollHeightRef.current = scrollHeight;

    // 스크롤이 맨 위에 도달하면 이전 메시지 로드
    if (scrollTop === 0 && hasMore) {
      // 맨위이고 더 불러올 데이터가 있으면 조회
      const nextPage = page + 1;
      setPage(nextPage);
      loadMessages(nextPage);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const sendLeave = (client: Client) => {
    if (client.connected) {
      console.log('Leave Request');
      const sendObject = {
        type: 'LEAVE',
        senderId: userId,
        tradeId: tradeId,
      };
      client.publish({
        destination: '/pub/trade/chat',
        body: JSON.stringify(sendObject),
      });
    }
  };

  const sendJoin = (client: Client) => {
    console.log('Join Request');
    const sendObject = {
      type: 'JOIN',
      senderId: userId,
      tradeId: tradeId,
    };
    client.publish({
      destination: '/pub/trade/chat',
      body: JSON.stringify(sendObject),
    });
  };

  // 채팅 보내기 Stomp 연결 돼야만 보낼 수 있다.
  const handleSend = () => {
    // 메시지 공백 아니고 && stompClient 연결 된 경우에만 해당
    if (input.trim() && client.connected) {
      const sendObject: ChatMessage = {
        type: 'CHAT',
        content: input,
        senderId: userId,
        tradeId: Number(tradeId),
      };
      client.publish({
        destination: '/pub/trade/chat',
        body: JSON.stringify(sendObject),
      });
      setInput('');
      prevScrollHeightRef.current = 0;
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.nativeEvent.isComposing || event.key !== 'Enter') return;
    event.preventDefault();
    handleSend();
  };

  return (
    <div className={cx('chatting')}>
      <div ref={scrollRef} onScroll={handleScroll} className={cx('board')}>
        {chatMessages.map((msg, index) => (
          <div
            key={`${index}-${msg.senderId}`}
            className={cx('message', {mine: msg.senderId == userId})}
          >
            {msg.content}
          </div>
        ))}
        <br />
      </div>
      <div className={cx('inputContainer')}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
}
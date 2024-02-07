import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useUsers } from '../../hooks/use.user';
import styles from './chat.module.scss';

const Chat: React.FC = () => {
  const { currentUser } = useUsers();
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    []
  );
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const socket = io('http://localhost:3000');

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));

    socket.on('chat:message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('connect');
      socket.off('chat_message');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputMessage.trim() !== '') {
      socket?.emit('chat:message', {
        userName: currentUser.userName,
        message: inputMessage,
      });
      setInputMessage('');
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h2>Chat Room</h2>
      <h3>{isConnected ? 'CONECTADO' : 'NO CONECTADO'}</h3>

      <form className={styles.inputContainer} onSubmit={sendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className={styles.inputMessage}
          placeholder="Type your message..."
        />
        <button className={styles.sendButton} type="submit">
          Send
        </button>
      </form>
      <div className={styles.messageContainer}>
        {messages.map((message, index) => (
          <div className="message" key={index}>
            {message.user}: {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;

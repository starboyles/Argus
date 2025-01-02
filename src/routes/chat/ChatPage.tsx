import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const { chatId } = useParams();
  
  return (
    <div>
      <h1>Chat {chatId}</h1>
      {/* Add your chat interface here */}
    </div>
  );
};

export default ChatPage;
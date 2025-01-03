import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useEffect} from "react";

const ChatPage = () => {
  const { chatId } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/sign-in");
    }
  }, [userId, navigate]);

  return (
    <div>
      <h1>Chat ID: {chatId}</h1>
      <p>User ID: {userId}</p>
    </div>
  );
};

export default ChatPage;

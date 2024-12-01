import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Activity, LogIn } from "lucide-react";
import {
  ClerkProvider,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/clerk-react";

const Home = () => {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn) {
    return (
      <div className="w-screen min-h-screen bg-gray-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center">
              <h1 className="mr-3 text-5xl font-extrabold">
                Chat with Your PDF
              </h1>
            </div>
            <p className="max-w-xl mt-2 text-lg text-slate-600">
              Join hands with thousands of students and research professionals
              to instantly answer questions & research with AI
            </p>
            <div className="w-full mt-4 t-4">
              <Link to="/sign-in">
                <Button>
                  Get Started
                  <LogIn className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-screen min-h-screen bg-gray-50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-extrabold">Chat Your PDF</h1>
            <UserButton />
          </div>
          <div className="flex mt-5">
            <Button>
              Go to Chats
              <Activity className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

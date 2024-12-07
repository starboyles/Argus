import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Activity, LogIn } from "lucide-react";
import { UserButton, useUser } from "@clerk/clerk-react";
import FileUpload from "../components/ui/fileUpload";

const Home = () => {
  const { isSignedIn } = useUser();
  if (!isSignedIn) {
    return (
      <div className="w-screen min-h-screen bg-gray-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center">
              <h1 className="mr-3 text-5xl font-extrabold">
                Chat with your Docs
              </h1>
            </div>
            <p className="max-w-xl mt-2 text-lg text-slate-600">
              Argus is your AI-powered K-9 to help you sift through docs easily.
              Join thousands of developers & researchers to instantly answer
              questions & research with Argus.
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
            <h1 className="mr-3 text-5xl font-extrabold">
              Chat with your Docs
            </h1>
            <UserButton />
          </div>
          <p className="max-w-xl mt-2 text-lg text-slate-600">
            Easily upload and analyze a variety of file formats, including .pdf,
            .docx, .ppt, & .epub
          </p>
          <div className="w-full mt-4">
            <FileUpload />
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

import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ClerkProvider, UserButton } from "@clerk/clerk-react";

export default function Home() {
  return (
    <div className="w-screen min-h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-bold">Chat with your document</h1>
            <UserButton/>
            </div>
            <div className="flex mt-2">
              <Button>Go to Chats</Button>
            </div>
        </div>
      </div>
    </div>
  );
}

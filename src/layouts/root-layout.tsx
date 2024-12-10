import { Outlet, useNavigate } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import Providers from "../components/providers";
import { Toaster } from "react-hot-toast";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <Providers>
      <ClerkProvider
        routerPush={(to) => navigate(to)}
        routerReplace={(to) => navigate(to, { replace: true })}
        publishableKey={PUBLISHABLE_KEY}
      >
        <header className="header">
          <div>
            <SignedIn></SignedIn>
            <SignedOut></SignedOut>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        <Toaster />
      </ClerkProvider>
    </Providers>
  );
}

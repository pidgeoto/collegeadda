// "use client";
// import Link from "next/link";
// import { useState } from "react";
// import { useSession } from "next-auth/react";
import { NavMenu } from "./NavMenu";
import Logo from "@/components/Logo";
import UniversalSearch from "@/components/UnversalSearch";

const Header = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  // const { data: session } = useSession({});
  return (
    <nav className="bg-white dark:bg-[#121212] border-b dark:border-b-gray-900 h-15 z-10 sticky lg:top-6 hidden lg:block">
      <div className="f-between px-2 lg:px-8 py-3 lg:py-5">
        <Logo />
        <NavMenu />
        <UniversalSearch />
        {/* <div className="flex">
          <NavMenu />
          <UniversalSearch />
          <div className="f-center gap-4">
           {session ? <ProfileOptions /> : <AuthOption />}
          {session ? (
              <div>
                {session?.user?.name}
                <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
              </div>
            ) : (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </div>
        </div>*/}
      </div>
    </nav>
  );
};

export default Header;

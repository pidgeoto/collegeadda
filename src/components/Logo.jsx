import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex flex-row items-center">
        <Image
          src="/logo.webp"
          alt="Kollege apply logo"
          width={1200}
          height={600}
          priority
          className="h-10 w-40"
          loading="eager"
        />
      </Link>
    </div>
  );
};

export default Logo;

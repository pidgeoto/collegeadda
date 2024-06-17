"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { title: "home", route: "/" },
  { title: "exams", route: "/exams" },
  { title: "courses", route: "/courses" },
  { title: "colleges", route: "/colleges" },
  { title: "online", route: "/online" },
  { title: "study abroad", route: "/study-abroad" },
  { title: "articles", route: "/articles" },
];

const TopHeader = () => {
  const path = usePathname();
  return (
    <div className="z-20 sticky lg:top-0 bg-slate-100 hidden lg:block">
      <div className="flex justify-around items-center flex-wrap">
        {menu.map((menuItem, index) => (
          <Link
            href={menuItem.route}
            key={index}
            className={`${
              menuItem.route === "/"
                ? "capitalize text-xs lg:text-sm font-light hover:text-purple-500 my-1"
                : path.startsWith(menuItem.route)
                ? "capitalize text-purple-500 font-medium my-1"
                : "capitalize text-sm font-light hover:text-purple-500 my-1"
            } `}
          >
            {menuItem.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopHeader;

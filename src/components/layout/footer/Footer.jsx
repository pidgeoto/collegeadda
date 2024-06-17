import Logo from "@/components/Logo";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import {
  Copyright,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="px-2 lg:px-8 border-t-2 bg-gray-100">
      <div className="f-between gap-4 my-4">
        <div>
          <Logo />
        </div>
        <div>
          <h6 className="mt-4 text-sm text-gray-500 text-center">
            Discover Excellence: Latest Updates on India&#39;s Leading Colleges,
            Admissions, and Exam News
          </h6>
        </div>
        <div className="f-row gap-4 justify-end">
          <Facebook className="rounded-full bg-white p-2 h-9 w-9" color="#2F04A8" />
          <Linkedin className="rounded-full bg-white p-2 h-9 w-9" color="#2F04A8" />
          <Twitter className="rounded-full bg-white p-2 h-9 w-9" color="#2F04A8" />
          <Instagram className="rounded-full bg-white p-2 h-9 w-9" color="#2F04A8" />
        </div>
      </div>
      <div className="f-between border-t-2 pt-4 lg:pt-0 lg:mt-8">
        <div className="f-center gap-1">
          <p className="text-sm text-gray-500">Built for India</p>
          <HeartFilledIcon size={16} color="red" />
        </div>

        <div className="f-center">
          <Copyright size={18} strokeWidth={1} />
          <p className="my-4 text-sm text-gray-500">
            2024 CollegeAdda dummy project. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

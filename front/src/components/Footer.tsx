"use client";
import Link from "next/link";
import { Github, Linkedin, Mail, Home } from "lucide-react";

export default function Footer() {
  return (
    <div className="h-24 md:mx-8 rounded-xl flex items-center justify-between bg-zinc-950 p-5">
      <div className="w-1/3 flex gap-4">
        <Link href="#" title="Home">
          <Home className="cursor-pointer w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-purple-500 transition-colors" />
        </Link>
        <Link href="mailto:gld.abha@gmail.com" title="Contact">
          <Mail className="cursor-pointer w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-purple-500 transition-colors" />
        </Link>
      </div>

      <div className="w-1/3 text-xs md:text-sm text-zinc-500 text-center">
        <p>Made with 💜 by Abha Ghildiyal</p>
        <p>© {new Date().getFullYear()} All Rights Reserved</p>
      </div>

      <div className="w-1/3 flex justify-end gap-4">
        <Link
          href="https://www.linkedin.com/in/abha-ghildiyal/"
          title="LinkedIn"
        >
          <Linkedin className="cursor-pointer w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-purple-500 transition-colors" />
        </Link>
        <Link href="https://github.com/artemiskgg1" title="GitHub">
          <Github className="cursor-pointer w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-purple-500 transition-colors" />
        </Link>
      </div>
    </div>
  );
}

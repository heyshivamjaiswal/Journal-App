'use client';

import Image from 'next/image';
import Link from 'next/link';

import { SignInButton, useUser } from '@clerk/nextjs';

import { Button } from './ui/button';
import { FolderOpen, PenBox } from 'lucide-react';
import UserMenu from './user-menu';

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="container mx-auto">
      <nav className="py-6 px-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Reflect Logo"
            width={200}
            height={60}
            className="h-10 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              <Link href="/dashboard#collections">
                <Button variant="outline" className="flex items-center gap-2">
                  <FolderOpen size={18} />
                  <span className="hidden md:inline">Collections</span>
                </Button>
              </Link>

              <Link href="/journal/write">
                <Button variant="journal" className="flex items-center gap-2">
                  <PenBox size={18} />
                  <span className="hidden md:inline">Write New</span>
                </Button>
              </Link>

              <UserMenu />
            </>
          ) : (
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          )}
        </div>
      </nav>
    </header>
  );
}

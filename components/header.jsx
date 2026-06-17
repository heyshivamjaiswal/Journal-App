'use client';

import { SignInButton, SignUpButton, UserButton, Show } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { PenBox } from 'lucide-react';
import { FolderOpen } from 'lucide-react';
import UserMenu from './user-menu';

const Header = () => {
  return (
    <header className="container mx-auto">
      <nav className="py-6 px-4 flex justify-between items-center">
        <Link href={'/'}>
          <Image
            src={'/logo.png'}
            alt="Reflct Logo"
            width={200}
            height={60}
            className="h-10 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-4">
          {/* login and other ctas */}

          <SignInButton>
            <Link href="/dashboard#collections">
              <Button variant="journal" className="flex items-center gap-2">
                <FolderOpen size={18} />
                <span className="hidden md:inline">Collections</span>
              </Button>
            </Link>
          </SignInButton>

          <Link href="/journal/write">
            <Button variant="journal" className="flex items-center gap-2">
              <PenBox size={18} />
              <span className="hidden md:inlien">Write New</span>
            </Button>
          </Link>

          <SignUpButton>
            {/* <SignInButton forceRedirectUrl="/dashboard"> */}
            <Button variant="outline">Login</Button>
            {/* </SignInButton> */}
          </SignUpButton>

          <SignInButton>
            <UserMenu />
          </SignInButton>
        </div>
      </nav>
    </header>
  );
};

export default Header;

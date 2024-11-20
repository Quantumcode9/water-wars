'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const AuthControl = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        onClick={() => signOut()}

        className="w-full h-full flex items-center justify-between px-4 py-5 bg-transparent rounded"
      >
        <span className="block">Sign Out</span>
      </button>
    );
  }

  return (
    <Link href="/auth" className="w-full h-full flex items-center justify-between px-4 py-5 bg-transparent rounded">
      Sign In
    </Link>
  );
};

export default AuthControl;
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
        className="bg-button hover:bg-green-900 text-center text-white py-1 px-2 rounded text-xs whitespace-nowrap"
      >
        Sign Out
      </button>
    );
  }

  return (
    <Link href="/auth" className="bg-button text-center text-xs hover:bg-green-900 text-white py-1 px-3 rounded whitespace-nowrap">
      Sign In
    </Link>
  );
};

export default AuthControl;
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
        className="bg-button hover:bg-green-900 text-center text-white py-2 px-4 rounded"
      >
        Sign Out
      </button>
    );
  }

  return (
    <Link href="/auth" className="bg-button text-center hover:bg-green-900 text-white py-2 px-4 rounded">
      Sign In
    </Link>
  );
};

export default AuthControl;
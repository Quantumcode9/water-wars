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
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        Sign Out
      </button>
    );
  }

  return (
    <Link href="/auth" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
      Sign In
    </Link>
  );
};

export default AuthControl;
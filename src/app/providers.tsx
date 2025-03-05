"use client";

import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains';
import type { Session } from 'next-auth';

type ProvidersProps = {
  children: React.ReactNode;
  session: Session | null;
};

export function Providers({ session, children }: { session: Session | null, children: React.ReactNode }) {
  return (
    <SessionProvider session={session}>
      <WagmiProvider>
        {children}
      </WagmiProvider>
    </SessionProvider>
  );
}

"use client"

import { SessionProvider } from "next-auth/react";

/**
 * Providers component to wrap the application with global context providers.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to render inside the provider.
 * @returns {JSX.Element} The wrapped components with session context.
 */
export default function Providers({ children }) {
    return (
        <SessionProvider>{children}</SessionProvider>
    );
}

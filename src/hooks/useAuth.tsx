import React, { createContext, useContext, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSession, onAuthStateChange, adminLogout } from "@/lib/api";

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  isAdmin: false,
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check existing session on mount
    getSession().then((s) => {
      setSession(s);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: subscription } = onAuthStateChange((s) => {
      setSession(s);
      setLoading(false);
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await adminLogout();
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        isAdmin: !!session,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

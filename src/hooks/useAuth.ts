// hooks/useAuth.ts
'use client';

import { useState, useEffect } from 'react';

type User = {
    email: string;
    password: string;
};

export function useAuth() {
    const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const authed = localStorage.getItem('isAuthenticated') === 'true';
        const email = localStorage.getItem('userEmail');
        const savedUsers = localStorage.getItem('mockUsers');

        if (savedUsers) {
            setUsers(JSON.parse(savedUsers));
        }

        setIsAuthed(authed);
        setUserEmail(email);
    }, []);

    const login = (email: string, password: string): string | null => {
        const match = users.find((u) => u.email === email && u.password === password);
        if (!match) return 'Invalid email or password';

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        setIsAuthed(true);
        setUserEmail(email);
        return null;
    };

    const signup = (email: string, password: string): string | null => {
        const exists = users.find((u) => u.email === email);
        if (exists) return 'User already exists';

        const newUsers = [...users, { email, password }];
        localStorage.setItem('mockUsers', JSON.stringify(newUsers));
        setUsers(newUsers);

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        setIsAuthed(true);
        setUserEmail(email);
        return null;
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        setIsAuthed(false);
        setUserEmail(null);
    };

    return {
        isAuthed,
        userEmail,
        login,
        signup,
        handleLogout,
    };
}
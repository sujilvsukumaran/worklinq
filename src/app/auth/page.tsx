'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type User = {
    email: string;
    password: string;
};

export default function AuthPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [error, setError] = useState('');
    const [users, setUsers] = useState<User[]>([]);

    // Load users from localStorage
    useEffect(() => {
        const savedUsers = localStorage.getItem('mockUsers');
        if (savedUsers) {
            setUsers(JSON.parse(savedUsers));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        if (mode === 'signin') {
            const match = users.find((u) => u.email === email && u.password === password);
            if (!match) {
                setError('Invalid email or password');
                return;
            }

            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userEmail', email);
            router.push('/');
        } else {
            const exists = users.find((u) => u.email === email);
            if (exists) {
                setError('User already exists');
                return;
            }

            const newUsers = [...users, { email, password }];
            localStorage.setItem('mockUsers', JSON.stringify(newUsers));
            setUsers(newUsers);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userEmail', email);
            router.push('/');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-4 text-center">
                    {mode === 'signin' ? 'Sign In to Worklinq' : 'Create a Worklinq Account'}
                </h1>

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-3 px-4 py-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 px-4 py-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>

                <div className="text-center mt-4 text-sm">
                    {mode === 'signin' ? (
                        <>
                            Don’t have an account?{' '}
                            <button
                                type="button"
                                className="text-blue-600 underline"
                                onClick={() => {
                                    setMode('signup');
                                    setError('');
                                }}
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <button
                                type="button"
                                className="text-blue-600 underline"
                                onClick={() => {
                                    setMode('signin');
                                    setError('');
                                }}
                            >
                                Sign In
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}
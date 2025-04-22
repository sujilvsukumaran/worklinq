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

    useEffect(() => {
        const savedUsers = localStorage.getItem('mockUsers');
        if (savedUsers) {
            setUsers(JSON.parse(savedUsers));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-2xl p-8 rounded-xl w-full max-w-md transition-all"
            >
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    {mode === 'signin' ? 'Welcome Back 👋' : 'Create Your Account'}
                </h1>
                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center font-medium">
                        {error}
                    </p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    value={email}
                    onChange={(e) => setEmail (e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    value={password}
                    onChange={(e) => setPassword (e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                    {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>

                <div className="text-center text-sm text-gray-600 mt-6">
                    {mode === 'signin' ? (
                        <>
                            Don’t have an account?{' '}
                            <button
                                type="button"
                                className="text-blue-600 hover:underline font-medium"
                                onClick={() => {
                                    setMode ('signup');
                                    setError ('');
                                }}
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            Already registered?{' '}
                            <button
                                type="button"
                                className="text-blue-600 hover:underline font-medium"
                                onClick={() => {
                                    setMode ('signin');
                                    setError ('');
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
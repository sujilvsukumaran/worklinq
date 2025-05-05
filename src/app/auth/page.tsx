'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Auth.module.css';

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
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.title}>
                    {mode === 'signin' ? 'Welcome Back 👋' : 'Create Your Account'}
                </h1>

                {error && <p className={styles.error}>{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className={`input ${styles.input}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className={`input ${styles.input}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className={`btn ${styles.button}`}>
                    {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>

                <div className={styles.toggle}>
                    {mode === 'signin' ? (
                        <>
                            Don’t have an account?{' '}
                            <button type="button" onClick={() => { setMode('signup'); setError(''); }}>
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            Already registered?{' '}
                            <button type="button" onClick={() => { setMode('signin'); setError(''); }}>
                                Sign In
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Auth.module.css';
import { useAuth } from '@/hooks/useAuth';

export default function AuthPage() {
    const { login, signup } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        const errorMessage =
            mode === 'signin'
                ? login(email, password)
                : signup(email, password);

        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        router.push('/');
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
                            <button
                                type="button"
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
                            Already registered?{' '}
                            <button
                                type="button"
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
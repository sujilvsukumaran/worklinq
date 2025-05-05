'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ClientOnly from '@/components/ClientOnly';
import { useAuth } from '@/hooks/useAuth';
import MainDashboard from '@/containers/dashboard/pages/MainDashboard';

export default function HomePage() {
    const router = useRouter();
    const { isAuthed } = useAuth();

    useEffect(() => {
        if (isAuthed === false) {
            router.push('/auth');
        }
    }, [isAuthed, router]);

    if (isAuthed === false || isAuthed === null) return null;

    return (
        <ClientOnly>
            <MainDashboard />
        </ClientOnly>
    );
}
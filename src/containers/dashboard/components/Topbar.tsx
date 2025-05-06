'use client';

import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import styles from '../styles/Topbar.module.css';

export default function Topbar() {
    const { userEmail } = useAuth();

    return (
        <div className={styles.topbar}>
            <div className={styles.leftGroup}>
                <Image
                    src="/assets/logo.png"
                    alt="WorkLinQ Logo"
                    width={201}
                    height={62}
                />
            </div>
            <div className={styles.rightGroup}>
                <ThemeToggle />
                <button className={styles.bell}>🔔</button>
                {userEmail && <span className={styles.emailDisplay}>{userEmail}</span>}
            </div>
        </div>
    );
}

'use client';

import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import styles from '../styles/Topbar.module.css';

export default function Topbar() {
    const { userEmail } = useAuth();

    return (
        <div className={styles.topbar}>
            <div className={styles.tools}>
                <ThemeToggle />
                <button className={styles.bell}>🔔</button>
                {userEmail && <span className={styles.user}>{userEmail}</span>}
            </div>
        </div>
    );
}
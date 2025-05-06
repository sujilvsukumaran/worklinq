import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { FiBell } from 'react-icons/fi';
import { BsSun, BsMoon } from 'react-icons/bs';
import styles from '../styles/Topbar.module.css';
import { useState } from 'react';

export default function Topbar() {
    const { userEmail } = useAuth();
    const [isDark, setIsDark] = useState(false);

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
                <div
                    className={`${styles.themeToggle} ${isDark ? styles.dark : ''}`}
                    onClick={() => setIsDark(!isDark)}
                >
                    <div className={styles.iconLeft}>
                        <BsSun />
                    </div>
                    <div className={styles.iconRight}>
                        <BsMoon />
                    </div>
                </div>

                <div className={styles.infoBox}>
                    <div className={styles.bellWrapper}>
                        <FiBell className={styles.bellIcon} />
                        <span className={styles.notificationDot} />
                    </div>
                    <span className={styles.emailText}>{userEmail}</span>
                </div>
            </div>
        </div>
    );
}
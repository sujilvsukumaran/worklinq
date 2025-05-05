'use client';

import { useRouter } from 'next/navigation';
import styles from '../styles/Sidebar.module.css';

export default function Sidebar() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        router.push('/auth');
    };

    return (
        <aside className={styles.sidebar}>
            <h1 className={styles.logo}>WorkLinQ</h1>

            <nav className={styles.nav}>
                <ul>
                    <li className={styles.active}>🏠 Home</li>
                    <li>📅 Calendar</li>
                    <li>📁 Projects</li>
                    <li>👥 Users</li>
                    <li>⚙️ Settings</li>
                </ul>
            </nav>

            <div className={styles.bottom}>
                <select className={styles.dropdown}>
                    <option>FE Dubai</option>
                    <option>BE India</option>
                </select>
                <button onClick={handleLogout} className="btn" style={{ backgroundColor: 'red' }}>
                    🔁 Logout
                </button>
            </div>
        </aside>
    );
}
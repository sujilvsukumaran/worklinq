'use client';

import { useState } from 'react';
import styles from '../styles/Sidebar.module.css';
import { HiOutlineHome, HiOutlineCalendar, HiOutlineViewGrid, HiOutlineUsers, HiOutlineCog } from 'react-icons/hi';

const navItems = [
    { id: 'home', label: 'Home', icon: <HiOutlineHome /> },
    { id: 'calendar', label: 'Calendar', icon: <HiOutlineCalendar /> },
    { id: 'projects', label: 'Projects', icon: <HiOutlineViewGrid /> },
    { id: 'users', label: 'Users', icon: <HiOutlineUsers /> },
    { id: 'settings', label: 'Settings', icon: <HiOutlineCog /> },
];

export default function Sidebar() {
    const [active, setActive] = useState('home');

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={`${styles.navItem} ${active === item.id ? styles.active : ''}`}
                        onClick={() => setActive(item.id)}
                    >
                        <span className={styles.icon}>{item.icon}</span>
                        <span className={styles.label}>{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
}
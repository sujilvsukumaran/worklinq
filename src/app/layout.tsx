import './globals.css';
import { Poppins } from 'next/font/google';
import AppHeader from '@/components/AppHeader';
import { ThemeProvider } from '@/context/theme-context';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
    display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <ThemeProvider>
            <body
                className={`${poppins.variable} font-sans text-gray-800 bg-gradient-to-br from-white to-blue-50 dark:bg-gray-900 dark:text-white transition-colors`}
            >
            <AppHeader />
            {children}
            </body>
        </ThemeProvider>
        </html>
    );
}
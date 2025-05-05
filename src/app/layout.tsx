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
        <html lang="en" className={poppins.variable}>
        <ThemeProvider>
            <body className="app-body">
            <AppHeader />
            {children}
            </body>
        </ThemeProvider>
        </html>
    );
}
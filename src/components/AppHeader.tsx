'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AppHeader() {
    const pathname = usePathname();

    return (
        <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <div className="bg-blue-600 text-white w-9 h-9 flex items-center justify-center rounded-full font-bold text-lg">
                    W
                </div>
                <span className="text-xl font-semibold text-gray-800 tracking-wide">
          Worklinq
        </span>
            </Link>

            {pathname !== '/auth' && (
                <span className="text-sm text-gray-500 hidden sm:inline">Your productivity sidekick</span>
            )}
        </header>
    );
}
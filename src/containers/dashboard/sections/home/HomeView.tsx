// sections/HomeView.tsx
'use client';

import UnplannedSection from './UnplannedSection';
import PlannedSection from './PlannedSection';

export default function HomeView() {
    return (
        <div style={{ padding: '1.5rem 2rem', flex: 1, overflowY: 'auto' }}>
            <UnplannedSection />
            <div style={{ marginTop: '2rem' }}>
                <PlannedSection />
            </div>
        </div>
    );
}
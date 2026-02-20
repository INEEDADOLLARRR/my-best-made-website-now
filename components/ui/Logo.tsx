import React from 'react';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
    return (
        <svg
            className={className}
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            {/* Outer Circle Ring */}
            <circle cx="100" cy="100" r="95" stroke="#ce142a" strokeWidth="8" />
            <circle cx="100" cy="100" r="72" stroke="#ce142a" strokeWidth="3" />

            {/* Text Path for circular text */}
            <path id="curve" d="M 100, 15 A 85, 85 0 1, 1 99.9, 15" fill="transparent" />

            {/* Outer Text */}
            <text fill="#ce142a" fontFamily="sans-serif" fontSize="16" fontWeight="bold" letterSpacing="2">
                <textPath href="#curve" startOffset="50%" textAnchor="middle">
                    RESPONSIBLE ROOFING SERVICES
                </textPath>
            </text>

            {/* Inner Red Fill (The badge background) */}
            <circle cx="100" cy="100" r="70" fill="#ce142a" />

            {/* Inner White Triangle */}
            <polygon points="100,35 160,140 40,140" fill="#ffffff" />

            {/* D. C. TAYLOR CO. Text inside triangle */}
            <text x="100" y="85" fill="#ce142a" fontFamily="sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">
                D. C.
            </text>
            <text x="100" y="105" fill="#ce142a" fontFamily="sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">
                TAYLOR
            </text>
            <text x="100" y="125" fill="#ce142a" fontFamily="sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">
                CO.
            </text>
        </svg>
    );
};

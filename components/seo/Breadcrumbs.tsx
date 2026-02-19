import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbJsonLd } from './JsonLd';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    const allItems = [{ label: 'Home', href: '/' }, ...items];

    return (
        <>
            <BreadcrumbJsonLd
                items={allItems.map((item) => ({ name: item.label, url: item.href }))}
            />
            <nav aria-label="Breadcrumb" className="py-6">
                <ol className="flex items-center gap-2 text-sm font-light">
                    {allItems.map((item, index) => (
                        <li key={item.href} className="flex items-center gap-2">
                            {index > 0 && (
                                <ChevronRight className="w-3 h-3 text-slate-600" />
                            )}
                            {index === allItems.length - 1 ? (
                                <span className="text-brand-gold">{item.label}</span>
                            ) : (
                                <Link
                                    to={item.href}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
};

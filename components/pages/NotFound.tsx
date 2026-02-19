import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDocumentHead } from '../../hooks/useDocumentHead';

export const NotFound: React.FC = () => {
    const navigate = useNavigate();

    useDocumentHead({
        title: 'Page Not Found',
        description: 'The page you requested could not be found.',
    });

    return (
        <div className="min-h-screen bg-brand-black flex items-center justify-center">
            <div className="text-center space-y-8 px-6">
                <h1 className="text-[10rem] font-serif text-brand-gold/20 leading-none select-none">
                    404
                </h1>
                <div className="space-y-4 -mt-20 relative">
                    <h2 className="text-3xl font-serif text-white">Page Not Found</h2>
                    <p className="text-slate-400 font-light max-w-md mx-auto">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-8 py-4 border border-white/20 text-white text-xs uppercase tracking-widest hover:border-brand-gold/50 transition-all inline-flex items-center gap-2 justify-center"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                    <Link
                        to="/"
                        className="px-8 py-4 bg-brand-blue text-white text-xs uppercase tracking-widest hover:bg-blue-900 transition-all text-center"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const items = [
  { to: '/alumni/overview', label: 'Overview' },
  { to: '/alumni/opportunities', label: 'Opportunities' },
  { to: '/alumni/community', label: 'Community' },
  { to: '/alumni/directory', label: 'Directory' },
  { to: '/alumni/leaderboard', label: 'Leaderboard' },
];

const AlumniTopNav: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="sticky top-0 z-20 bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-2 overflow-x-auto">
        {items.map((it) => {
          const active = location.pathname === it.to;
          return (
            <Link key={it.to} to={it.to} className="shrink-0">
              <Button variant={active ? 'default' : 'ghost'} size="sm">
                {it.label}
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default AlumniTopNav;




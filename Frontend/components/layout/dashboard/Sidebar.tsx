'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Car, Home, Settings, Users, LogOut, ListPlus, PlusCircle } from 'lucide-react';
import { clearAuthToken } from '@/util/auth';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [carsOpen, setCarsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    clearAuthToken();
    router.push('/2fa');
  };

  const isActive = (href: string) => pathname.startsWith(href);

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <Home size={18} /> },
    {
      label: 'Cars', href: '#', icon: <Car size={18} />,
      submenu: [
        { label: 'Cars List', href: '/dashboard/cars/car-list', icon: <ListPlus size={18} /> }, 
      ],
    },
    //{ label: 'Users', href: '/dashboard/users', icon: <Users size={18} /> },
  ];

  return (
    <aside
      className={`d-flex flex-column bg-white shadow-sm p-3 border-end position-sticky top-0 vh-100 transition-all ${collapsed ? 'collapsed' : ''
        }`}
      style={{ width: collapsed ? '80px' : '240px', transition: 'width 0.3s ease' }}
    >
      {/* Collapse Button */}
      <button
        className="btn btn-sm btn-outline-secondary align-self-end mb-4"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? '➡️' : '⬅️'}
      </button>

      {/* Branding */}
      <div className="text-center mb-4">
        {!collapsed ? (
          <>
            <img
								src="/assets/imgs/template/Tokoss-motors-Logo-d.svg"
								className="light-mode"
								alt="Tokoss Motors"
								loading="eager"
								fetchPriority="high"
								width={180}
								height={75} />
							<img
								src="/assets/imgs/template/Tokoss-motors-Logo-w.svg"
								className="dark-mode"
								alt="Tokoss Motors"
								width={120}
								height={60}
								loading="eager"
								fetchPriority='high'
							/>
          </>
        ) : (
          <img className="light-mode" alt="TM" width={40} height={40} src="/assets/imgs/template/favicon.svg" />
        )}
      </div>
      {/* Nav Items */}
      <nav className="nav nav-pills flex-column gap-2">
        {menuItems.map((item) =>
          item.submenu ? (
            <div key={item.label}>
              <div
                role="button"
                onClick={() => setCarsOpen(!carsOpen)}
                className={`nav-link w-50 d-flex align-items-center gap-2 ${isActive(item.href) ? 'active bg-warning text-white' : 'text-dark'
                  }`}
                style={{ cursor: 'pointer', padding: '0.5rem 1rem', borderRadius: '0.375rem' }}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </div>
              {!collapsed && carsOpen && (
                <div className="ms-4 d-flex flex-column gap-2 mt-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={`nav-link d-flex align-items-center gap-2 px-2 ${pathname === subItem.href ? 'bg-secondary text-white' : 'text-muted'
                        }`}
                    >
                      {subItem.icon}
                      <span>{subItem.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link d-flex align-items-center gap-2 ${pathname === item.href ? ' bg-secondary text-white' : 'text-dark'
                }`}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
      </nav>


      {/* Logout */}
      <div className="mt-auto">
        <button className="btn btn-danger w-100 d-flex align-items-center gap-2" onClick={handleLogout}>
          <LogOut size={18} />
          {!collapsed && <span >Logout</span>}
        </button>
      </div>
    </aside>
  );
}

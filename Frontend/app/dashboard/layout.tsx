'use client';

import { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/dashboard/Sidebar';


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (


    <div>
      <div>
       {/* Top Navbar */}
       <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm px-4">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <span className="navbar-brand fw-bold">Admin Panel</span>
            
          </div>
        </nav>
      </div>
      <div className="d-flex" style={{ minHeight: '100vh', overflow: 'hidden' }}>
        {/* Sidebar */}
        <Sidebar />

          {/* Main Content */}
          <div className="flex-grow-1 p-4 bg-light" style={{ overflowY: 'auto', width: '100%' }}>
          {children}
        </div>
      </div>
      
    </div>
  );
}

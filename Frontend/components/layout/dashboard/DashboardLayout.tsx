import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

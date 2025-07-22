'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, CarFront, Car } from 'lucide-react';
import { clearAuthToken, getAuthToken } from '@/util/auth';
import Head from 'next/head';

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [stats, setStats] = useState({ total: 0, new: 0, used: 0 });
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const storedToken = getAuthToken();
    if (!storedToken) {
      router.push('/2fa');
    } else {
      setToken(storedToken);
      fetch(`${API_BASE_URL}/cars/stats`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then(res => res.json())
        .then(setStats)
        .catch(err => console.error(err));
    }
  }, [router]);

  const StatCard = ({
    icon: Icon,
    label,
    count,
    color,
  }: {
    icon: React.ElementType;
    label: string;
    count: number;
    color: string;
  }) => (
    <div className="col-md-6 col-xl-3">
      <div className={`card text-white ${color} mb-4 shadow`}>
        <div className="card-body d-flex align-items-center">
          <div className="me-3 bg-white bg-opacity-25 rounded-circle p-2">
            <Icon size={28} />
          </div>
          <div>
            <h5 className="mb-1 fw-semibold">{label}</h5>
            <h5 className="mb-0">{count}</h5>
          </div>
        </div>
      </div>
    </div>
  );

  return (

    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="container py-4">
        <div className="row">
          <StatCard icon={BarChart3} label="Total Cars" count={stats.total} color="bg-primary" />
          <StatCard icon={CarFront} label="New Cars" count={stats.new} color="bg-success" />
          <StatCard icon={Car} label="Used Cars" count={stats.used} color="bg-warning" />
        </div>
      </div>
    </>
  );
}
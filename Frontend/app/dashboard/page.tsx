
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, CarFront, Car } from 'lucide-react';
import { getAuthToken } from '@/util/auth';
import Head from 'next/head';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Stats = {
  total: number;
  new: number;
  used: number;
};

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    total: 0,
    new: 0,
    used: 0,
  });
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      const storedToken = getAuthToken();

      if (!storedToken) {
        // Do not redirect to /2fa because that page redirects here.
        router.replace('/login');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/cars/stats`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            response.status === 401 || response.status === 403
              ? 'Your session is invalid or expired. Please sign in again.'
              : 'Unable to load dashboard statistics.'
          );
        }

        const data = await response.json();

        if (!cancelled) {
          setStats({
            total: Number(data.total) || 0,
            new: Number(data.new) || 0,
            used: Number(data.used) || 0,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'An unexpected error occurred.'
          );
        }
      } finally {
        if (!cancelled) {
          setCheckingAuth(false);
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="container py-5 text-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <p role="alert">{error}</p>
        <button
          className="btn btn-primary"
          onClick={() => router.replace('/login')}
        >
          Return to login
        </button>
      </div>
    );
  }

  const cards = [
    {
      label: 'Total Cars',
      count: stats.total,
      color: 'bg-primary',
      Icon: BarChart3,
    },
    {
      label: 'New Cars',
      count: stats.new,
      color: 'bg-success',
      Icon: CarFront,
    },
    {
      label: 'Used Cars',
      count: stats.used,
      color: 'bg-warning',
      Icon: Car,
    },
  ];

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="container py-4">
        <div className="row">
          {cards.map(({ label, count, color, Icon }) => (
            <div className="col-md-6 col-xl-3" key={label}>
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
          ))}
        </div>
      </div>
    </>
  );
}

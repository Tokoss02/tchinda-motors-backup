import { Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import CarsListClient from '@/components/pages/CarsListClient';

export default function InventoryPage() {
  return (
    <Layout footerStyle={1}>
      <Suspense fallback={<div className="container py-5">Loading inventory...</div>}>
        <CarsListClient />
      </Suspense>
    </Layout>
  );
}

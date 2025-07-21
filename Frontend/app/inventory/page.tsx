import { Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import CarsListClient from '@/components/pages/CarsListClient';
import Head from "next/head";

export default function InventoryPage() {
  return (
    <Layout footerStyle={1}>
      <Head>
				<title>Inventory | Tokoss Motors</title>
				<meta name="description" content="Browse our inventory of vehicles at Tokoss Motors." />
				<link rel="canonical" href="https://www.tokossmotors.com/inventory" />
			</Head>
      <Suspense fallback={<div className="container py-5">Loading inventory...</div>}>
        <CarsListClient />
      </Suspense>
    </Layout>
  );
}

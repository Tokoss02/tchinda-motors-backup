import { Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import CarsListClient from '@/components/pages/CarsListClient';
import Head from "next/head";

export default function InventoryPage() {
  return (
    <Layout footerStyle={1}>
      <Head>
				<title>Inventory | Tchinda Motors</title>
				<meta name="description" content="Browse our inventory of vehicles at Tchinda Motors." />
				<link rel="canonical" href="https://www.tchindamotors.com/inventory" />
			</Head>
      <Suspense>
        <CarsListClient />
      </Suspense>
    </Layout>
  );
}

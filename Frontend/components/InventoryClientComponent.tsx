'use client';
import { useSearchParams } from 'next/navigation';


export default function InventoryClientComponent() {
  const params = useSearchParams();
  const query = params.get('q');
  return <div>Search Query: {query}</div>;
}

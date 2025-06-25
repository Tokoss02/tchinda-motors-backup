'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function BreadcrumbArrow() {
	return (
		<span className="arrow-right">
			<svg
				width={7}
				height={12}
				viewBox="0 0 7 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1 11L6 6L1 1"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</span>
	);
}

function formatSlug(slug: string) {
	return slug
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export default function Breadcrumbs() {
	const pathname = usePathname(); // /inventory/toyota/hiace
	const parts = pathname.split('/').filter(Boolean); // ['inventory', 'toyota', 'hiace']

	const crumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Inventory', href: '/inventory' },
		...parts.slice(1).map((slug, index) => {
			const href = '/' + parts.slice(0, index + 2).join('/');
			return { label: formatSlug(slug), href };
		}),
	];

	return (
		<section className="box-section box-breadcrumb background-body">
			<nav aria-label="breadcrumbs">
				<ol className="breadcrumbs">
					{crumbs.map((crumb, index) => (
						<li key={index} className="arrow-right">
							<Link href={crumb.href}>{crumb.label}</Link>
							{index < crumbs.length - 1 && <BreadcrumbArrow />}
						</li>
					))}
				</ol>
			</nav>
		</section>
	);
}

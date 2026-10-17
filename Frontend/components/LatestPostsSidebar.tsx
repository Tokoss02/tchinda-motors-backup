'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LatestPostsSidebar() {
	const [posts, setPosts] = useState<any[]>([]);

	useEffect(() => {
		fetch('/api/posts')
			.then(res => res.json())
			.then(data => setPosts(data));
	}, []);

	return (
		<div className="box-content-sidebar">
			<h5 className="mb-3">Latest Posts</h5>

			{posts.length === 0 && (
				<p className="text-sm text-muted">Loading...</p>
			)}

			{posts.map((post) => (
				<div key={post._id} className="sidebar-post d-flex mb-3">

					<img
						src={post.image}
						alt={post.title}
						style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6 }}
					/>

					<div className="ms-2">
						<Link href={`/blog/${post.slug}`}>
							<p className="mb-1">{post.title}</p>
						</Link>

						<small className="text-muted">
							{new Date(post.createdAt).toLocaleDateString()}
						</small>
					</div>

				</div>
			))}
		</div>
	);
}
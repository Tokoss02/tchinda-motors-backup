'use client'

import Head from "next/head"
import { useEffect, useState } from "react"
import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function BlogGrid() {
	const [blogs, setBlogs] = useState<any[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const controller = new AbortController();

		fetch("http://localhost:5000/blog", { signal: controller.signal })
			.then(res => res.json())
			.then(data => {
				if (Array.isArray(data)) setBlogs(data);
				else if (Array.isArray(data.data)) setBlogs(data.data);
				else setBlogs([]);
			})
			.catch(err => {
				if (err.name !== "AbortError") console.error(err);
				setBlogs([]);
			})
			.finally(() => setLoading(false));

		return () => controller.abort();
	}, []);

	return (

		<Layout footerStyle={1}>
			<Head>
				<title>{blogs[0]?.metaTitle || blogs[0]?.title || "Tokoss Motors Blog"}</title>
				<meta name="description" content={blogs[0]?.metaDescription || blogs[0]?.title || "Latest news from Tokoss Motors."} />
			</Head>

			<div className="page-header pt-30 background-body">
				<div className="custom-container position-relative mx-auto">
					<div className="bg-overlay rounded-12 overflow-hidden">
						<img className="w-100 h-100 rounded-12 img-banner" src="/assets/imgs/page-header/banner4.png" alt="Tokoss Motors" />
					</div>
					<div className="container position-absolute z-1 top-50 start-50 translate-middle">
						<h2 className="text-white">News</h2>
					</div>
				</div>
			</div>
			<section className="box-section background-body pt-05">
				<div className="container">

					<h3 className="text-center mb-65 neutral-1000">
						Latest News
					</h3>

					{/* ✅ Loading state */}
					{loading && <p className="text-center">Loading blogs...</p>}

					{/* ✅ Empty state */}
					{!loading && blogs.length === 0 && (
						<p className="text-center">No blog posts found</p>
					)}

					<div className="row">
						{blogs.map((blog) => (
							<div key={blog._id} className="col-lg-4 col-md-6 col-12">
								<div className="card-news background-card hover-up mb-4">

									<div className="card-image">
										<img
											src={blog.image || "/assets/imgs/default.jpg"}
											alt={blog.title || "Blog image"}
											loading="lazy"
										/>
									</div>

									<div className="card-info">
										<label className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold">
											{blog.category}
										</label>

										<div className="card-meta">
											<span className="post-date neutral-1000">
												{blog.createdAt
													? new Date(blog.createdAt).toDateString()
													: "No date"}
											</span>

											<span className="post-time neutral-1000">
												{blog.readTime || "5 mins"}
											</span>

											<span className="post-comment neutral-1000">
												{blog.comments?.length || 0} comments
											</span>
										</div>

										<div className="card-title">
											<Link
												href={`/blog/${blog.slug}`}
												className="text-xl-bold neutral-1000"
											>
												{blog.title}
											</Link>
										</div>

										<div className="card-button">
											<Link
												href={`/blog/${blog.slug}`}
												className="btn btn-gray"
											>
												Keep Reading
											</Link>
										</div>

									</div>
								</div>
							</div>
						))}
					</div>

				</div>
			</section>
		</Layout>
	)
}
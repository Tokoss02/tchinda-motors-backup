'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import LatestPostsSidebar from "@/components/LatestPostsSidebar"


export default function BlogDetails() {
  const { slug } = useParams()
  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    fetch(`http://localhost:5000/blog/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error("Blog not found")
        return res.json()
      })
      .then(data => setBlog(data))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <p className="text-center mt-5">Loading...</p>
  if (!blog) return <p className="text-center mt-5">Blog not found</p>

  const currentUrl =
    typeof window !== "undefined" ? window.location.href : ""

  return (
    <Layout footerStyle={1}>
      <div>

        {/* HEADER */}
        <div className="page-header pt-30 background-body">
          <div className="custom-container position-relative mx-auto">

            <div className="bg-overlay rounded-12 overflow-hidden">
              <img
                className="w-100 h-100 rounded-12 img-banner"
                src={blog.image}
                alt={blog.title}
              />
            </div>

            <div className="container position-absolute z-1 top-50 start-50 translate-middle d-none d-lg-block">
              <span className="btn btn-label-tag background-3">
                {blog.category || "News"}
              </span>

              <h2 className="text-white py-3 w-75">
                {blog.title}
              </h2>

              <div className="card-meta">
                <span className="post-date text-white">
                  {new Date(blog.createdAt).toDateString()}
                </span>
              </div>
            </div>

            {/* BREADCRUMB */}
            <div className="background-body position-absolute z-1 top-100 start-50 translate-middle px-3 py-2 rounded-12 border gap-3 d-none d-md-flex w-md-75">
              <Link href="/">Home</Link>
              <span>→</span>
              <Link href="/blog">Blog</Link>
              <span>→</span>
              <span>{blog.title}</span>
            </div>

          </div>
        </div>

        {/* CONTENT */}
        <section className="box-section background-body">
          <div className="container">
            <div className="section-box background-body pt-96">
              <div className="row">

                {/* LEFT */}
                <div className="col-lg-8 mb-35">

                  <div className="box-content-detail-blog">

                    {/* CONTENT */}
                    <div
                      className="content-detail-post"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* SHARE */}
                    <div className="footer-post-tags mt-50">
                      <div className="box-share">
                        <div className="d-flex align-items-center justify-content-end flex-wrap">
                          <p className="text-lg-bold neutral-1000 me-2">
                            Share:
                          </p>

                          <div className="d-flex gap-2">

                            {/* Facebook */}
                            <a
                              href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                              target="_blank"
                            >
                              FB
                            </a>

                            {/* Twitter */}
                            <a
                              href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${blog.title}`}
                              target="_blank"
                            >
                              X
                            </a>

                            {/* WhatsApp */}
                            <a
                              href={`https://wa.me/?text=${blog.title} ${currentUrl}`}
                              target="_blank"
                            >
                              WA
                            </a>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="col-lg-4">

                  <div className="box-sidebar-border">
                    <div className="box-head-sidebar">
                      <p className="text-xl-bold">Recent posts</p>
                    </div>

                    <div className="box-content-sidebar">
                      <p className="text-sm text-muted">
                        <LatestPostsSidebar />
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  )
}
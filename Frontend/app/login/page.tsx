"use client";
// pages/login.tsx
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		setLoading(true);

		try {
			const res = await fetch("http://localhost:5000/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (data.isTwoFactorEnabled) {
				// Show 2FA input UI
			  } else {
				// Save token and redirect to dashboard
				localStorage.setItem("access_token", data.access_token);
				router.push("/dashboard");
			  }
		} catch (err) {
			  console.error("Login failed", err);
			}
	};

	return (
		<div className="container pt-140 pb-170">
			<div className="row">
				<div className="col-lg-5 mx-auto">
					<div className="border rounded-3 px-md-5 px-3 ptb-50">
						<div className="login-content">
								 {/* ✅ Logo */}
							<div style={{ textAlign: "center", marginBottom: "1rem" }}>
								<Link href="/">
									<img className="light-mode" alt="Tokoss Motors" width={180} height={75} src="/assets/imgs/template/Tokoss-motors-Logo-d.svg" />
									<img className="dark-mode" alt="Tokoss Motors" width={120} height={60} src="/assets/imgs/template/Tokoss-motors-Logo-w.svg" />
								</Link>
							</div>
							<div className="text-center">
								<p>Admin | Tokoss Motors</p>
								<h4 className="neutral-1000">Sign in</h4>
							</div>
							<div className="form-login mt-30">
								<form onSubmit={handleLogin}>
									<div className="form-group">
										<input
											className="form-control username"
											type="text"
											placeholder="Email / Username"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
										/>
									</div>
									<div className="form-group">
										<input
											className="form-control password"
											type="password"
											placeholder="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
									</div>
									<div className="form-group">
										<div className="box-remember-forgot">
											<div className="remeber-me">
												<label className="text-xs-medium neutral-500">
													<input className="cb-remember" type="checkbox" /> Remember me
												</label>
											</div>
											<div className="forgotpass">
												<Link className="text-xs-medium neutral-500" href="/forgot-password">Forgot password?</Link>
											</div>
										</div>
									</div>
									<div className="form-group mb-30">
										<button type="submit" className="btn btn-primary w-100">
											Sign in
											<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</button>
									</div>
									
									
									<p className="text-sm-medium neutral-500 text-center mt-70">
										 <Link className="neutral-1000" href="/">Return to Home</Link>
									</p>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

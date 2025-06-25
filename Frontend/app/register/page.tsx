
import Link from "next/link"
export default function Register() {

	return (
		<>
				<div className="container pt-140 pb-170">
					<div className="row">
						<div className="col-lg-5 mx-auto">
							<div className="register-content border rounded-3 px-md-5 px-3 ptb-50">

								 {/* ✅ Logo */}

							<div style={{ textAlign: "center", marginBottom: "1rem" }}>
								<Link href="/">
									<img className="light-mode" alt="Tokoss Motors" width={180} height={75} src="/assets/imgs/template/Tokoss-motors-Logo-d.svg" />
									<img className="dark-mode" alt="Tokoss Motors" width={120} height={60} src="/assets/imgs/template/Tokoss-motors-Logo-w.svg" />
								</Link>
							</div>


								<div className="text-center">
									<p>Register</p>
									<h4 className="neutral-1000">Create an Account</h4>
								</div>
								<div className="form-login mt-30">
									<form action="#">
										<div className="form-group">
											<input className="form-control username" type="text" placeholder="Email / Username" />
										</div>
										<div className="form-group">
											<input className="form-control email" type="text" placeholder="Email / Username" />
										</div>
										<div className="form-group">
											<input className="form-control password" type="password" placeholder="***********" />
										</div>
										<div className="form-group">
											<input className="form-control password" type="password" placeholder="***********" />
										</div>
										<div className="form-group my-3">
											<div className="box-remember-forgot">
												<div className="remeber-me d-flex align-items-center neutral-500">
													<input className="cb-remember" type="checkbox" />
													I agree to term and conditions
												</div>
											</div>
										</div>
										<div className="form-group mb-30">
											<Link className="btn btn-primary w-100" href="#">Sign up
												<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</Link>
										</div>
										
										<p className="text-sm-medium neutral-500 text-center mt-70">Already have an account? <Link className="neutral-1000" href="/login">Login Here !</Link></p>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
		</>
	)
}
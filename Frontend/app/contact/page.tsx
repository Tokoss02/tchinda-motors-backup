'use client';

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import ReCAPTCHA from 'react-google-recaptcha';

export default function Contact() {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		message: '',
		agree: false
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	//const [captchaToken, setCaptchaToken] = useState<string | null>(null);

	/*const handleCaptchaChange = (token: string | null) => {
		setCaptchaToken(token);
	};*/
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;
		const newValue =
			type === 'checkbox'
				? (e.target as HTMLInputElement).checked // ✅ type assertion
				: value;

		setFormData(prev => ({
			...prev,
			[name]: newValue,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setSuccess(null);
		setError(null);

		if (!formData.agree) {
			setError("You must agree to the Terms and Privacy Policy.");
			setLoading(false);
			return;
		}
		if (!formData.agree) {
		setError("You must agree to the Terms and Privacy Policy.");
		setLoading(false);
		return;
	}

	try {
		const response = await axios.post(`https://tokossmotors.com/cars/contact`, {
			...formData
		});
		setSuccess("Your message has been sent successfully.");
		setFormData({
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			message: '',
			agree: false
		});
	} catch (err: any) {
		console.error(err);
		setError("There was an error sending your message. Please try again.");
	} finally {
		setLoading(false);
	}

		/*if (!captchaToken) {
			setError("Please verify you're not a robot.");
			setLoading(false);
			return;
		}*/

		/*try {
			const response = await axios.post(`https://tokossmotors.com/cars/contact`, {
				...formData,
				captchaToken
			});
			setSuccess("Your message has been sent successfully.");
			setFormData({
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				message: '',
				agree: false
			});
			setCaptchaToken(null);
		} catch (err: any) {
			setError("There was an error sending your message. Please try again.");
		} finally {
			setLoading(false);
		} */
	};

	return (
		<Layout footerStyle={1}>
			<div className="page-header pt-30 background-body">
				<div className="custom-container position-relative mx-auto">
					<div className="bg-overlay rounded-12 overflow-hidden">
						<img className="w-100 h-100 rounded-12 img-banner" src="/assets/imgs/page-header/banner4.png" alt="Tokoss Motors" />
					</div>
					<div className="container position-absolute z-1 top-50 start-50 translate-middle">
						<h2 className="text-white">Contact Us</h2>
					</div>
				</div>
			</div>

			<section className="box-section box-contact-form background-body">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 mb-30">
							<h2 className="neutral-1000 mb-25">Get in Touch</h2>
							<form className="form-contact" onSubmit={handleSubmit}>
								<div className="row">
									<div className="col-lg-6">
										<div className="form-group">
											<label className="text-sm-medium neutral-1000">First Name</label>
											<input name="firstName" value={formData.firstName} onChange={handleChange} className="form-control" type="text" placeholder="First Name" required />
										</div>
									</div>
									<div className="col-lg-6">
										<div className="form-group">
											<label className="text-sm-medium neutral-1000">Last Name</label>
											<input name="lastName" value={formData.lastName} onChange={handleChange} className="form-control" type="text" placeholder="Last Name" required />
										</div>
									</div>
									<div className="col-lg-12">
										<div className="form-group">
											<label className="text-sm-medium neutral-1000">Email Address</label>
											<input name="email" value={formData.email} onChange={handleChange} className="form-control" type="email" placeholder="email@domain.com" required />
										</div>
									</div>
									<div className="col-lg-12">
										<div className="form-group">
											<label className="text-sm-medium neutral-1000">Phone Number</label>
											<input name="phone" value={formData.phone} onChange={handleChange} className="form-control" type="text" placeholder="Phone number" />
										</div>
									</div>
									<div className="col-lg-12">
										<div className="form-group">
											<label className="text-sm-medium neutral-1000">Your Message</label>
											<textarea name="message" value={formData.message} onChange={handleChange} className="form-control" rows={6} placeholder="Leave us a message..." required />
										</div>
									</div>
									<div className="box-remember-forgot">
										<div className="form-group">
											<label className="text-sm-medium neutral-500">
												<input className="cb-remember" type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} /> Agree to our <Link href="/term">Terms of service</Link> and <Link href="/privacy">Privacy Policy</Link>
											</label>
										</div>
									</div>

									{success && <p className="text-success">{success}</p>}
									{error && <p className="text-danger">{error}</p>}
									{/*<div className="col-lg-12 mb-3">
										<ReCAPTCHA
											sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
											onChange={handleCaptchaChange}
											
										/>
									</div>*/}

									<div className="col-lg-12">
										<button className="btn btn-prima w-100 mt-3" type="submit" disabled={loading}>
											{loading ? 'Sending...' : 'Send message'}
											<svg width={17} height={16} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M8.5 15L15.5 8L8.5 1M15.5 8L1.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</button>
									</div>
								</div>
							</form>
						</div>

						<div className="col-lg-6 mb-30">
							<div className="ps-lg-5">
								<h4 className="neutral-1000">Our location</h4>
								<p className="neutral-500 mb-30">Ras Al Khor Industrial 3, Dubai, United Emirates Arab</p>
								<iframe className="h-520 rounded-3" src="https://www.google.com/maps/embed?pb=..." width="100%" height={650} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}

import { useState } from 'react';
import axios from 'axios';
import { event as gtagEvent } from '@/util/gtag';

interface InquiryFormProps {
  car: {
    carSlug: string;
    brandSlug: string;
    modelSlug: string;
  };
}

export default function InquiryForm({ car }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    shippingDate: new Date().toISOString().split('T')[0],
  });

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await axios.post(
        `https://api.tokossmotors.com/inquiry`,
        {
          ...formData,
          carSlug: car.carSlug,
          brandSlug: car.brandSlug,
          modelSlug: car.modelSlug,
        }
      );

      // ✅ Google Analytics Event Tracking
    gtagEvent({
      action: 'submit_form',
      category: 'Contact',
      label: 'Inquiry Form Submission',
    });


      setSuccess('Inquiry submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        shippingDate: new Date().toISOString().split('T')[0],
        destination: '',
      });
    } catch (err) {
      console.error(err);
      setError('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form">
      <div className="head-booking-form">
          <h4 className="mb-3" >Get Started</h4>

          <form onSubmit={handleSubmit}>
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Name"
              required
            />

            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Email"
              required
            />

            <label className="form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Phone Number"
              required
            />

            <label className="form-label">Export To</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Destination"
            />

            <label className="form-label mt-3">Shipping date</label>
            <input
              type="date"
              name="shippingDate"
              value={formData.shippingDate}
              onChange={handleChange}
              className="form-control mb-3"
            />

            <button type="submit" className="btn btn-primary w-100 mt-3 rounded" disabled={loading}>
              {loading ? 'Submitting...' : 'Inquire Now'}
            </button>

            {success && <div className="alert alert-success mt-3">{success}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </form>
        
      </div>
    </div>
  );
}

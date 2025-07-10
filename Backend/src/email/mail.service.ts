// mail.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import { ContactDto } from 'src/contact/ContactDto';
import { generateCarSlug } from 'src/utils/slug.util';

const brandColor = '#CC9823';
const siteUrl = process.env.FRONTEND_URL || 'https://tokossmotors.com';

console.log('SMTP Credentials:', process.env.MAIL_USER, process.env.MAIL_PASS ? '✅ Set' : '❌ Missing');

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);


  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

 async sendContactEmail(data: ContactDto) {
    const { firstName, lastName, email, phone, message } = data;

    const mailOptions = {
  from: `"${firstName} ${lastName}" <${email}>`,
  to: process.env.CONTACT_RECEIVER || 'achille_fofe@yahoo.fr',
  subject: '📩 New Contact Message from Tokoss Motors Website',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; background-color: #f9f9f9;">
      <div style="text-align: center; padding-bottom: 20px;">
        <h1 style="color: #CC9823; margin: 0;">Tokoss Motors Fze</h1>
        <p style="margin: 0; color: #555;">Premium Cars. Trusted Deals.</p>
      </div>

      <h2 style="color: #333;">New Contact Inquiry</h2>
      <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold; width: 120px;">Name:</td>
          <td style="padding: 8px;">${firstName} ${lastName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Email:</td>
          <td style="padding: 8px;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Phone:</td>
          <td style="padding: 8px;">${phone || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; vertical-align: top;">Message:</td>
          <td style="padding: 8px;">${message}</td>
        </tr>
      </table>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;" />

      <p style="font-size: 13px; color: #888;">
        This message was submitted through the <strong>Tokoss Motors</strong> website.
      </p>
    </div>
  `,
};


    await this.transporter.sendMail(mailOptions);
    this.logger.log(`Contact form email sent from ${email}`);
  }

  async sendConfirmation({
    email,
    name,
    phone,
    destination,
    shippingDate,
    fullCarUrl,
    brandSlug,
    modelSlug,
    pdfPath,
   // captchaToken,
  }: {
    email: string;
    name: string;
    phone: string;
    destination?: string;
    shippingDate?: string;
    fullCarUrl?: string;
    brandSlug?: string;
    modelSlug?: string;
    pdfPath?: string;
    //captchaToken?: string;
  }) {
    try {
      // CAPTCHA verification
    /*  if (captchaToken && process.env.RECAPTCHA_SECRET_KEY) {
        const { data } = await axios.post(
          `https://www.google.com/recaptcha/api/siteverify`,
          null,
          {
            params: {
              secret: process.env.RECAPTCHA_SECRET_KEY,
              response: captchaToken,
            },
          }
        );
        if (!data.success || (data.score !== undefined && data.score < 0.5)) {
          throw new Error('reCAPTCHA validation failed');
        }
      }*/

      const carLink = fullCarUrl || null;

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: ${brandColor};">Tokoss Motors Fze</h1>
            <p style="margin: 0;">Premium Cars. Trusted Deals.</p>
          </div>
          <h2 style="color: ${brandColor};">Hello ${name},</h2>
          <p>Thank you for reaching out to Tokoss Motors!</p>
          ${
            carLink
              ? `<p>You can view the car you inquired about <a href="${carLink}" style="color: ${brandColor}; text-decoration: underline;">here</a>.</p>`
              : ''
          }
          <p>We’ll get back to you shortly with more information.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;" />
          <p style="font-size: 14px; color: #666;">
            Regards,<br>
            <strong>Tokoss Motors Fze</strong><br>
            <a href="${siteUrl}" style="color: ${brandColor};">Visit our website</a>
          </p>
        </div>
      `;

      const internalHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: ${brandColor};">New Inquiry Received</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${phone || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Shipping Date:</td><td style="padding: 8px;">${shippingDate || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Destination:</td><td style="padding: 8px;">${destination || 'N/A'}</td></tr>
            ${
              carLink
                ? `<tr><td style="padding: 8px; font-weight: bold;">Car:</td><td style="padding: 8px;"><a href="${carLink}" style="color: ${brandColor}; text-decoration: underline;">View Car Details</a></td></tr>`
                : ''
            }
          </table>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;" />
          <p style="font-size: 14px; color: #666;">
            This is an automated alert from <strong>Tokoss Motors Fze</strong>.
          </p>
        </div>
      `;

      const attachments = pdfPath
        ? [
            {
              filename: 'Tokoss-Motors-brochure.pdf',
              path: path.resolve(__dirname, '..', '..', 'public', pdfPath),
              contentType: 'application/pdf',
            },
          ]
        : [];
        

      // Send to customer
      await this.transporter.sendMail({
        from: '"Tokoss Motors Fze" <tokossmotors@gmail.com>',
        to: email,
        subject: 'Inquiry Confirmation',
        html: htmlContent,
        attachments,
      });

      // Send internal notification
      await this.transporter.sendMail({
        from: '"Tokoss Motors Website" <tokossmotors@gmail.com>',
        to: 'achille_fofe@yahoo.fr',
        subject: 'New Customer Inquiry',
        html: internalHtml,
        attachments,
      });
      

      this.logger.log(`Confirmation & internal email sent for ${email}`);
    } catch (error) {
      const err = error as Error;
      this.logger.error('Failed to send inquiry email', err.message || error);
      throw error;
    }
  }

  // ✅ Add this method to support the test endpoint in your controller
  async sendTestEmail() {
    await this.transporter.sendMail({
      from: '"Tokoss Motors Fze" <tokossmotors@gmail.com>',
      to: 'tokossmotors@gmail.com',
      subject: '🚀 Tokoss Motors - Test Email',
      html: `<p>This is a test email sent from <strong>Tokoss Motors MailService</strong>.</p>`,
    });

    this.logger.log('Test email sent to tokossmotors@gmail.com');
  }
}

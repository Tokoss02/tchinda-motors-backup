
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TwoFAPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>/dashboard</p>
    </div>
  );
}


{/*'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveAuthToken } from '@/util/auth';

export default function TwoFAPage() {
  const [digits, setDigits] = useState(Array(6).fill(''));
  const [email, setEmail] = useState('');
  const [result, setResult] = useState('');
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const isFormValid = digits.every((d) => d !== '') && email.trim() !== '';

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[index] === '' && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData('Text');
    const cleaned = pastedData.replace(/\D/g, '').slice(0, 6); // only digits, max 6

    if (cleaned.length > 0) {
      const newDigits = cleaned.split('');
      const updatedDigits = [...digits];

      for (let i = 0; i < 6; i++) {
        updatedDigits[i] = newDigits[i] || '';
      }

      setDigits(updatedDigits);

      // Focus the last filled box or the last one
      const lastIndex = Math.min(cleaned.length - 1, 5);
      inputsRef.current[lastIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = digits.join('');

    if (token.length !== 6 || !email) {
      setResult('❌ Please enter your email and the full 6-digit code.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/2fa/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`✅ Success: ${data.message}`);

        // Save token to localStorage
        saveAuthToken(data.access_token);

        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setResult(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setResult(`❌ Error: ${error}`);
    }
  };

  const digitsLeft = 6 - digits.filter((d) => d !== '').length;

  return (
    <div className="twofa-container">
      <form className="twofa-box" onSubmit={handleSubmit}>
        <div className="twofa-icon">🔐</div>
        <h2 className="twofa-title">2FA Verification</h2>
        <p className="twofa-subtext">
          Enter your email & 6-digit code from your authenticator APP.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="twofa-email"
        />

        <div className="twofa-inputs">
          {digits.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => {inputsRef.current[index] = el}}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="twofa-digit"
            />
          ))}
        </div>

        <div className="twofa-status">{digitsLeft} digits left</div>
        <button type="submit" className="twofa-button">Verify 2FA</button>
        {result && <p className="twofa-result">{result}</p>}
      </form>
    </div>
  );
}*/}



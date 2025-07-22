import TwoFAVerifyForm from "../../components/Forms/TwoFAVerifyForm";
import Head from 'next/head';

 

export default function TwoFAPage() {
  return (
    <>
    <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
    <main className="min-h-screen flex items-center justify-center">
      <TwoFAVerifyForm />
    </main>
    </>
  );
}

// src/pages/PrivacyPage.tsx
import { Link } from "react-router-dom";

export function PrivacyPage() {
  const lastUpdated = "February 6, 2026"; // поменяй на свою дату

  return (
    <main className="min-h-[calc(100vh-120px)] bg-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Breadcrumb / back */}
        <div className="mb-6">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Back to shop
          </Link>
        </div>

        {/* Title */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {lastUpdated}
          </p>
        </header>

        {/* Content */}
        <article className="prose prose-gray max-w-none">
          <p>
            CandyCraft respects your privacy and is committed to protecting your
            personal data.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We may collect the following personal information:</p>
          <ul>
            <li>First and last name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Delivery address</li>
            <li>Order details</li>
          </ul>

          <h2>2. How We Use Information</h2>
          <p>We use personal data only for:</p>
          <ul>
            <li>Processing and delivering orders</li>
            <li>Contacting customers regarding orders</li>
            <li>Improving our service</li>
          </ul>
          <p>We do not sell or rent personal data to third parties.</p>

          <h2>3. Sharing of Data</h2>
          <p>
            Information may be shared only when necessary to fulfill an order,
            for example:
          </p>
          <ul>
            <li>Delivery services</li>
            <li>Payment providers</li>
          </ul>

          <h2>4. Cookies</h2>
          <p>We use cookies for:</p>
          <ul>
            <li>User authentication</li>
            <li>Shopping cart functionality</li>
            <li>Basic website operation</li>
          </ul>

          <h2>5. Data Storage</h2>
          <p>
            Your data is stored securely and accessed only when necessary to
            provide services.
          </p>

          <h2>6. User Rights</h2>
          <p>You may request:</p>
          <ul>
            <li>Access to your data</li>
            <li>Correction of your data</li>
            <li>Deletion of your account</li>
          </ul>
          <p>
            To make a request, contact us at:{" "}
            <a href="mailto:your@email.com">your@email.com</a>
          </p>

          <h2>7. Changes</h2>
          <p>
            We may update this Privacy Policy from time to time. Updates will be
            posted on this page.
          </p>

          <h2>Contact</h2>
          <p>
            CandyCraft
            <br />
            Email: <a href="mailto:your@email.com">your@email.com</a>
          </p>
        </article>

        {/* Bottom actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition"
          >
            Continue shopping
          </Link>
          <a
            href="mailto:belakdanila9@gmail.com"
            className="inline-flex items-center justify-center rounded-xl bg-black text-white px-4 py-2.5 text-sm font-medium hover:opacity-90 transition"
          >
            Contact us
          </a>
        </div>
      </div>
    </main>
  );
}

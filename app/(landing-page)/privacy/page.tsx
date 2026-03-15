"use client"


export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-950 selection:bg-primary/10 selection:text-primary dark:bg-zinc-950 dark:text-zinc-50">
      <main className="pt-20">
        {/* Simple Hero Section */}
        <section className="px-6 pt-12 pb-12">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl">
            <div className="relative flex h-[300px] flex-col items-center justify-center p-8 text-center sm:h-[400px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.15),transparent)] opacity-100"></div>
              
              <div className="relative z-10 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                  Privacy Policy
                </h1>
                <p className="mx-auto max-w-2xl text-lg font-medium text-zinc-400">
                  We care about your privacy. This policy explains how we handle your data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Policy Content */}
        <section className="px-6 py-12 pb-32">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 flex flex-col items-start gap-4">
              <h2 className="text-3xl font-bold">Privacy Policy</h2>
              <p className="text-sm font-bold tracking-widest text-zinc-400 uppercase">
                Last updated: March 9, 2026
              </p>
            </div>

            <div className="space-y-12">
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">OpenRole (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and browser extension.</p>

              <div>
                <h3 className="text-2xl font-bold mb-4">1. Information We Collect</h3>
                <p className="mb-4">We collect information you provide directly to us:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li><strong className="text-zinc-900 dark:text-zinc-100">Account Information:</strong> Name, email address, and password when you create an account.</li>
                  <li><strong className="text-zinc-900 dark:text-zinc-100">Profile Information:</strong> Resume data, work history, education, skills, and other professional information you choose to provide.</li>
                  <li><strong className="text-zinc-900 dark:text-zinc-100">Application Data:</strong> Information about job applications submitted through our service.</li>
                  <li><strong className="text-zinc-900 dark:text-zinc-100">Usage Data:</strong> Information about how you interact with our service, including pages visited and features used.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">2. How We Use Your Information</h3>
                <p className="mb-4">We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Auto-fill job applications on your behalf</li>
                  <li>Generate resumes and cover letters</li>
                  <li>Track your job applications</li>
                  <li>Send you service-related communications</li>
                  <li>Respond to your requests and support inquiries</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">3. Information Sharing</h3>
                <p className="mb-4 text-zinc-600 dark:text-zinc-400">We do not sell your personal information. We may share your information only in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li><strong className="text-zinc-900 dark:text-zinc-100">With Job Boards:</strong> When you use our auto-fill feature, your profile information is submitted to the job application forms you choose to fill.</li>
                  <li><strong className="text-zinc-900 dark:text-zinc-100">Service Providers:</strong> We may share information with third-party vendors who assist in providing our services (e.g., hosting, analytics).</li>
                  <li><strong className="text-zinc-900 dark:text-zinc-100">Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">4. Data Security</h3>
                <p className="text-zinc-600 dark:text-zinc-400">We implement appropriate security measures to protect your personal information, including encryption of data in transit and at rest. However, no method of transmission over the Internet is 100% secure.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">5. Your Rights</h3>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>Access, update, or delete your personal information</li>
                  <li>Export your data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request deletion of your account</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">6. Browser Extension</h3>
                <p className="mb-4">Our Chrome extension:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>Only activates on job application pages you visit</li>
                  <li>Stores your authentication token locally on your device</li>
                  <li>Does not collect browsing history or data from non-job-related pages</li>
                  <li>Only transmits data when you explicitly trigger the auto-fill feature</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">7. Cookies</h3>
                <p className="text-zinc-600 dark:text-zinc-400">We use cookies and similar technologies to maintain your session, remember your preferences, and analyze usage patterns. You can control cookies through your browser settings.</p>
              </div>

              <div>
                 <h3 className="text-2xl font-bold mb-4">8. Children&apos;s Privacy</h3>
                <p className="text-zinc-600 dark:text-zinc-400">Our service is not intended for individuals under 16 years of age. We do not knowingly collect personal information from children.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">9. Changes to This Policy</h3>
                 <p className="text-zinc-600 dark:text-zinc-400">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">10. Contact Us</h3>
                <p className="mb-4 text-zinc-600 dark:text-zinc-400">If you have questions about this Privacy Policy, please contact us at:</p>
                <p className="text-zinc-600 dark:text-zinc-400">Email: <a href="mailto:openrolehq@gmail.com" className="font-bold text-primary hover:underline">openrolehq@gmail.com</a></p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

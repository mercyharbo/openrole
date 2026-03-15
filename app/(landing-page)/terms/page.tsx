"use client"

import React from "react"

export default function TermsPage() {
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
                  Terms of Service
                </h1>
                <p className="mx-auto max-w-2xl text-lg font-medium text-zinc-400">
                  Please read our terms carefully before using our service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="px-6 py-12 pb-32">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 flex flex-col items-start gap-4">
              <h2 className="text-3xl font-bold">Terms of Service</h2>
              <p className="text-sm font-bold tracking-widest text-zinc-400 uppercase">
                Last updated: March 9, 2026
              </p>
            </div>

            <div className="space-y-12">
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">Welcome to OpenRole. By accessing or using our service, you agree to be bound by these Terms of Service.</p>

              <div>
                <h3 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h3>
                <p className="text-zinc-600 dark:text-zinc-400">By creating an account or using OpenRole, you agree to these Terms of Service and our Privacy Policy. If you do not agree, do not use our service.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">2. Description of Service</h3>
                <p className="mb-4">OpenRole provides:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>A platform to store and manage your professional profile</li>
                  <li>A browser extension to auto-fill job applications</li>
                  <li>AI-powered resume and cover letter generation</li>
                  <li>Job application tracking</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">3. Account Registration</h3>
                <p className="mb-4">You must:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Be at least 16 years old to use the service</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">4. Acceptable Use</h3>
                <p className="mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>Use the service for any illegal purpose</li>
                  <li>Submit false or misleading information in job applications</li>
                  <li>Attempt to circumvent security measures</li>
                  <li>Use automated systems to abuse the service</li>
                  <li>Interfere with the proper functioning of the service</li>
                  <li>Violate the terms of service of any job board or ATS</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">5. User Content</h3>
                <p className="text-zinc-600 dark:text-zinc-400">You retain ownership of content you submit (resumes, profiles, etc.). By using our service, you grant us a license to use this content solely to provide the service to you.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">6. AI-Generated Content</h3>
                <p className="text-zinc-600 dark:text-zinc-400">Our AI tools generate resumes and cover letters based on your input. You are responsible for reviewing and verifying all AI-generated content before use. We do not guarantee the accuracy or suitability of generated content.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">7. Third-Party Services</h3>
                <p className="text-zinc-600 dark:text-zinc-400">Our service interacts with third-party job boards and applicant tracking systems. We are not responsible for the availability, accuracy, or policies of these third-party services.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">8. Disclaimer of Warranties</h3>
                <p className="mb-4 italic">The service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>The service will be uninterrupted or error-free</li>
                  <li>Auto-fill will work on all job boards</li>
                  <li>Using our service will result in job offers</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">9. Limitation of Liability</h3>
                <p className="text-zinc-600 dark:text-zinc-400">To the maximum extent permitted by law, OpenRole shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or employment opportunities.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">10. Termination</h3>
                <p className="text-zinc-600 dark:text-zinc-400">We may suspend or terminate your account if you violate these terms. You may delete your account at any time through your account settings.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">11. Changes to Terms</h3>
                <p className="text-zinc-600 dark:text-zinc-400">We may modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">12. Governing Law</h3>
                <p className="text-zinc-600 dark:text-zinc-400">These terms shall be governed by the laws of the United States, without regard to conflict of law principles.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">13. Contact</h3>
                <p className="mb-2 text-zinc-600 dark:text-zinc-400">For questions about these Terms, contact us at:</p>
                <p className="text-zinc-600 dark:text-zinc-400">Email: <a href="mailto:openrolehq@gmail.com" className="font-bold text-primary hover:underline">openrolehq@gmail.com</a></p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

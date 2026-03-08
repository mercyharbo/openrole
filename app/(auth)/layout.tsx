'use client'

import { Loader } from '@/components/loader'
import { useAuthStore } from '@/lib/store/auth-store'
import Image from 'next/image'
import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { isSubmitting } = useAuthStore()

  return (
    <main className='grid grid-cols-1 lg:grid-cols-2 min-h-screen'>
      {/* Global Loader Overlay */}
      {isSubmitting && <Loader fullScreen text='Please wait...' />}

      {/* Left Side - Shared Gradient Pill Section */}
      <section className='hidden lg:flex flex-[1.1] items-center justify-center px-12 pb-12 overflow-hidden'>
        <div className='relative w-full max-w-lg 3xl:max-w-3xl h-full max-h-[720px]'>
          <Image
            src='/Container.png'
            alt='Auth Background'
            fill
            className='object-contain'
            priority
          />
        </div>
      </section>

      {/* Right Side - Page Specific Content */}
      <section className='flex-1 flex flex-col items-center justify-between px-5 py-10 lg:px-8 w-full'>
        {children}
      </section>
    </main>
  )
}

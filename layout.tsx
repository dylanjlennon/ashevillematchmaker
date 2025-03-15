import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Asheville Neighborhood Matchmaker',
  description: 'Find your perfect neighborhood in Asheville, North Carolina',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-900 text-white`}>
        <header className="bg-gray-800 shadow-md">
          <nav className="max-w-6xl mx-auto p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="mb-4 sm:mb-0">
              <Link href="/" className="text-xl font-bold text-purple-400 hover:text-purple-300">
                Asheville Neighborhood Matchmaker
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link href="/" className="hover:text-blue-300">Home</Link>
              <Link href="/quiz" className="hover:text-blue-300">Find Your Match</Link>
              <Link href="/neighborhoods" className="hover:text-blue-300">Neighborhoods</Link>
              <Link href="/compare" className="hover:text-blue-300">Compare</Link>
              <Link href="/about" className="hover:text-blue-300">About</Link>
            </div>
          </nav>
        </header>
        
        <main className="min-h-[calc(100vh-180px)]">
          {children}
        </main>
        
        <footer className="bg-gray-800 text-center p-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Asheville Neighborhood Matchmaker</h2>
            <p className="mb-4">Find your perfect neighborhood in Asheville, North Carolina based on your lifestyle and preferences.</p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <h3 className="font-semibold w-full">Quick Links</h3>
              <Link href="/quiz" className="hover:text-blue-300">
                <span className="inline-block bg-blue-600 rounded-full p-1 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                Find Your Match
              </Link>
              <Link href="/neighborhoods" className="hover:text-blue-300">
                <span className="inline-block bg-blue-600 rounded-full p-1 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </span>
                Explore Neighborhoods
              </Link>
              <Link href="/compare" className="hover:text-blue-300">
                <span className="inline-block bg-blue-600 rounded-full p-1 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </span>
                Compare Neighborhoods
              </Link>
            </div>
            
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} Asheville Neighborhood Matchmaker. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

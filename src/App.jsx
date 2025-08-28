
import React, { useState, useEffect, useRef } from 'react';
import ResultCard from './components/ResultCard'
import toast, { Toaster } from 'react-hot-toast'

export default function App() {
  const [id, setId] = useState('')
  const [result, setResult] = useState(null)
  const [recent, setRecent] = useState(() => JSON.parse(localStorage.getItem('recent') || '[]'))
  const [dark, setDark] = useState(false)
  const [loading, setLoading] = useState(false)
  const recentScrollRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('recent', JSON.stringify(recent))
  }, [recent])

  // Auto scroll to top when new result is added
  useEffect(() => {
    if (recent.length > 0 && recentScrollRef.current) {
      recentScrollRef.current.scrollTop = 0
    }
  }, [recent])

  // Auto scroll to center of page when page loads
  useEffect(() => {
    const scrollToCenter = () => {
      // For mobile, use window scroll instead of container scroll
      const isMobile = window.innerWidth < 768
      
      if (isMobile) {
        // Mobile: Scroll window to center the main content
        const mainContent = document.querySelector('.max-w-7xl')
        if (mainContent) {
          const rect = mainContent.getBoundingClientRect()
          const windowHeight = window.innerHeight
          const scrollTop = window.pageYOffset + rect.top - (windowHeight / 2) + (rect.height / 2)
          
          window.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: 'smooth'
          })
        }
      } else {
        // Desktop: Use container scroll
        const mainContainer = document.querySelector('.main-container')
        if (mainContainer) {
          const scrollHeight = mainContainer.scrollHeight
          const clientHeight = mainContainer.clientHeight
          
          if (scrollHeight > clientHeight) {
            const scrollPosition = (scrollHeight - clientHeight) / 2
            
            mainContainer.scrollTo({
              top: Math.max(0, scrollPosition),
              behavior: 'smooth'
            })
          } else {
            // Fallback to window scroll for desktop too
            const mainContent = document.querySelector('.max-w-7xl')
            if (mainContent) {
              const rect = mainContent.getBoundingClientRect()
              const windowHeight = window.innerHeight
              const scrollTop = window.pageYOffset + rect.top - (windowHeight / 2) + (rect.height / 2)
              
              window.scrollTo({
                top: Math.max(0, scrollTop),
                behavior: 'smooth'
              })
            }
          }
        }
      }
    }
    
    // Longer delay to ensure all content is loaded and rendered
    setTimeout(scrollToCenter, 500)
  }, [])

  // Remove result from search
  const removeResult = () => {
    setResult(null)
    toast.success('Result cleared!')
  }

  // Remove card from recent searches
  const removeFromRecent = (idToRemove) => {
    setRecent(prev => prev.filter(r => r.id !== idToRemove))
    toast.success('Card removed from recent searches!')
  }

  async function fetchResult() {
    if (!id) return toast.error('Please enter an ID (1-10)')
    const idNum = parseInt(id);
    if (idNum < 1 || idNum > 10) return toast.error('Please enter a valid ID between 1-10')
    
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      if (!res.ok) throw new Error('User not found. Please try ID 1-10')
      const data = await res.json()
      setResult(data)
      toast.success('Result fetched successfully! 🎉')
      setRecent(prev => [data, ...prev.filter(r => r.id !== data.id)].slice(0, 5))
      
      // Auto scroll recent searches to top after fetching
      setTimeout(() => {
        if (recentScrollRef.current) {
          recentScrollRef.current.scrollTop = 0
        }
      }, 100)
    } catch (e) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className={dark ? 'dark' : ''}>
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 3000,
            style: {
              background: dark ? '#1a1a1a' : '#ffffff',
              color: dark ? '#f9fafb' : '#1f2937',
              border: dark ? '1px solid #333' : '1px solid #e5e7eb',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              fontSize: '14px',
              fontWeight: '500',
            },
          }}
        />
        
        {/* Modern Floating Navbar - Optimized Sizing */}
        <nav className="fixed top-4 sm:top-6 left-0 w-full z-50 flex justify-center items-center pointer-events-none px-4">
          <div className="w-[90%] h-[56px] md:w-[70%] flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl sm:rounded-3xl shadow-xl bg-white/95 dark:bg-gray-900/95 border border-white/30 dark:border-gray-800/30 backdrop-blur-2xl pointer-events-auto transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group">
            
            {/* Left Side - Logo and Brand */}
            <div className="flex items-center  sm:gap-3">
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-transparent flex items-center justify-center transition-all duration-300 group-hover:scale-105 aspect-square">
                  <span className="dark:text-white text-xl sm:text-2xl font-bold italic" style={{fontFamily: 'Amatic SC, cursive'}}>SF</span>
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="font-bold text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent tracking-tight select-none leading-tight">
                  SnapFetch
                </span>
              </div>
            </div>

            {/* Right Side - Theme Toggle and Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={() => setDark(d => !d)}
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-blue-100 hover:to-purple-100 dark:hover:from-yellow-900 dark:hover:to-orange-900 text-sm sm:text-base transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:scale-105 shadow-md group/btn flex items-center justify-center aspect-square"
                title="Toggle theme"
                aria-label="Toggle theme"
              >
                <div className="relative z-10">
                  {dark ? (
                    <i className="fa-solid fa-sun text-yellow-500 group-hover/btn:text-yellow-400 transition-colors"></i>
                  ) : (
                    <i className="fa-solid fa-moon text-gray-600 group-hover/btn:text-gray-700 transition-colors"></i>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-yellow-400/20 dark:to-orange-400/20 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </nav>

        {/* Main Container - Fixed 100vh */}
        <div className=" bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-800 dark:text-gray-100 transition-all duration-700 pt-16 sm:pt-20 lg:pt-24 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-40 right-10 sm:right-20 w-40 h-40 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-20 left-1/3 w-36 h-36 sm:w-56 sm:h-56 lg:w-80 lg:h-80 bg-pink-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
          </div>

          <div className="relative z-10 min-h-screen overflow-y-auto main-container">
            {/* Main Layout Container */}
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                
                {/* Left Side - Search Section */}
                <div className="flex flex-col justify-center space-y-6 sm:space-y-8 lg:space-y-10">
                  {/* Hero Section */}
                  <section className="text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-black/5 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 mb-4 sm:mb-6 lg:mb-8">
                      <i className="fa-solid fa-sparkles text-blue-500 text-sm sm:text-base"></i>-
                      <span className="text-xs sm:text-sm font-medium text-gray-700  dark:text-gray-300">Modern Result Checker</span>-
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-yellow-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent mb-3 sm:mb-4 lg:mb-6 leading-tight">
                      Result Checker
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                      Enter an ID to instantly fetch and display user details with our modern, 
                      lightning-fast interface
                    </p>
                  </section>

                  {/* Search Form - Mobile Optimized */}
                  <section className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/30 dark:border-gray-800/30 p-4 sm:p-6 lg:p-8 transition-all duration-500 hover:shadow-3xl">
                    <form className="space-y-4 sm:space-y-6" onSubmit={e => { e.preventDefault(); fetchResult(); }}>
                      <div>
                        <label htmlFor="snapfetch-id" className="block mb-2 sm:mb-3 lg:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base lg:text-lg">
                          <i className="fa-solid fa-id-card mr-2 sm:mr-3 text-blue-500"></i>
                          Enter User ID
                        </label>
                        
                        {/* Mobile Optimized Search Input */}
                        <div className="flex flex-col-reverse sm:flex-row-reverse items-center gap-3 sm:gap-4">
                          <button
                            type="submit"
                            className="w-full sm:w-auto flex justify-center items-center w-12 h-12 flex-shrink-0 p-3 sm:p-4 lg:p-6 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-yellow-500 dark:via-orange-500 dark:to-red-500 text-white font-bold text-sm sm:text-base lg:text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-400/30 dark:focus:ring-yellow-400/30 transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100 group"
                            disabled={loading}
                          >
                            {loading ? (
                              <i className="fa-solid fa-spinner fa-spin text-base sm:text-lg lg:text-xl"></i>
                            ) : (
                              <i className="fa-solid fa-download text-base sm:text-lg lg:text-xl group-hover:scale-110 transition-transform"></i>
                            )}
                          </button>
                          
                          <input
                            id="snapfetch-id"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            min="1"
                            max="10"
                            value={id}
                            onChange={e => setId(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="Enter ID (1-10)"
                            className="w-full p-4 sm:p-6 lg:p-4 rounded-xl sm:rounded-2xl border-2 border-gray-200/50 dark:border-gray-600/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-400/20 dark:focus:ring-yellow-400/20 focus:border-blue-400 dark:focus:border-yellow-400 transition-all text-sm sm:text-base lg:text-lg shadow-lg placeholder:text-gray-400 dark:placeholder:text-gray-500 hover:shadow-xl font-medium"
                            autoComplete="off"
                          />
                        </div>
                        
                        {/* Fetch Button Text */}
                        <div className="mt-2 sm:mt-3 text-center">
                          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {loading ? 'Fetching Result...' : 'Click the button to fetch result'}
                          </span>
                        </div>
                      </div>
                    </form>

                    {result && (
                      <div className="mt-6 sm:mt-8 lg:mt-10 animate-fade-in">
                        <div className="flex justify-center relative">
                          <ResultCard result={result} />
                          <button
                            onClick={removeResult}
                            className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
                            title="Remove result"
                          >
                            <i className="fa-solid fa-times text-xs sm:text-sm"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </section>
                </div>

                {/* Right Side - Cards Section - Mobile Optimized */}
                <div className="flex flex-col h-full">
                  <div className="text-center mb-4 sm:mb-6 lg:mb-8 flex-shrink-0">
                    <div className="inline-flex items-center gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-6">
                      <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
                        <i className="fa-solid fa-clock mr-2 sm:mr-3"></i>
                        Recent Searches
                      </h2>
                      <div className="w-8 sm:w-12 lg:w-16 h-px bg-gradient-to-r from-blue-200 to-purple-200 dark:from-yellow-800 dark:to-orange-800"></div>
                    </div>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400">Your recently fetched user results</p>
                  </div>
                  
                  {/* Mobile Optimized Scrollable Cards Container */}
                  <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 lg:pr-4 min-h-0 cards-scroll-container" style={{maxHeight: 'calc(100vh )'}} ref={recentScrollRef}>
                    {recent.length > 0 ? (
                      <div className="space-y-4 sm:space-y-6 pb-4 sm:pb-6">
                        {recent.map((r, index) => (
                          <div 
                            key={r.id} 
                            className="flex justify-center animate-slide-in-right"
                            style={{ animationDelay: `${index * 150}ms` }}
                          >
                            <ResultCard result={r} compact onRemove={removeFromRecent} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]">
                        <div className="text-center text-gray-500 dark:text-gray-400 animate-fade-in">
                          <i className="fa-solid fa-search text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 opacity-50"></i>
                          <p className="text-sm sm:text-base lg:text-lg mb-2">No recent searches</p>
                          <p className="text-xs sm:text-sm">Search for a user (ID 1-10) to see results here</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Optimized Footer */}
            <footer className="mt-6 sm:mt-8 lg:mt-12 text-center py-3 sm:py-4 px-4 sm:px-6 bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm border-t border-white/20 dark:border-gray-800/20">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <span className="hidden sm:inline">Built with</span>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="flex items-center gap-1 text-blue-500 font-medium">
                    <i className="fa-brands fa-react text-sm sm:text-base"></i>
                    <span className="hidden sm:inline">React</span>
                  </span>
                  <span className="hidden sm:inline">+</span>
                  <span className="text-purple-500 font-medium">
                    <span className="hidden sm:inline">Tailwind</span>
                  </span>
                  <span className="hidden sm:inline">·</span>
                  <span className="text-green-500 font-medium">
                    <span className="hidden sm:inline">JSONPlaceholder</span>
                  </span>
                </div>
                <span className="sm:hidden text-xs text-gray-500 dark:text-gray-500">SnapFetch App</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

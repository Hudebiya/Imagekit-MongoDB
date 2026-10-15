import React, { useState } from 'react';
import './AuthForm.css';

export default function AuthForm({ onLoginSuccess }) {
  // Overlay sliding state (false = Sign In, true = Sign Up)
  const [isSignUp, setIsSignUp] = useState(false);

  // Dark / Light Mode state
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Password eye toggle states
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  // Form input states
  const [signInData, setSignInData] = useState({ email: '', password: '', rememberMe: false });
  const [signUpData, setSignUpData] = useState({ fullName: '', email: '', password: '', agreeTerms: false });

  // 1. Sign In Submit -> Dashboard Redirect
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    console.log('Signing in:', signInData);

    if (onLoginSuccess) {
      onLoginSuccess(signInData);
    } else {
      // Agar React Router use kar rahe hain to: navigate('/dashboard')
      // Otherwise browser redirect:
      window.location.href = '/dashboard';
    }
  };

  // 2. Sign Up Submit -> Dashboard Redirect
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!signUpData.agreeTerms) {
      alert('Please agree to the Terms & Privacy Policy to continue.');
      return;
    }

    console.log('Creating account:', signUpData);

    if (onLoginSuccess) {
      onLoginSuccess(signUpData);
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className={`auth-page ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Single Fixed Aesthetic Background */}
      <div className="background-overlay"></div>
      <div className="background-image"></div>

      {/* Header with Brand & Dark/Light Mode Button */}
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
              <path d="M2 2l7.586 7.586"></path>
              <circle cx="11" cy="11" r="2"></circle>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">AuraNotes</span>
            <span className="brand-tagline">Thoughts &amp; Ideas Sanctuary</span>
          </div>
        </div>

        {/* Simple Light / Dark Mode Toggle Button */}
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? (
            <>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </header>

      {/* Main Dual Overlay Container */}
      <main className="main-wrapper">
        
        {/* Floating Pinned Note */}
        <div className="sticky-note">
          <div className="pin"></div>
          <div className="sticky-tag">Daily Inspiration</div>
          <p className="sticky-quote">“Fill your paper with the breathings of your heart.”</p>
          <span className="sticky-author">— William Wordsworth</span>
        </div>

        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>

          {/* ================= SIGN UP FORM ================= */}
          <div className="form-container sign-up-container">
            <form onSubmit={handleSignUpSubmit}>
              <div className="form-header">
                <span className="pill-badge">✨ Free Lifetime Journal</span>
                <h2>Create Notebook</h2>
                <p className="form-desc">Join thousands of writers, thinkers &amp; creators.</p>
              </div>

              {/* Social Buttons */}
              <div className="social-container">
                <button type="button" className="social-btn" title="Sign up with Google">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="#EA4335" d="M12 5c1.54 0 2.93.57 4.02 1.51l3.01-3.01C17.21 1.77 14.77 1 12 1 7.42 1 3.53 3.63 1.67 7.47l3.66 2.84C6.21 7.23 8.87 5 12 5z"/>
                    <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.71 2.88c2.16-1.99 3.41-4.91 3.41-8.7z"/>
                    <path fill="#FBBC05" d="M5.33 14.69c-.23-.69-.36-1.42-.36-2.19s.13-1.5.36-2.19L1.67 7.47C.6 9.61 0 12 0 12.5s.6 2.89 1.67 5.03l3.66-2.84z"/>
                    <path fill="#34A853" d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.71-2.88c-1.08.72-2.45 1.16-4.22 1.16-3.13 0-5.79-2.23-6.67-5.31L1.67 15.9C3.53 19.74 7.42 22.4 12 22.4z"/>
                  </svg>
                  <span>Google</span>
                </button>
                <button type="button" className="social-btn" title="Sign up with Apple">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.08 1.73-.95 2.75 1.01.08 2.05-.5 2.67-1.25z"/>
                  </svg>
                  <span>Apple</span>
                </button>
              </div>

              <div className="divider">
                <span>or sign up with email</span>
              </div>

              {/* Full Name */}
              <div className="input-group">
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={signUpData.fullName}
                  onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                  required
                />
              </div>

              {/* Email */}
              <div className="input-group">
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="Email address"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                  required
                />
              </div>

              {/* Password (Bars completely removed) */}
              <div className="input-group">
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  type={showSignUpPassword ? 'text' : 'password'}
                  placeholder="Create password"
                  value={signUpData.password}
                  onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                  aria-label="Toggle password"
                >
                  {showSignUpPassword ? (
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>

              {/* Agree to Terms */}
              <label className="custom-checkbox terms-checkbox">
                <input
                  type="checkbox"
                  checked={signUpData.agreeTerms}
                  onChange={(e) => setSignUpData({ ...signUpData, agreeTerms: e.target.checked })}
                  required
                />
                <span className="checkmark"></span>
                <span className="checkbox-text">
                  I agree to the <a href="#terms">Terms</a> &amp; <a href="#privacy">Privacy Policy</a>
                </span>
              </label>

              {/* Submit Button -> Redirects to Dashboard */}
              <button type="submit" className="submit-btn">
                <span>Create Notebook &amp; Open Dashboard</span>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              {/* Mobile Switch */}
              <p className="mobile-switch-link">
                Already have a notebook?{' '}
                <button type="button" onClick={() => setIsSignUp(false)}>Sign In</button>
              </p>
            </form>
          </div>

          {/* ================= SIGN IN FORM ================= */}
          <div className="form-container sign-in-container">
            <form onSubmit={handleSignInSubmit}>
              <div className="form-header">
                <span className="pill-badge">✨ Welcome Back</span>
                <h2>Open Your Journal</h2>
                <p className="form-desc">Pick up right where your thoughts left off.</p>
              </div>

              {/* Social Buttons */}
              <div className="social-container">
                <button type="button" className="social-btn" title="Sign in with Google">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="#EA4335" d="M12 5c1.54 0 2.93.57 4.02 1.51l3.01-3.01C17.21 1.77 14.77 1 12 1 7.42 1 3.53 3.63 1.67 7.47l3.66 2.84C6.21 7.23 8.87 5 12 5z"/>
                    <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.71 2.88c2.16-1.99 3.41-4.91 3.41-8.7z"/>
                    <path fill="#FBBC05" d="M5.33 14.69c-.23-.69-.36-1.42-.36-2.19s.13-1.5.36-2.19L1.67 7.47C.6 9.61 0 12 0 12.5s.6 2.89 1.67 5.03l3.66-2.84z"/>
                    <path fill="#34A853" d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.71-2.88c-1.08.72-2.45 1.16-4.22 1.16-3.13 0-5.79-2.23-6.67-5.31L1.67 15.9C3.53 19.74 7.42 22.4 12 22.4z"/>
                  </svg>
                  <span>Google</span>
                </button>
                <button type="button" className="social-btn" title="Sign in with Apple">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.08 1.73-.95 2.75 1.01.08 2.05-.5 2.67-1.25z"/>
                  </svg>
                  <span>Apple</span>
                </button>
              </div>

              <div className="divider">
                <span>or sign in with email</span>
              </div>

              {/* Email */}
              <div className="input-group">
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="Email address"
                  value={signInData.email}
                  onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                  required
                />
              </div>

              {/* Password */}
              <div className="input-group">
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  type={showSignInPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={signInData.password}
                  onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowSignInPassword(!showSignInPassword)}
                  aria-label="Toggle password"
                >
                  {showSignInPassword ? (
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>

              {/* Remember me & Forgot Password */}
              <div className="form-extra-row">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={signInData.rememberMe}
                    onChange={(e) => setSignInData({ ...signInData, rememberMe: e.target.checked })}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">Keep me signed in</span>
                </label>
                <a href="#forgot" className="forgot-link">Forgot password?</a>
              </div>

              {/* Submit Button -> Redirects to Dashboard */}
              <button type="submit" className="submit-btn">
                <span>Open Notes Dashboard</span>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              {/* Mobile Switch */}
              <p className="mobile-switch-link">
                New to AuraNotes?{' '}
                <button type="button" onClick={() => setIsSignUp(true)}>Create Notebook</button>
              </p>
            </form>
          </div>

          {/* ================= SLIDING OVERLAY ================= */}
          <div className="overlay-container">
            <div className="overlay">
              
              {/* Left Overlay (Shown in Sign Up mode) */}
              <div className="overlay-panel overlay-left">
                <div className="overlay-badge">
                  <span>📖 Personal Diary &amp; Notes</span>
                </div>
                <h1>Welcome Back, Thinker!</h1>
                <p className="overlay-desc">
                  Your journals, brainstorms, and pinned thoughts are safely waiting for you. Log in to continue your writing flow.
                </p>
                <div className="overlay-stats">
                  <div className="stat-item">
                    <span className="stat-num">100%</span>
                    <span className="stat-lbl">Private</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <span className="stat-num">Instant</span>
                    <span className="stat-lbl">Syncing</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <span className="stat-num">Markdown</span>
                    <span className="stat-lbl">Ready</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => setIsSignUp(false)}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  <span>Back to Sign In</span>
                </button>
              </div>

              {/* Right Overlay (Shown in Sign In mode) */}
              <div className="overlay-panel overlay-right">
                <div className="overlay-badge">
                  <span>✒️ Where Ideas Grow</span>
                </div>
                <h1>Begin Your Note Journey</h1>
                <p className="overlay-desc">
                  Capture quick thoughts, write deep essays, draft project ideas, and organize your life with ease.
                </p>
                <div className="overlay-features">
                  <div className="feat-item">
                    <span className="feat-dot">✦</span>
                    <span>Rich text &amp; distraction-free writing</span>
                  </div>
                  <div className="feat-item">
                    <span className="feat-dot">✦</span>
                    <span>Organized tags, folders &amp; color notes</span>
                  </div>
                  <div className="feat-item">
                    <span className="feat-dot">✦</span>
                    <span>End-to-end encrypted notes storage</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => setIsSignUp(true)}
                >
                  <span>Create Free Account</span>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
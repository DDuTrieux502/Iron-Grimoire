import React, { Component, useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Crash shield for an installed PWA: a render error must never leave the user
// staring at a blank screen with no URL bar to escape from. Styles are inline
// and self-contained — App (and its style object) may be what just broke.
class GrimoireErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    console.error('Iron Grimoire render crash:', error, info)
  }
  render() {
    if (!this.state.error) return this.props.children
    const wrap = { minHeight: '100vh', background: '#0a0a0f', color: '#d4c9a8', fontFamily: "'Crimson Text','Palatino Linotype',serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '32px 24px' }
    return (
      <div style={wrap}>
        <div style={{ fontSize: '44px', color: '#c4a96a', marginBottom: '16px' }}>◆</div>
        <h1 style={{ fontSize: '22px', fontWeight: 400, letterSpacing: '4px', color: '#e8dcc8', textTransform: 'uppercase', margin: '0 0 12px 0' }}>The Grimoire Flickers</h1>
        <p style={{ fontSize: '15px', color: '#8b7a5e', lineHeight: 1.7, maxWidth: '340px', margin: '0 0 20px 0' }}>
          Something broke while rendering. Your data is safe — it lives on this device and was not touched.
        </p>
        <button
          style={{ padding: '14px 36px', background: 'linear-gradient(135deg,rgba(139,122,94,0.15),rgba(196,169,106,0.15))', border: '1px solid rgba(196,169,106,0.3)', borderRadius: '10px', color: '#c4a96a', fontFamily: 'inherit', fontSize: '15px', letterSpacing: '3px', cursor: 'pointer', textTransform: 'uppercase' }}
          onClick={() => window.location.reload()}
        >
          ↻ Reload
        </button>
        <p style={{ fontSize: '11px', color: '#4a4236', marginTop: '24px', maxWidth: '340px', wordBreak: 'break-word' }}>
          {String(this.state.error?.message || this.state.error)}
        </p>
      </div>
    )
  }
}

// Listens for storage write failures dispatched by save() in App.jsx and
// surfaces them — silent data loss is the one unforgivable sin for a tracker.
function SaveErrorToast() {
  const [msg, setMsg] = useState(null)
  useEffect(() => {
    const onErr = (e) => setMsg(e.detail || 'Could not write to storage')
    window.addEventListener('grimoire:save-error', onErr)
    return () => window.removeEventListener('grimoire:save-error', onErr)
  }, [])
  useEffect(() => {
    if (!msg) return
    const t = setTimeout(() => setMsg(null), 8000)
    return () => clearTimeout(t)
  }, [msg])
  if (!msg) return null
  return (
    <div style={{ position: 'fixed', top: '12px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, maxWidth: '440px', width: 'calc(100% - 32px)', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: 'rgba(46,18,18,0.97)', border: '1px solid rgba(196,90,90,0.45)', borderRadius: '10px', color: '#e0a8a0', fontFamily: "'Crimson Text','Palatino Linotype',serif", fontSize: '14px', boxShadow: '0 8px 30px rgba(0,0,0,0.6)' }}>
      <span style={{ fontSize: '16px' }}>⚠</span>
      <span style={{ flex: 1, lineHeight: 1.5 }}>{msg} — your last change was <b>not</b> saved.</span>
      <button style={{ background: 'none', border: 'none', color: 'rgba(224,168,160,0.7)', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', padding: '4px' }} onClick={() => setMsg(null)}>✕</button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GrimoireErrorBoundary>
      <App />
      <SaveErrorToast />
    </GrimoireErrorBoundary>
  </React.StrictMode>
)

// Register the service worker for offline + installability (production only,
// so the Vite dev server and HMR are never intercepted by a cached shell).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}

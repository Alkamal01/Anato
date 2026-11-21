import { useEffect, useRef, useState } from 'react'
const glyph = (symbol) => function Glyph({ size = 16 }) {
  return <span className="glyph" style={{ fontSize: size }} aria-hidden="true">{symbol}</span>
}
const ArrowUpRight = glyph('↗')
const BookOpen = glyph('▤')
const Camera = glyph('◉')
const Globe2 = glyph('◎')
const Menu = glyph('☰')
const ShieldCheck = glyph('✓')
const Sparkles = glyph('✦')
const X = glyph('×')

const engineTheme = `
  :root { --bg:#071f2b !important; --panel:#0f3040 !important; --line:#285062 !important; --fg:#eef8f3 !important; --dim:#9bb5b6 !important; --accent:#8bd144 !important; --ok:#8bd144 !important; --bad:#ff8291 !important; }
  html,body { background:#071f2b !important; }
  .wrap { gap:24px !important; padding:24px !important; }
  .stage { border-color:#285062 !important; border-radius:22px !important; background:radial-gradient(ellipse at 50% 40%, #153848, #061720 75%) !important; }
  aside { flex-basis:350px !important; }
  aside > h1 { font-size:27px !important; letter-spacing:-.03em !important; }
  .panel { border-radius:18px !important; border-color:#285062 !important; box-shadow:0 14px 35px rgba(0,0,0,.16) !important; }
  .panel h3 { color:#8bd144 !important; }
  button.big { background:#8bd144 !important; border-radius:999px !important; }
  .chips button, .seg button, select { border-radius:999px !important; }
  .seg button.on { background:#8bd144 !important; }
  .lesson { border-color:rgba(139,209,68,.55) !important; }
  html, body { overflow:hidden !important; }
  .wrap { height:100vh !important; overflow:hidden !important; }
  .stagecol { position:sticky !important; top:0 !important; align-self:flex-start !important; }
  aside { max-height:calc(100vh - 48px) !important; overflow-y:auto !important; scrollbar-color:#8bd144 #0f3040 !important; }
  @media(max-width:900px){ html, body { overflow:auto !important; } .wrap { height:auto !important; overflow:visible !important; padding:14px !important; } aside { max-height:none !important; overflow:visible !important; } .stagecol { position:relative !important; } }
`

export default function App() {
  const frameRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const isExplorePage = window.location.pathname === '/explore'

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const rebrandEngine = () => {
      const doc = frame.contentDocument
      if (!doc) return
      const style = doc.createElement('style')
      style.textContent = engineTheme
      doc.head.appendChild(style)
      doc.title = 'Anato · Keuro Lab'
      const title = doc.querySelector('aside h1')
      const creator = doc.querySelector('aside > p.small')
      const intro = doc.querySelector('#intro h2')
      if (title) title.textContent = 'Anato'
      if (creator) creator.textContent = 'By Keuro Lab · Interactive anatomy learning'
      if (intro) intro.textContent = 'ANATO'
    }
    frame.addEventListener('load', rebrandEngine)
    return () => frame.removeEventListener('load', rebrandEngine)
  }, [])

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Anato by Keuro Lab">
          <span className="brand-mark"><img src="/keuro-logo.png" alt="Keuro Lab" /></span>
          <span className="brand-divider" aria-hidden="true" />
          <span className="anato-mark"><img src="/anato-logo.svg" alt="Anato" /></span>
          <span><b>Anato</b><small>by Keuro Lab</small></span>
        </a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href={isExplorePage ? '/#learn' : '#learn'} onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="/explore" onClick={() => setMenuOpen(false)}>Explore</a>
          <a href={isExplorePage ? '/#about' : '#about'} onClick={() => setMenuOpen(false)}>About Anato</a>
        </nav>
        <div className="top-actions">
          <a className="outline-button desktop-only" href="/explore">Launch experience <ArrowUpRight size={15} /></a>
          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="top">
        {isExplorePage ? <ExplorePage frameRef={frameRef} /> : <LandingPage />}
      </main>
      <footer><span>© {new Date().getFullYear()} Keuro Lab</span><span>Anato · Interactive anatomy learning</span></footer>
    </div>
  )
}

function LandingPage() {
  return <>
        <section className="hero" id="about">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> A Keuro Lab learning project</div>
            <h1>See the human body<br /><em>in a new way.</em></h1>
            <p>Anato turns your camera into an interactive anatomy lesson. Explore bones, brain regions, eyes, and facial muscles while learning what each structure does.</p>
            <div className="hero-actions">
              <a className="primary-button" href="/explore"><Camera size={17} /> Start exploring</a>
              <a className="text-link" href="#learn">How it works <ArrowUpRight size={16} /></a>
            </div>
            <div className="trust-row"><span><ShieldCheck size={15} /> Educational, not diagnostic</span><span><Globe2 size={15} /> English + Hausa</span></div>
          </div>
          <div className="hero-card">
            <div className="hero-card-glow" />
            <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
            <div className="hero-card-content"><BookOpen size={21} /><span>Interactive anatomy</span><strong>Learn by seeing.</strong></div>
          </div>
        </section>

        <section className="feature-strip" id="learn">
          <div><span className="feature-number">01</span><h2>Point and learn</h2><p>Turn on labels and click any visible structure for a simple explanation.</p></div>
          <div><span className="feature-number">02</span><h2>Explore in layers</h2><p>Move from the skull to the brain, eyes, muscles, and hand bones.</p></div>
          <div><span className="feature-number">03</span><h2>Test yourself</h2><p>Use the built-in learning check to reinforce what you have discovered.</p></div>
        </section>

        <section className="closing-section">
          <span className="eyebrow">Built for classrooms, clubs, and curious minds</span>
          <h2>Learning is better when<br /><em>you can see it.</em></h2>
          <p>Anato is part of Keuro Lab’s work to make technology and learning more accessible for African communities.</p>
          <a className="primary-button closing-button" href="/explore">Open the learning experience <ArrowUpRight size={16} /></a>
        </section>
  </>
}

function ExplorePage({ frameRef }) {
  return <section className="explore-page">
    <div className="engine-frame"><iframe ref={frameRef} title="Anato interactive anatomy experience" src="/anato-engine.html" /></div>
  </section>
}

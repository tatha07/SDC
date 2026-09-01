import { useState } from 'react';
import { Link } from 'react-router-dom';
import Marquee from '../components/Marquee.jsx';
import Terminal from '../components/Terminal.jsx';
import LeadCard from '../components/LeadCard.jsx';
import AnnouncementPopup, { SEEN_KEY } from '../components/AnnouncementPopup.jsx';
import AnnouncementBanner from '../components/AnnouncementBanner.jsx';
import { stats, features, eventPhotos, clubLead, panel, upcomingEvent } from '../data/content.js';

// The president already has a card in the about section, so only show the rest here.
const restOfPanel = panel.filter((p) => p && p.name && p !== clubLead);

// Figures out, synchronously and before first paint, whether the pop-up has
// anything left to do this session. If it doesn't (already shown earlier, or
// the announcement is switched off), the hero-side banner can render right
// away instead of waiting on the pop-up's onDone callback.
function popupAlreadyDone() {
  if (!upcomingEvent?.active) return true;
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function Home() {
  const [popupDone, setPopupDone] = useState(popupAlreadyDone);

  return (
    <>
      <AnnouncementPopup announcement={upcomingEvent} onDone={() => setPopupDone(true)} />

      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="dot" /> Software Development Community — VIT
            </p>
            <h1>
              We build software, and the <span className="accent">people</span> who write it.
            </h1>
            <p className="hero-lead">
              SDC is VITBs technical club. We run workshops on Git, DSA, and applied AI, build projects together,
              and keep a community where getting good at the craft is the whole point.
            </p>
            <div className="hero-actions">
              <Link to="/events" className="btn btn-solid">
                See our work <span className="arrow">→</span>
              </Link>
              <Link to="/workshops" className="btn btn-line">
                Workshops
              </Link>
            </div>

            <ul className="meta-strip">
              {stats.map((s) => (
                <li key={s.label}>
                  <span className="m-val">{s.value}</span>
                  <span className="m-lab">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-side">
            <Terminal />
            {popupDone && <AnnouncementBanner announcement={upcomingEvent} variant="side" />}
          </div>
        </div>
      </section>

      <div className="strip-wrap">
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 24 }}>
            <span className="idx">//</span> from the sessions
          </p>
        </div>
        <Marquee slides={eventPhotos} />
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">
              <span className="idx">//</span> why sdc
            </p>
            <h2>No gatekeeping, no filler. Just the work.</h2>
          </div>
          <div className="feature-grid">
            {features.map((f, i) => (
              <article key={f.title} className="feature">
                <span className="feature-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about">
          <div className="about-copy">
            <p className="eyebrow">
              <span className="idx">//</span> about
            </p>
            <h2>The best technical club on campus — and still shipping.</h2>
            <p>
              SDC brings together students who love code, community, and building things that work. We run hands-on
              workshops, ship projects as a group, and connect members through hackathons, tech talks, and
              mentorship. Show up, build something, stick around.
            </p>
          </div>
          <LeadCard person={clubLead} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">
              <span className="idx">//</span> the panel
            </p>
            <h2>Who keeps it running.</h2>
            <p className="section-lead">
              Alongside the president, these three run operations, logistics, and the day-to-day of the club.
            </p>
          </div>
          <div className="panel-grid">
            {restOfPanel.map((p) => (
              <LeadCard key={p.name} person={p} />
            ))}
          </div>
          <div className="link-row">
            <Link to="/panel">Meet the full panel ↗</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ borderBottom: 'none' }}>
        <div className="container">
          <div className="cta">
            <div>
              <h2>Want in?</h2>
              <p>New members join every semester. Send us a repo you’re proud of and tell us what you built.</p>
            </div>
            <Link to="https://www.instagram.com/sdcvitb/" className="btn btn-solid">
              Join SDC <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
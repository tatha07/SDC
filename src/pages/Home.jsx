import { Link } from 'react-router-dom';
import Marquee from '../components/Marquee.jsx';
import Terminal from '../components/Terminal.jsx';
import { stats, features, eventPhotos, clubLead } from '../data/content.js';

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function Home() {
  return (
    <>
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

          <Terminal />
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
          <div className="lead-card">
            <div className="lead-top">
              <div className="avatar">
                {clubLead.photo ? <img src={clubLead.photo} alt={clubLead.name} /> : initials(clubLead.name)}
              </div>
              <div>
                <div className="lead-name">{clubLead.name}</div>
                <div className="lead-title">{clubLead.title}</div>
              </div>
            </div>
            <p>{clubLead.description}</p>
            <div className="link-row">
              <a href={clubLead.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a href={clubLead.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            </div>
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
            <Link to="https://www.linkedin.com/company/sdcvitb/posts/" className="btn btn-solid">
              Join SDC <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

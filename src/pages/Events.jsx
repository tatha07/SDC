import Marquee from '../components/Marquee.jsx';
import AnnouncementBanner from '../components/AnnouncementBanner.jsx';
import { eventPhotos, upcomingEvent } from '../data/content.js';

const highlights = [
  {
    title: 'Git Collaboration Workshop',
    body: 'A studio-style session on version control — branching, merging, and real pull-request workflows.',
  },
  {
    title: 'DSA Sprint Series',
    body: 'Three to four sessions of mentor-guided problem solving, from arrays to dynamic programming.',
  },
  {
    title: 'LangChain & LangGraph Lab',
    body: 'A modern AI workshop on building agentic, knowledge-augmented developer tools.',
  },
];

function Events() {
  const half = Math.ceil(eventPhotos.length / 2);
  const rowA = eventPhotos.slice(0, half);
  const rowB = eventPhotos.slice(half).concat(eventPhotos.slice(0, half));

  return (
    <section className="section page-head" style={{ borderBottom: 'none' }}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">
            <span className="idx">//</span> events
          </p>
          <h2>Photos from the sessions.</h2>
        </div>
        <AnnouncementBanner announcement={upcomingEvent} variant="compact" />
      </div>

      <div className="container">
        <div className="event-strips">
          <Marquee slides={rowA} />
          <Marquee slides={rowB} reverse />
        </div>

        <div className="highlight-grid">
          {highlights.map((h, i) => (
            <article key={h.title} className="feature">
              <span className="feature-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{h.title}</h3>
              <p>{h.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;
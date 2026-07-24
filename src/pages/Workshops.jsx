import { workshops } from '../data/content.js';

function Workshops() {
  return (
    <section className="section page-head" style={{ borderBottom: 'none' }}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">
            <span className="idx">//</span> workshops
          </p>
          <h2>Three tracks. All hands-on.</h2>
          <p className="section-lead">
            Our core technical sessions take students from fundamentals to something they can actually build with —
            no slides read aloud.
          </p>
        </div>

        <div className="workshop-grid">
          {workshops.map((w, i) => (
            <article key={w.title} className="workshop">
              <div className="workshop-top">
                <span className="workshop-idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="badge">
                  {w.sessions} session{w.sessions === 1 ? '' : 's'}
                </span>
              </div>
              <h3>{w.title}</h3>
              <p>{w.summary}</p>
              <span className="workshop-label">Key takeaways</span>
              <ul>
                {w.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Workshops;

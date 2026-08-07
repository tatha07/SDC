import LeadCard from '../components/LeadCard.jsx';
import { panel } from '../data/content.js';

function Panel() {
  const members = panel.filter((p) => p && p.name);

  return (
    <section className="section page-head" style={{ borderBottom: 'none' }}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">
            <span className="idx">//</span> the panel
          </p>
          <h2>The people running SDC.</h2>
          <p className="section-lead">
            The core panel sets the direction, runs the calendar, and keeps every department moving.
          </p>
        </div>

        <div className="panel-grid">
          {members.map((p) => (
            <LeadCard key={p.name} person={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Panel;

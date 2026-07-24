import { departments } from '../data/content.js';

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function Person({ name, role }) {
  return (
    <div className="person">
      <div className="person-avatar" aria-hidden="true">
        {initials(name)}
      </div>
      <div>
        <div className="person-name">{name}</div>
        <div className="person-role">{role}</div>
      </div>
    </div>
  );
}

function Departments() {
  return (
    <section className="section page-head" style={{ borderBottom: 'none' }}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">
            <span className="idx">//</span> the team
          </p>
          <h2>Six departments, one club.</h2>
          <p className="section-lead">
            Everything SDC does runs on these teams — each with a lead and co-lead keeping things moving.
          </p>
        </div>

        <div className="dept-grid">
          {departments.map((d, i) => (
            <article key={d.name} className="dept">
              <div className="dept-top">
                <span className="dept-idx">{String(i + 1).padStart(2, '0')}</span>
                <h3>{d.name}</h3>
              </div>
              <p className="dept-blurb">{d.blurb}</p>
              <div className="dept-people">
                <Person name={d.lead} role="Lead" />
                <Person name={d.colead} role="Co-lead" />
              </div>
              <div className="link-row">
                <a href={d.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
                <a href={d.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Departments;

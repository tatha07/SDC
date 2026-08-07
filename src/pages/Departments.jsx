import { departments } from '../data/content.js';

function initials(name) {
  const parts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!parts.length) return '··';
  return parts
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

// Accepts either `coleads: ['A', 'B']` or the older `colead` / `colead_2` keys,
// and drops anything blank so an unfilled slot never renders (or crashes).
function peopleOf(d) {
  const coleads = [d.coleads, d.colead, d.colead_2]
    .flat()
    .map((n) => (typeof n === 'string' ? n.trim() : ''))
    .filter(Boolean);

  const lead = typeof d.lead === 'string' ? d.lead.trim() : '';

  return [
    ...(lead ? [{ name: lead, role: 'Lead' }] : []),
    ...coleads.map((name) => ({ name, role: 'Co-lead' })),
  ];
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
            Everything SDC does runs on these teams — each with a lead and co-leads keeping things moving.
          </p>
        </div>

        <div className="dept-grid">
          {departments.map((d, i) => {
            const people = peopleOf(d);
            const github = d.github || d.Lead_github;
            const linkedin = d.linkedin || d.Lead_linkedin;

            return (
              <article key={d.name} className="dept">
                <div className="dept-top">
                  <span className="dept-idx">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{d.name}</h3>
                </div>
                <p className="dept-blurb">{d.blurb}</p>
                <div className="dept-people">
                  {people.length ? (
                    people.map((p) => <Person key={`${p.role}-${p.name}`} name={p.name} role={p.role} />)
                  ) : (
                    <Person name="" role="" />
                  )}
                </div>
                {(github || linkedin) && (
                  <div className="link-row">
                    {github && (
                      <a href={github} target="_blank" rel="noreferrer">
                        Lead's GitHub ↗
                      </a>
                    )}
                    {linkedin && (
                      <a href={linkedin} target="_blank" rel="noreferrer">
                        Lead's LinkedIn ↗
                      </a>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Departments;

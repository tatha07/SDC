// Shared card for panel members — used on the home page and on /panel.
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

function LeadCard({ person }) {
  if (!person) return null;

  const { name, title, description, github, linkedin, photo } = person;

  return (
    <article className="lead-card">
      <div className="lead-top">
        <div className="avatar">{photo ? <img src={photo} alt={name} /> : initials(name)}</div>
        <div>
          <div className="lead-name">{name}</div>
          <div className="lead-title">{title}</div>
        </div>
      </div>
      {description ? <p>{description}</p> : null}
      {(github || linkedin) && (
        <div className="link-row">
          {github && (
            <a href={github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default LeadCard;

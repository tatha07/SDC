// Persistent version of the announcement — this is where the pop-up "lands"
// after it fades or gets closed, and it's reused as-is on the Events tab.
function AnnouncementBanner({ announcement, variant = 'default' }) {
  if (!announcement?.active) return null;

  return (
    <div className={`announce-banner announce-banner-${variant}`}>
      <span className="announce-banner-dot" />
      <div className="announce-banner-copy">
        <p className="announce-banner-eyebrow">
          <span className="announce-banner-badge">{announcement.badge}</span>
          {announcement.title}
        </p>
        <p className="announce-banner-detail">{announcement.detail || announcement.message}</p>
      </div>
      {announcement.ctaLabel && announcement.ctaHref && (
        <a
          href={announcement.ctaHref}
          target="_blank"
          rel="noreferrer"
          className="announce-banner-cta"
        >
          {announcement.ctaLabel} <span className="arrow">→</span>
        </a>
      )}
    </div>
  );
}

export default AnnouncementBanner;
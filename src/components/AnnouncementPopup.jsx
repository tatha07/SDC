import { useEffect, useRef, useState } from 'react';

const SEEN_KEY = 'sdc-announcement-seen';
const AUTO_DISMISS_MS = 5000;
const FADE_MS = 400;

// Fires once per session, right after landing on the home page: pops in,
// auto-fades after 5s, or can be closed early with the × button. Either way
// it hands off to the persistent <AnnouncementBanner /> already sitting on
// the page, so the update never fully disappears.
function AnnouncementPopup({ announcement }) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const timerRef = useRef(null);

  // Read "already shown this session" exactly once, up front — not inside the
  // effect. In dev, React 18 StrictMode runs effects twice (mount → cleanup →
  // mount again) to surface bugs; if we re-read sessionStorage inside the
  // effect, the first run's own write makes the second (surviving) run think
  // it was already shown, and the popup never actually appears.
  const alreadySeenRef = useRef(null);
  if (alreadySeenRef.current === null) {
    try {
      alreadySeenRef.current = sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {
      alreadySeenRef.current = false;
    }
  }

  useEffect(() => {
    if (!announcement?.active || alreadySeenRef.current) return undefined;

    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* ignore private-mode storage errors */
    }

    const raf = requestAnimationFrame(() => setVisible(true));
    timerRef.current = setTimeout(dismiss, AUTO_DISMISS_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [announcement?.active]);

  function dismiss() {
    clearTimeout(timerRef.current);
    setClosing(true);
    setTimeout(() => setVisible(false), FADE_MS);
  }

  if (!announcement?.active || !visible) return null;

  return (
    <div
      className={`announce-popup${closing ? ' is-closing' : ''}`}
      role="status"
      aria-live="polite"
    >
      <span className="announce-popup-dot" />
      <div className="announce-popup-copy">
        <p className="announce-popup-title">{announcement.title}</p>
        <p className="announce-popup-sub">{announcement.message}</p>
      </div>
      <button
        type="button"
        className="announce-popup-close"
        aria-label="Dismiss announcement"
        onClick={dismiss}
      >
        ×
      </button>
    </div>
  );
}

export default AnnouncementPopup;
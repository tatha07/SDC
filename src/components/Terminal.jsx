import { useEffect, useState } from 'react';

// A fake shell session — the club, described the way its members would describe it.
const SCRIPT = [
  { cls: 'prompt', text: '$ ' },
  { cls: 'cmd', text: 'whoami\n' },
  { cls: 'out', text: 'software development club — vitb\n\n' },
  { cls: 'prompt', text: '$ ' },
  { cls: 'cmd', text: 'mission.txt\n' },
  { cls: 'out', text: 'we build software, and the\npeople who write it.\n\n' },
  { cls: 'prompt', text: '$ ' },
  { cls: 'cmd', text: 'ls tracks/\n' },
  { cls: 'out', text: 'git/   dsa/   langchain/\n\n' },
  { cls: 'prompt', text: '$ ' },
  { cls: 'cmd', text: './join --now\n' },
  { cls: 'ok', text: 'see you at the next session' },
];

const FULL = SCRIPT.reduce((n, s) => n + s.text.length, 0);

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Terminal() {
  const [count, setCount] = useState(reduced ? FULL : 0);

  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= FULL) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 24);
    return () => clearInterval(id);
  }, []);

  // Render the script up to `count` characters, preserving per-segment colour.
  let remaining = count;
  const rendered = SCRIPT.map((seg, i) => {
    if (remaining <= 0) return null;
    const slice = seg.text.slice(0, remaining);
    remaining -= seg.text.length;
    return (
      <span key={i} className={`t-${seg.cls}`}>
        {slice}
      </span>
    );
  });

  return (
    <div className="term" aria-hidden="true">
      <div className="term-bar">
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="term-title">sdc — zsh</span>
      </div>
      <pre className="term-body">
        {rendered}
        <span className="caret" />
      </pre>
    </div>
  );
}

export default Terminal;

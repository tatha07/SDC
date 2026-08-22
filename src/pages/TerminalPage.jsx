import { useEffect, useRef, useState } from 'react';

// Exactly the copy the club wants shown when someone runs `sudo sdc`.
const ABOUT =
  "SDC positions itself as VIT's leading technical club, a hub where students " +
  'explore and build with technology beyond the classroom. Its identity centers ' +
  'on hands-on learning, bringing together developers, designers, and curious ' +
  'first-timers under one collaborative roof. The club’s activities span ' +
  'workshops and events aimed at sharpening practical skills, alongside a strong ' +
  'developer community that encourages peer learning, mentorship, and real project ' +
  'experience. This mix of structured sessions and informal collaboration seems ' +
  'designed to make technical growth feel accessible rather than intimidating. ' +
  'Beyond pure coding, SDC also emphasizes brand design, suggesting a broader ' +
  'creative dimension — where visual identity and communication matter as much ' +
  'as technical execution.';

const BANNER = String.raw`
 ███████╗██████╗  ██████╗
 ██╔════╝██╔══██╗██╔════╝
 ███████╗██║  ██║██║
 ╚════██║██║  ██║██║
 ███████║██████╔╝╚██████╗
 ╚══════╝╚═════╝  ╚═════╝`;

const HELP = [
  'available commands',
  '  sudo sdc     learn who we are',
  '  open         jump to the main site',
  '  ls           list what we run',
  '  whoami       current user',
  '  clear        wipe the screen',
  '  help         show this list',
].join('\n');

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The lines shown before the user has typed anything.
function boot() {
  return [
    { type: 'banner', text: BANNER },
    { type: 'sys', text: 'SDC OS  •  v2026.1  •  Software Development Club, VIT' },
    { type: 'hint', text: "type  sudo sdc  to get started · type  help  for commands" },
  ];
}

function TerminalPage({ onEnter }) {
  const enter = () => {
    if (typeof onEnter === 'function') onEnter();
  };

  const [history, setHistory] = useState(boot);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(null); // { text } currently being typed out
  const [shown, setShown] = useState(0); // chars of `pending` revealed so far
  const [launch, setLaunch] = useState(false);
  const [count, setCount] = useState(null); // redirect countdown

  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  const busy = pending !== null;

  // Typewriter reveal for the `sudo sdc` paragraph.
  useEffect(() => {
    if (!pending) return undefined;
    if (reduced) {
      setShown(pending.text.length);
    }
    if (shown >= pending.text.length) {
      setHistory((h) => [...h, { type: 'about', text: pending.text }]);
      setPending(null);
      setShown(0);
      setLaunch(true);
      return undefined;
    }
    const id = setTimeout(() => setShown((s) => Math.min(s + 3, pending.text.length)), 14);
    return () => clearTimeout(id);
  }, [pending, shown]);

  // Once the about text is on screen, count down and hand off to the main site.
  useEffect(() => {
    if (!launch) return undefined;
    setCount(12);
    const id = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(id);
          enter();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [launch]);

  // Keep the newest line in view.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, shown, launch, count]);

  function run(raw) {
    const cmd = raw.trim().replace(/^\$\s*/, '');
    const lower = cmd.toLowerCase();
    const echo = { type: 'cmd', text: cmd };

    if (lower === '') {
      setHistory((h) => [...h, echo]);
      return;
    }
    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      return;
    }
    if (lower === 'sudo sdc' || lower === 'sudo-sdc') {
      setHistory((h) => [
        ...h,
        echo,
        { type: 'sys', text: '[sudo] authenticating guest… access granted.' },
      ]);
      setShown(0);
      setPending({ text: ABOUT });
      return;
    }
    if (lower === 'sdc') {
      setHistory((h) => [
        ...h,
        echo,
        { type: 'err', text: 'sdc: permission denied — try:  sudo sdc' },
      ]);
      return;
    }
    if (lower === 'open' || lower === 'open sdc' || lower === 'launch' || lower === 'cd sdc') {
      setHistory((h) => [...h, echo, { type: 'sys', text: 'launching sdc.club …' }]);
      enter();
      return;
    }
    if (lower === 'help' || lower === 'sudo sdc --help') {
      setHistory((h) => [...h, echo, { type: 'out', text: HELP }]);
      return;
    }
    if (lower === 'ls' || lower === 'ls -la') {
      setHistory((h) => [
        ...h,
        echo,
        { type: 'out', text: 'events/   workshops/   departments/   community/' },
      ]);
      return;
    }
    if (lower === 'whoami') {
      setHistory((h) => [...h, echo, { type: 'out', text: 'guest' }]);
      return;
    }
    setHistory((h) => [
      ...h,
      echo,
      { type: 'err', text: 'command not found: ' + cmd + '  — try:  help' },
    ]);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (busy) return;
    run(input);
    setInput('');
  }

  function focusInput() {
    if (inputRef.current) inputRef.current.focus();
  }

  const prompt = (
    <>
      <span className="tp-user">guest@sdc</span>
      <span className="tp-path">:~$</span>
    </>
  );

  return (
    <div className="tp-screen" onClick={focusInput}>
      <div className="tp-window">
        <div className="tp-bar">
          <span className="tp-dot" />
          <span className="tp-dot" />
          <span className="tp-dot" />
          <span className="tp-bar-title">guest@sdc: ~</span>
        </div>

        <div className="tp-body" ref={bodyRef}>
          {history.map((line, i) => {
            if (line.type === 'banner') {
              return (
                <pre key={i} className="tp-banner">
                  {line.text}
                </pre>
              );
            }
            if (line.type === 'cmd') {
              return (
                <div key={i} className="tp-line">
                  {prompt} <span className="tp-cmd">{line.text}</span>
                </div>
              );
            }
            return (
              <pre key={i} className={`tp-out tp-${line.type}`}>
                {line.text}
              </pre>
            );
          })}

          {/* the paragraph mid-type */}
          {pending && (
            <pre className="tp-out tp-about">
              {pending.text.slice(0, shown)}
              <span className="tp-caret" />
            </pre>
          )}

          {/* handoff to the main site */}
          {launch && (
            <div className="tp-launch">
              <button type="button" className="tp-launch-btn" onClick={enter}>
                enter the site <span aria-hidden="true">&rarr;</span>
              </button>
              <span className="tp-launch-note">
                entering in {count}s…
              </span>
            </div>
          )}

          {/* live input */}
          {!busy && (
            <form className="tp-line tp-form" onSubmit={onSubmit}>
              {prompt}{' '}
              <input
                ref={inputRef}
                className="tp-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                aria-label="terminal input"
              />
              {input === '' && <span className="tp-caret" />}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default TerminalPage;

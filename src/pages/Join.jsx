import { useState } from 'react';
import { Link } from 'react-router-dom';

const EMPTY = {
  name: '',
  email: '',
  regNumber: '',
  repoUrl: '',
  project: '',
};

// Accepts github.com/user/repo with or without protocol, trailing slash, or .git
const REPO_RE = /^(https?:\/\/)?(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form) {
  const errors = {};

  if (!form.name.trim()) errors.name = 'Tell us your name.';
  if (!EMAIL_RE.test(form.email.trim())) errors.email = 'That email doesn’t look right.';
  if (!form.regNumber.trim()) errors.regNumber = 'Registration number is required.';

  const repo = form.repoUrl.trim().replace(/\.git$/i, '');
  if (!repo) errors.repoUrl = 'Paste a link to your repo.';
  else if (!REPO_RE.test(repo)) errors.repoUrl = 'Needs to be a github.com/user/repo link.';

  if (form.project.trim().length < 40) {
    errors.project = 'Give us at least a few sentences — 40 characters minimum.';
  }

  return errors;
}

function Join() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [serverError, setServerError] = useState('');

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const submit = async (e) => {
    e.preventDefault();

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    setServerError('');

    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          regNumber: form.regNumber.trim().toUpperCase(),
          repoUrl: form.repoUrl.trim().replace(/\.git$/i, ''),
          project: form.project.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setServerError(data.error || 'Something broke on our end. Try again in a minute.');
        setStatus('error');
        return;
      }

      setStatus('done');
    } catch {
      setServerError('Couldn’t reach the server. Check your connection and retry.');
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <section className="section page-head" style={{ borderBottom: 'none' }}>
        <div className="container">
          <div className="join-done">
            <p className="eyebrow">
              <span className="dot" /> application received
            </p>
            <h2>You’re in the queue, {form.name.split(' ')[0]}.</h2>
            <p className="section-lead">
              We read every submission. If your project lines up with what a department needs, someone from SDC
              will reach out at <code>{form.email.trim().toLowerCase()}</code>.
            </p>
            <div className="hero-actions">
              <Link to="/" className="btn btn-solid">
                Back home <span className="arrow">→</span>
              </Link>
              <Link to="/workshops" className="btn btn-line">
                See upcoming workshops
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const sending = status === 'sending';

  return (
    <section className="section page-head" style={{ borderBottom: 'none' }}>
      <div className="container join-layout">
        <div className="join-intro">
          <p className="eyebrow">
            <span className="idx">//</span> join sdc
          </p>
          <h2>Show us something you built.</h2>
          <p className="section-lead">
            No resumes, no aptitude rounds. Drop a GitHub repo and tell us what it does, why you built it, and what
            broke along the way. Half-finished counts — we care about how you think.
          </p>

          <ul className="join-notes">
            <li>Any language, any scale. A scraper is fine. A game is fine.</li>
            <li>Group project? Link it and say which parts were yours.</li>
            <li>Make sure the repo is public, otherwise we can’t open it.</li>
          </ul>
        </div>

        <form className="join-form" onSubmit={submit} noValidate>
          <div className="join-field">
            <label htmlFor="j-name">Full name</label>
            <input
              id="j-name"
              type="text"
              autoComplete="name"
              placeholder="Ada Lovelace"
              value={form.name}
              onChange={set('name')}
              aria-invalid={!!errors.name}
            />
            {errors.name && <span className="join-err">{errors.name}</span>}
          </div>

          <div className="join-row">
            <div className="join-field">
              <label htmlFor="j-email">Email</label>
              <input
                id="j-email"
                type="email"
                autoComplete="email"
                placeholder="you@vitbhopal.ac.in"
                value={form.email}
                onChange={set('email')}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="join-err">{errors.email}</span>}
            </div>

            <div className="join-field">
              <label htmlFor="j-reg">Registration number</label>
              <input
                id="j-reg"
                type="text"
                placeholder="23BCE10001"
                value={form.regNumber}
                onChange={set('regNumber')}
                aria-invalid={!!errors.regNumber}
              />
              {errors.regNumber && <span className="join-err">{errors.regNumber}</span>}
            </div>
          </div>

          <div className="join-field">
            <label htmlFor="j-repo">GitHub repository</label>
            <input
              id="j-repo"
              type="url"
              inputMode="url"
              placeholder="https://github.com/username/project"
              value={form.repoUrl}
              onChange={set('repoUrl')}
              aria-invalid={!!errors.repoUrl}
            />
            {errors.repoUrl && <span className="join-err">{errors.repoUrl}</span>}
          </div>

          <div className="join-field">
            <label htmlFor="j-project">What did you build?</label>
            <textarea
              id="j-project"
              rows={7}
              placeholder="What it does, why you built it, the part that took the longest to get right…"
              value={form.project}
              onChange={set('project')}
              aria-invalid={!!errors.project}
            />
            <div className="join-meta">
              <span>{errors.project && <span className="join-err">{errors.project}</span>}</span>
              <span className="join-count">{form.project.trim().length} chars</span>
            </div>
          </div>

          {status === 'error' && <p className="join-alert">{serverError}</p>}

          <button type="submit" className="btn btn-solid join-submit" disabled={sending}>
            {sending ? 'Submitting…' : 'Submit application'} <span className="arrow">→</span>
          </button>
        </form>
      </div>
    </section>
  );
}

export default Join;

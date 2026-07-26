import { neon } from '@neondatabase/serverless';

// The Neon connection string lives in the DATABASE_URL environment variable.
// Local dev: put it in .env (see .env.example).
// Production: Vercel → Project → Settings → Environment Variables → DATABASE_URL.
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REPO_RE = /^(https?:\/\/)?(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/i;

let schemaReady = false;

// Creates the table on first request so there's no separate migration step.
async function ensureSchema() {
  if (schemaReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS applications (
      id           SERIAL PRIMARY KEY,
      name         TEXT        NOT NULL,
      email        TEXT        NOT NULL UNIQUE,
      reg_number   TEXT        NOT NULL,
      repo_url     TEXT        NOT NULL,
      project      TEXT        NOT NULL,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  schemaReady = true;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!sql) {
    return res.status(500).json({ error: 'Database is not configured yet. Set DATABASE_URL.' });
  }

  // Vercel parses JSON bodies for us; guard anyway in case it arrives as a string.
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const regNumber = String(body.regNumber || '').trim().toUpperCase();
  const repoUrl = String(body.repoUrl || '').trim().replace(/\.git$/i, '');
  const project = String(body.project || '').trim();

  if (!name || name.length > 120) return res.status(400).json({ error: 'Invalid name.' });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'Invalid email.' });
  if (!regNumber || regNumber.length > 32) return res.status(400).json({ error: 'Invalid registration number.' });
  if (!REPO_RE.test(repoUrl)) return res.status(400).json({ error: 'Repo must be a github.com/user/repo link.' });
  if (project.length < 40 || project.length > 5000) {
    return res.status(400).json({ error: 'Project description must be 40–5000 characters.' });
  }

  try {
    await ensureSchema();

    // Re-applying with the same email updates the existing row instead of erroring.
    const [row] = await sql`
      INSERT INTO applications (name, email, reg_number, repo_url, project)
      VALUES (${name}, ${email}, ${regNumber}, ${repoUrl}, ${project})
      ON CONFLICT (email) DO UPDATE SET
        name       = EXCLUDED.name,
        reg_number = EXCLUDED.reg_number,
        repo_url   = EXCLUDED.repo_url,
        project    = EXCLUDED.project,
        created_at = now()
      RETURNING id
    `;

    return res.status(200).json({ ok: true, id: row.id });
  } catch (err) {
    console.error('[join] insert failed:', err);
    return res.status(500).json({ error: 'Could not save your application. Try again shortly.' });
  }
}

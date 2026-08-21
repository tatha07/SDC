// Placeholder roster — swap names, handles, and photos for the real club members.
import gitWorkshop from '../assets/IMG_1611.jpg'
import dsa1 from '../assets/DSA_SPRINT.png'
import dsa2 from '../assets/DSA_SPRINT2.png'
import community from '../assets/COMMUNITY.png'
export const clubLead = {
  name: 'Kalpesh Parashar',
  title: 'President, SDC VITB',
  description:
    'The absolute carry of the club. They keep the whole SDC ship from crashing when the rest of us are lost in the sauce debugging. Basically, the mastermind calling the big shots. He built our last website btw :}',
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/in/kalpesh-parashar/',
  photo: null,
};
export const clubVP ={
  name: 'Ananya Rajesh Pandey',
  title: 'Vice-President, SDC VITB',
  description:
    "The President's right hand. They're the one who makes sure our crazy ideas can actually scale without breaking production. Whenever we need to figure out how to actually execute a massive plan, they're on it.",
  // github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/in/ananyapandey333/',
  photo: null,
};
export const clubGS={
  name: 'Daksh Rathore',
  title: 'General Secretary, SDC VITB',
  description:
    "The one who actually knows what's going on. While the tech team is arguing about logic and frameworks, they're out here dodging the administrative bullets and handling all the paperwork so the club stays alive and running.",
  // github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/in/dakshrathore2021341327/',
  photo: null,
};
export const clubOperations={
  name: 'Sejal',
  title: 'Operations Lead, SDC VITB',
  description:
    "The absolute GOAT behind the scenes. Whenever we host a session or an event, they're the one managing the pure chaos of logistics so everything runs flawlessly on the outside.",
  // github: 'https://github.com/',
  linkedin: 'https://linkedin.com/in/sejalmishra08',
  photo: null,
};

// The core panel, in order of seniority — rendered on /panel and on the home page.
// Entries stay in sync with the individual exports above, so edit those, not this.
export const panel = [clubLead, clubVP, clubGS, clubOperations];

// `coleads` takes as many names as you need — add or remove entries freely.
// Blank names and empty arrays are skipped when rendering, so half-filled
// departments are safe to leave here until the roster is confirmed.
export const departments = [
  {
    name: 'Technical',
    blurb: 'Runs the workshops, builds club projects, and keeps everyone shipping code.',
    lead: 'Saksham Raut',
    coleads: [],
    // github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/in/saksham-raut-11b10b377/',
  },
  {
    name: 'PR',
    blurb: 'Handles outreach, sponsorships, and partnerships across campus and beyond.',
    lead: 'Abhyansh Sharma',
    coleads: ['Nafisa', 'Shivansh Sharma'],
    // github: 'https://github.com/',
    linkedin: 'https://linkedin.com/in/',
  },
  {
    name: 'Social Media',
    blurb: 'Keeps the club’s feeds alive with recaps, reels, and announcements.',
    lead: 'Aarav Sharma',
    coleads: [],
    // github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/in/aarav-sharma-8957693a0',
  },
  // {
  //   name: 'Design',
  //   blurb: 'Owns the visual identity — posters, slides, and the brand system.',
  //   lead: '',
  //   coleads: [],
  //   github: 'https://github.com/',
  //   linkedin: 'https://linkedin.com/in/',
  // },
  // {
  //   name: 'Content',
  //   blurb: 'Writes the words — captions, articles, scripts, and event copy.',
  //   lead: '',
  //   coleads: [],
  //   github: 'https://github.com',
  //   linkedin: 'https://linkedin.com/in/',
  // },
  {
    name: 'Videography',
    blurb: 'Films and edits everything from workshop recaps to hype reels.',
    lead: 'Vedant',
    coleads: [],
    // github: 'https://github.com/',
    linkedin: 'https://linkedin.com/in/',
  },
    {
    name: 'Event Management',
    blurb: 'Films and edits everything from workshop recaps to hype reels.',
    lead: 'Siddhi',
    coleads: ['Paras','Ashish'],
    // github: 'https://github.com/',
    linkedin: 'https://linkedin.com/in/',
  },
];

// Drop workshop photos in src/assets/events/ and set `image` below (import them and reference here).
// Slides without an image fall back to a branded gradient card so the strip never looks broken.
export const eventPhotos = [
  { title: 'Git Collaboration Workshop', image: gitWorkshop, accent: '#7c3aed' },
  { title: 'DSA Sprint — Session 1', image: dsa1, accent: '#8b5cf6' },
  { title: 'DSA Sprint — Session 2', image: dsa2, accent: '#a855f7' },

];

export const workshops = [
  {
    title: 'Git Essentials',
    sessions: 1,
    summary:
      'Git fundamentals, commit history, branching strategies, and collaborative workflows for developers.',
    highlights: ['Repository setup', 'Branching & merging', 'Pull request etiquette', 'Resolving merge conflicts'],
  },
  {
    title: 'DSA Mastery Series',
    sessions: '3–4',
    summary:
      'A multi-session pathway through data structures, algorithmic thinking, performance analysis, and competitive coding.',
    highlights: ['Arrays & strings', 'Trees & graphs', 'Dynamic programming', 'Problem-solving frameworks'],
  },
  {
    title: 'LangChain + LangGraph',
    sessions: 1,
    summary:
      'A modern AI workshop exploring conversational chains, knowledge-graph integration, and building intelligent dev tools.',
    highlights: ['Language chains', 'Knowledge graphs', 'Prompt engineering', 'Agentic workflows'],
  },
];

export const stats = [
  { value: '06', label: 'Departments' },
  { value: '03', label: 'Workshop tracks' },
  { value: '05', label: 'Sessions run' },
];

export const features = [
  {
    title: 'Workshops that stick',
    body: 'Git, DSA, and applied AI — taught by students who’ve actually shipped, with exercises you do rather than watch.',
  },
  {
    title: 'Projects, not just theory',
    body: 'You leave with something in your GitHub: real repositories, code review, and pull requests that got merged.',
  },
  {
    title: 'A room full of builders',
    body: 'Hackathons, tech talks, and late-night debugging with people who genuinely want you to get better.',
  },
];

export const navItems = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/workshops', label: 'Workshops' },
  { to: '/departments', label: 'Departments' },
  { to: '/panel', label: 'Panel' },
];

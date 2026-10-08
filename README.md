# SDC VITB Website
This is the website for the Software Development Community at VIT Bhopal. It introduces the club, shares information about its events and workshops, and gives students a place to learn about the team and apply to join.
The site is built with React and Vite. Its terminal-style opening screen leads into the main website, which includes pages for events, workshops, departments, the panel, and joining SDC.

## Getting started
You will need Node.js and npm installed.
1. Clone the repository and open its root folder.
2. Install the project dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
Vite will print a local address in the terminal. Open that address in your browser.

## Useful commands
```bash
npm run dev      # Start the development server
npm run build    # Build the site for production
npm run preview  # Preview a production build locally
```
shows the expected variable name.

## Updating site content
Most of the club details, event information, photos, and announcement text are kept in `src/data/content.js`. Update the existing entries there when the site content changes.
The announcement popup and banner are kept in the project, but are currently hidden. In `src/data/content.js`, set `upcomingEvent.active` to `true` to show them again, or set it to `false` to hide them. The announcement text and links can be edited in the same object.

## Event Banner
Event Banner and Popup is in `src/components/AnnouncementBanner.jsx` and `src/components/AnnouncementPopup.jsx`
You can make changes here and find the control directly in `src/data/content.js` and the bottom of the folder which is currently turned to turn it on set `active: true`, you can add and change details.

## Terminal Page
This is the main highlight of this page, user either enters `sudo sdc` or `open` to enter the site, it is in `src/pages/TerminalPage.jsx`

## Project layout
```text
api/
  join.js                 Handles join form submissions
src/
  components/             Shared interface components
  data/                   Club and page content
  pages/                  Website pages
  App.jsx                 Routes and opening screen behavior
  main.jsx                React application entry point
  styles.css              Site styles
index.html                HTML entry point
```
## Ideas & Work
1. Under `api/join.js` the joining page is connected to the data base, make connect it and start taking reponse by removing the linkedin link.
2. Design changes are always appreciated, make sure it should match the club's colour scheme.
3. Got an Idea, Raise a PR.
4. Have fun Coding people :D

 
# HARIAH - Send Musical Messages

A beautiful React application for sending and receiving musical messages (Arias) to the people you care about. Share songs with personal notes and create memorable musical experiences.

## Features

- **Send Aria**: Compose a musical message with a recipient name, personal note, and song link (Spotify/YouTube)
- **Search Aria**: Check if someone has sent you an Aria by searching your name
- **Personalized Display**: Beautiful message display with embedded music player and handwritten-style messages
- **DomeGallery**: Interactive 3D gallery component (placeholder for reactbits.dev component)
- **Dark Theme**: Elegant dark background with glowing hover effects
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Firebase Backend**: Secure data storage with timestamps

## Tech Stack

- **React 19** + **Vite** - Fast development and build tool
- **TailwindCSS** - Utility-first CSS framework
- **Firebase** - Backend storage (Firestore)
- **Google Fonts** - Dancing Script (handwritten) and Inter fonts

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

Before running the app, you need to set up Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Go to Project Settings → General → Your apps → Web app
5. Copy the Firebase configuration object
6. Replace the placeholder values in `src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

### GitHub Pages (Recommended)

This project is configured for automatic deployment to GitHub Pages using GitHub Actions:

1. **Automatic Deployment**: Simply push changes to the `main` branch
2. **GitHub Actions** will automatically build and deploy to GitHub Pages
3. Your site will be available at: `https://hannbella011.github.io/HARIAH/`

**Manual Deployment Script**:
```powershell
./deploy.ps1
```

This script will:
- Build the project
- Commit and push changes to main
- Trigger GitHub Actions deployment

**GitHub Pages Configuration**:
- Source: `gh-pages` branch (automatically managed by GitHub Actions)
- Base path: `/HARIAH/` (configured in `vite.config.js`)
- Build output: `dist/` directory

### Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect and build the project

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Deploy via the Netlify dashboard or CLI

## Component Structure

- `src/App.jsx` - Main application component with view routing
- `src/components/DomeGallery.jsx` - 3D gallery placeholder component
- `src/components/SendAriaForm.jsx` - Form for sending Arias
- `src/components/SearchAria.jsx` - Search interface for received Arias
- `src/components/MessageDisplay.jsx` - Personalized message display
- `src/firebase.js` - Firebase configuration and exports

## Customization

### Replace DomeGallery Component

The current `DomeGallery.jsx` is a placeholder. To use the official reactbits.dev component:

1. Visit [reactbits.dev](https://reactbits.dev/)
2. Find the DomeGallery component
3. Install and integrate according to their documentation
4. Replace the placeholder in `src/components/DomeGallery.jsx`

### Modify Styling

- TailwindCSS configuration: `tailwind.config.js`
- Custom CSS: `src/index.css`
- Component-specific styles are inline using Tailwind classes

### Add Sender Name Field

Currently, the sender is set to "Anonymous" by default. To add a sender name field:

1. Add a sender field to `SendAriaForm.jsx`
2. Update the Firebase document structure
3. Display the sender name in `MessageDisplay.jsx`

## Accessibility

- ARIA labels on all interactive elements
- Alt text for images
- High contrast text for readability
- Keyboard navigation support
- Screen reader friendly

## License

MIT License - Feel free to use this project for personal or commercial purposes.

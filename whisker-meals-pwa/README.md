# 🐱 Whisker Meals — Android PWA

A Progressive Web App that installs on your Android phone's home screen and sends notifications every Wednesday and Sunday evening.

## What you get
- Home screen icon — looks and feels like a real app
- Push notifications on Wed & Sun at your chosen time
- Full tracker with history
- Customisable messages and reminder times
- Works offline

---

## Deployment (free, ~10 minutes)

### Step 1 — Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Click **"Add new site" → "Deploy manually"**
3. Drag and drop this entire folder onto the Netlify deploy area
4. Netlify gives you a URL like `https://whisker-meals-abc123.netlify.app`

### Step 2 — Install on Android

1. Open Chrome on your Android phone
2. Go to your Netlify URL
3. Tap the **three dots menu** (top right)
4. Tap **"Add to Home screen"**
5. Tap **Add** — the app appears on your home screen!

### Step 3 — Enable notifications

1. Open the app from your home screen
2. Tap **"Enable Notifications"** when the banner appears
3. Allow notifications when Android asks
4. Go to **Settings tab** to customise the reminder time

---

## Notes

- Notifications work best when the app has been opened at least once after install
- Android Chrome supports all PWA features including background notifications
- iPhone/Safari has more limited PWA notification support (works on iOS 16.4+)
- Data is stored on the device — clearing browser data will reset history

---

## Files
- `index.html` — the app UI
- `sw.js` — service worker (handles background notifications)
- `manifest.json` — makes it installable as an app
- `icon-192.png` / `icon-512.png` — app icons (add your own cat emoji icon!)

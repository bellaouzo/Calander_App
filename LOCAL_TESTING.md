# Local Testing Guide

Test your Expo Calendar app locally before deploying to VPS.

## Quick Start

### 1. Start the Development Server

```bash
npm start
```

This will:

- Start the Metro bundler
- Display a QR code in your terminal
- Show connection options (web, iOS, Android)

### 2. Install Expo Go on Your iPhone

- Download **Expo Go** from the App Store
- It's free and allows you to run Expo apps

### 3. Connect Your iPhone

**Option A: Scan QR Code**

- Open your iPhone camera
- Point it at the QR code in your terminal
- Tap the notification to open in Expo Go

**Option B: Use Expo Go App**

- Open Expo Go app
- Tap "Scan QR Code"
- Point camera at the QR code

### 4. Verify the App Works

You should see:

- "Hello World!" title
- "Calendar App Coming Soon" subtitle
- App running smoothly on your iPhone

## Troubleshooting

### Common Issues

**QR Code Not Working**

- Make sure your computer and iPhone are on the same WiFi network
- Try the tunnel option: `npx expo start --tunnel`

**App Won't Load**

- Check your internet connection
- Restart the development server: `Ctrl+C` then `npm start`
- Clear Expo Go cache in the app settings

**Metro Bundler Issues**

- Clear cache: `npx expo start --clear`
- Reset Metro: `npx expo start --reset-cache`

### Connection Options

**Local Network (Fastest)**

```bash
npx expo start --lan
```

**Tunnel (Works from anywhere)**

```bash
npx expo start --tunnel
```

**Web Browser (Testing)**

```bash
npx expo start --web
```

## Development Workflow

### Making Changes

1. Edit your code in `App.tsx` or other files
2. Save the file
3. The app on your iPhone will automatically reload
4. See changes instantly!

### Hot Reloading

- Changes to JavaScript/TypeScript files reload automatically
- Changes to assets may require a full reload
- Use `r` in the terminal to manually reload

### Debugging

- Shake your iPhone to open the developer menu
- Enable remote debugging if needed
- Check the terminal for error messages

## Ready for VPS Deployment?

Once you confirm the Hello World app works locally:

1. ✅ App loads successfully on iPhone
2. ✅ Changes reload automatically
3. ✅ No errors in terminal or on device

You're ready to deploy to your VPS following the `VPS_DEPLOYMENT.md` guide!

## Next Steps

After successful local testing:

1. Deploy to VPS using the deployment guide
2. Test remote connection from iPhone
3. Start building your calendar functionality
4. Iterate and improve your app

Happy coding! 📱✨

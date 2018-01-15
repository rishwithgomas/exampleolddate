# Biometric Authentication App

A minimal Android app built with React Native (Expo) that performs biometric authentication (fingerprint or face ID).

## Stack Used

- **Framework**: React Native with Expo
- **Biometric Package**: `expo-local-authentication`
- **Platform**: Android only (configured for portrait orientation)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio with Android SDK (for emulator)
- OR a physical Android device with Expo Go app installed

## Installation

1. Create a new directory and add the files:
   - `App.js`
   - `app.json`
   - `package.json`

2. Install dependencies:
```bash
npm install
```

3. If using Expo SDK 51, run:
```bash
npx expo install expo-local-authentication
```

## How to Run

### On Android Emulator

1. Start Android Studio and launch an emulator (API 23+)
2. Ensure the emulator has biometric capabilities:
   - In emulator settings, enable fingerprint
   - Set up a fingerprint via: Settings > Security > Fingerprint
3. Run the app:
```bash
npm run android
```

### On Physical Android Device

1. Install Expo Go from Google Play Store
2. Connect device to same WiFi as development machine
3. Start the development server:
```bash
npm start
```
4. Scan the QR code with Expo Go app

**Note**: For production build with biometric support:
```bash
eas build --platform android --profile preview
```

## Features Implemented

✅ Single screen with status text and authenticate button  
✅ Biometric authentication (fingerprint/face)  
✅ Status updates from "Not authenticated" to "Authenticated"  
✅ Proper error handling for:
  - No biometrics enrolled
  - Hardware unavailable
  - User cancellation
  - Authentication failure  
✅ Button disabled during authentication  
✅ Accessibility support (TalkBack compatible)  
✅ Portrait orientation only  
✅ No crashes on unsupported devices

## Permissions

The app requests the following Android permissions (configured in `app.json`):
- `USE_BIOMETRIC` - For biometric authentication
- `USE_FINGERPRINT` - For fingerprint support

## Testing Biometrics on Emulator

### Fingerprint Simulation
With emulator running, use adb:
```bash
adb -e emu finger touch 1
```

This simulates a successful fingerprint scan.

### Face ID
Face ID is not available on Android emulators. Test on a physical device with face unlock capability.

## Known Limitations

1. **State Persistence**: Authentication state resets on app restart (by design for MVP)
2. **Face ID Testing**: Requires physical device with face unlock hardware
3. **Expo Go Limitations**: Some biometric features work better in standalone builds
4. **Android Only**: iOS support not implemented in this version

## Error Messages

The app displays these exact messages per requirements:

- Success: Status text changes to "Authenticated"
- Failure: "Authentication failed."
- Canceled: "Authentication canceled."
- Not enrolled: "No biometrics enrolled. Please add a fingerprint or face in Settings."
- Unavailable: "Biometric hardware unavailable. Try again later."
- Unsupported: "Biometric authentication not supported on this device."

## Project Structure

```
biometric-auth-app/
├── App.js              # Main application component
├── app.json            # Expo configuration
├── package.json        # Dependencies
└── README.md           # This file
```

## Troubleshooting

**Issue**: Biometric prompt not showing  
**Solution**: Ensure at least one fingerprint is enrolled in device settings

**Issue**: "Biometric hardware unavailable"  
**Solution**: Restart the app and check if biometrics are locked due to multiple failed attempts

**Issue**: App crashes on launch  
**Solution**: Clear cache with `expo start -c` and reinstall

## Build for Production

For a production APK:

1. Install EAS CLI: `npm install -g eas-cli`
2. Configure: `eas build:configure`
3. Build: `eas build --platform android`

## Acceptance Criteria Met

✅ Fresh install shows "Not authenticated" and "Authenticate" button  
✅ Button opens system biometric prompt  
✅ Successful auth updates text to "Authenticated"  
✅ Failures show appropriate messages  
✅ Button disabled during prompt  
✅ Works on fingerprint-capable devices  
✅ Handles all edge cases (not enrolled, unavailable, canceled)  
✅ No crashes on unsupported devices  
✅ TalkBack accessible

## License

MIT
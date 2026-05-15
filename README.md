# Sentinel Safety MVP App

A mobile-first Safety MVP application built using Expo React Native and Firebase.

This project enables users to:

- Login using OTP flow
- Access real-time GPS location
- Trigger SOS emergency alerts
- Report incidents with details and image upload
- Store emergency and incident data in Firebase Firestore

---

# 🚀 Features

## ✅ Authentication
- Mobile number login
- OTP verification flow
- Session persistence using AsyncStorage

## ✅ GPS Location Tracking
- Real-time latitude & longitude
- Auto location permission handling

## ✅ SOS Emergency Module
- One-tap SOS trigger
- Stores emergency location in Firestore

## ✅ Incident Reporting
- Incident type input
- Incident description
- Optional image picker
- Auto GPS capture
- Firestore incident storage

## ✅ Firebase Integration
- Firestore database integration
- Secure environment variable usage

## ✅ Android APK Build
- Built using Expo EAS Build

---

# 🛠 Tech Stack

## Frontend
- React Native
- Expo SDK 54
- Expo Router
- TypeScript

## Backend / Database
- Firebase Firestore

## Libraries Used
- expo-location
- expo-image-picker
- firebase
- expo-router
- @react-native-async-storage/async-storage

---

# 📂 Project Structure

```bash
app/
 ├── _layout.tsx
 ├── index.tsx
 ├── otp.tsx
 ├── home.tsx
 └── report.tsx

src/
 └── firebase/
      └── config.ts
```

---

# ⚙️ Firebase Setup

## Step 1 — Create Firebase Project
- Go to Firebase Console
- Create a new project

## Step 2 — Enable Firestore
- Build → Firestore Database
- Create database in test mode

## Step 3 — Add Web App
Copy Firebase config values.

## Step 4 — Create `.env`

```env
EXPO_PUBLIC_FIREBASE_API_KEY=YOUR_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

---

# ▶️ Expo Setup

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npx expo start
```

## Run on Web

```bash
npx expo start --web
```

---

# 📱 APK Build

## Install EAS CLI

```bash
npm install -g eas-cli
```

## Login to Expo

```bash
eas login
```

## Configure build

```bash
eas build:configure
```

## Build APK

```bash
eas build -p android --profile preview --clear-cache
```

---

# 🔥 Firestore Collections

## sos_alerts
Stores:
- latitude
- longitude
- timestamp

## incident_reports
Stores:
- incidentType
- description
- image
- latitude
- longitude
- timestamp

---

# 🧪 Testing Credentials

## OTP Login
Use any 10-digit mobile number.

### Test OTP
```bash
1234
```

---

# 📸 Screenshots

Add screenshots here:

- Login Screen
- OTP Screen
- Dashboard
- SOS Success
- Incident Report Screen
- Firebase Firestore Data
- APK Running on Device

---

# ✅ Important Notes

- Firebase API keys are stored securely using `.env`
- `node_modules` is excluded using `.gitignore`
- Expo Go may not support some native modules properly
- APK build is recommended for final testing

---

# 👨‍💻 Developer

Saurabh Kumar

---

# 📌 Assignment Completion Status

✅ OTP Login Flow  
✅ Session Handling  
✅ GPS Tracking  
✅ SOS Module  
✅ Incident Reporting  
✅ Firebase Firestore Integration  
✅ Image Picker  
✅ Android APK Build  
✅ Expo Deployment Ready  

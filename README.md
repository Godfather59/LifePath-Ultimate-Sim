# Life Simulator

A text-based life simulator game built with React, Vite, and Capacitor for Android.

## Features

*   **Life Stats**: Manage Happiness, Health, Smarts, and Looks as you age.
*   **Careers**: Apply for jobs, get promoted, or become a Brain Surgeon.
*   **Activities**: Go to the gym, meditate, find a date, or get plastic surgery.
*   **Interactive Events**: Randomized events with choices that impact your life.
*   **Assets**: Buy and sell Real Estate and Cars.
*   **Relationships**: Dating, Marriage, and Family interactions.
*   **Education**: Universities, Medical School, Law School, and Business School.
*   **Persistence**: Auto-saves your progress.

## Interactive Demo

1.  Clone the repo.
2.  Install dependencies: `npm install`
3.  Run locally: `npm run dev`

## Building for Android

This project uses Capacitor to wrap the web app in a native Android container.

1.  **Sync web assets**:
    ```bash
    npm run build
    npx cap sync
    ```

2.  **Open in Android Studio**:
    ```bash
    npx cap open android
    ```

3.  **Build APK**:
    In Android Studio: `Build > Build Bundle(s) / APK(s) > Build APK(s)`

## Technologies

*   React
*   Vite
*   Capacitor
*   Vanilla CSS

# College Assignment Tracker

A personal mobile app for tracking college class assignments, built with React Native and Expo.

## Features

- **Calendar View**: Visual calendar showing assignments marked on their due dates
- **List View**: Chronological list of upcoming assignments
- **Class Management**: Create and manage classes with custom colors
- **Assignment Tracking**: Track assignments with title, due date, class, and completion status
- **Smart Notifications**: Automatic reminders one day before and on the day assignments are due (9 AM)
- **Completion Toggle**: Mark assignments as complete with a simple checkbox

## Tech Stack

- React Native (Expo)
- TypeScript
- SQLite (local database)
- React Navigation (tabs & stack navigation)
- expo-notifications (local push notifications)
- react-native-calendars

## Getting Started

### Prerequisites

- Node.js
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

```bash
npm start
```

This will start the Expo development server. Scan the QR code with:

- iOS: Camera app
- Android: Expo Go app

## Usage

### Managing Classes

1. Tap "Classes" in the header on either tab
2. Tap "+ Add Class" to create a new class
3. Enter class name and select a color
4. Edit or delete classes as needed

### Adding Assignments

1. Tap the "+" button (FAB) on Calendar or List screen
2. Enter assignment title
3. Select due date
4. Choose the class
5. Tap "Create Assignment"

### Viewing Assignments

**Calendar View:**

- Browse dates using the calendar
- Tap any date to see assignments due that day
- Dates with assignments are marked with a dot

**List View:**

- See all upcoming assignments in chronological order
- Toggle "Show Completed" to include/exclude completed assignments
- Assignments are sorted by due date

### Managing Assignments

- Tap the checkbox to mark as complete/incomplete
- Tap the assignment card to edit details
- In edit mode, you can update or delete the assignment

## Database Schema

**Classes Table:**

- id (INTEGER PRIMARY KEY)
- name (TEXT)
- color (TEXT)

**Assignments Table:**

- id (INTEGER PRIMARY KEY)
- title (TEXT)
- dueDate (TEXT - ISO date format)
- classId (INTEGER - foreign key)
- completed (INTEGER - 0 or 1)

## Project Structure

```
src/
├── components/        # Reusable UI components
├── data/             # Database layer (SQLite)
├── lib/              # Utilities and context
│   └── context/      # React Context for state management
├── navigation/       # Navigation configuration
├── notifications/    # Notification service
└── screens/          # Main app screens
```

## Notifications

The app automatically schedules notifications for incomplete assignments:

- **Day Before**: 9:00 AM the day before due date
- **Due Date**: 9:00 AM on the due date

Notifications are automatically cancelled when assignments are:

- Marked as complete
- Deleted

## License

This is a personal project for educational use.

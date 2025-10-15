# Quick Start Guide

## First Time Setup

1. **Start the development server:**

   ```bash
   npm start
   ```

2. **Run on your device:**
   - Install "Expo Go" app on your phone
   - Scan the QR code that appears in the terminal
   - The app will load on your device

## Initial Setup in the App

### Step 1: Add Your Classes

1. Open the app
2. Tap "Classes" button in the top-right
3. Tap "+ Add Class"
4. Enter class name (e.g., "Computer Science 101")
5. Pick a color for easy identification
6. Tap "Create"
7. Repeat for all your classes

### Step 2: Add Assignments

1. Go to Calendar or List tab
2. Tap the blue "+" button (bottom-right)
3. Fill in:
   - **Title**: Name of the assignment
   - **Due Date**: When it's due
   - **Class**: Select from your classes
   - **Completed**: Toggle if already done
4. Tap "Create Assignment"

### Step 3: Enable Notifications

- The app will request notification permissions on first launch
- If you denied it, go to Settings → [App Name] → Notifications
- Enable notifications to get reminders

## Daily Usage

### Calendar View

- Browse dates using the calendar
- Dates with assignments show a dot
- Tap a date to see assignments due that day
- Check off assignments as you complete them

### List View

- See all upcoming assignments in order
- Toggle "Show Completed" to filter
- Quickly check off completed work
- Tap any assignment to edit or delete

### Managing Assignments

- **Complete**: Tap the checkbox
- **Edit**: Tap the assignment card
- **Delete**: Edit the assignment → tap "Delete Assignment"

### Managing Classes

- **View**: Tap "Classes" in header
- **Edit**: Tap "Edit" button on any class
- **Delete**: Tap "Delete" button (also removes all assignments for that class)

## Notifications

You'll automatically receive:

- **Day Before**: Reminder at 9:00 AM the day before due date
- **Due Date**: Reminder at 9:00 AM on the due date

Notifications stop when you mark assignments complete or delete them.

## Tips

1. **Color Code Classes**: Use distinct colors to quickly identify assignments
2. **Check Daily**: Review the list view each morning
3. **Mark Complete**: Check off assignments immediately when done
4. **Plan Ahead**: Use calendar view to see upcoming workload

## Troubleshooting

**App won't start?**

- Run `npm install` again
- Try `npm start -- --clear` to clear cache

**No notifications?**

- Check phone Settings → Notifications
- Ensure app has notification permission
- Restart the app after enabling permissions

**Database issues?**

- The database is stored locally on your device
- If issues persist, delete and reinstall the app

## Database Location

Your data is stored locally in an SQLite database on your device:

- iOS: App's documents directory
- Android: App's internal storage

**Note:** Data is not backed up automatically. If you uninstall the app, you'll lose your data.

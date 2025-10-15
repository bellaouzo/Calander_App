import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const requestNotificationPermissions = async (): Promise<boolean> => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Notification permission not granted");
    return false;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("assignments", {
      name: "Assignment Reminders",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return true;
};

export const scheduleAssignmentNotifications = async (
  assignmentId: number,
  assignmentTitle: string,
  dueDate: string
): Promise<string[]> => {
  const notificationIds: string[] = [];

  const dueDateObj = new Date(dueDate + "T00:00:00");

  const dayBefore = new Date(dueDateObj);
  dayBefore.setDate(dayBefore.getDate() - 1);
  dayBefore.setHours(9, 0, 0, 0);

  const dayOf = new Date(dueDateObj);
  dayOf.setHours(9, 0, 0, 0);

  const now = new Date();

  if (dayBefore > now) {
    const dayBeforeId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Assignment Due Tomorrow",
        body: `${assignmentTitle} is due tomorrow`,
        data: { assignmentId, type: "day_before" },
      },
      trigger: dayBefore as any,
    });
    notificationIds.push(dayBeforeId);
  }

  if (dayOf > now) {
    const dayOfId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Assignment Due Today",
        body: `${assignmentTitle} is due today`,
        data: { assignmentId, type: "day_of" },
      },
      trigger: dayOf as any,
    });
    notificationIds.push(dayOfId);
  }

  return notificationIds;
};

export const cancelNotification = async (
  notificationId: string
): Promise<void> => {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
};

export const cancelAllNotifications = async (): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

export const getScheduledNotifications = async (): Promise<
  Notifications.NotificationRequest[]
> => {
  return await Notifications.getAllScheduledNotificationsAsync();
};

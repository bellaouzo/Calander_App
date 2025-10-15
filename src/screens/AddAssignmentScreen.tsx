import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { useApp } from "../lib/context/AppContext";
import { ClassPicker } from "../components/ClassPicker";
import { DatePicker } from "../components/DatePicker";
import { scheduleAssignmentNotifications } from "../notifications/notificationService";
import { AssignmentWithClass } from "../data/assignmentsDB";

interface AddAssignmentScreenProps {
  navigation: any;
  route: {
    params?: {
      assignment?: AssignmentWithClass;
    };
  };
}

export const AddAssignmentScreen: React.FC<AddAssignmentScreenProps> = ({
  navigation,
  route,
}) => {
  const { classes, createAssignment, updateAssignment, deleteAssignment } =
    useApp();
  const existingAssignment = route.params?.assignment;
  const isEditing = !!existingAssignment;

  const [title, setTitle] = useState(existingAssignment?.title || "");
  const [dueDate, setDueDate] = useState(
    existingAssignment
      ? new Date(existingAssignment.dueDate + "T00:00:00")
      : new Date()
  );
  const [selectedClassId, setSelectedClassId] = useState<number | null>(
    existingAssignment?.classId || null
  );
  const [completed, setCompleted] = useState(!!existingAssignment?.completed);

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Assignment" : "Add Assignment",
    });
  }, [isEditing, navigation]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }

    if (selectedClassId === null) {
      Alert.alert("Error", "Please select a class");
      return;
    }

    try {
      const assignmentData = {
        title: title.trim(),
        dueDate: dueDate.toISOString().split("T")[0],
        classId: selectedClassId,
        completed: completed ? 1 : 0,
      };

      if (isEditing && existingAssignment) {
        await updateAssignment(existingAssignment.id, assignmentData);
      } else {
        const id = await createAssignment(assignmentData);
        if (!completed) {
          await scheduleAssignmentNotifications(
            id,
            assignmentData.title,
            assignmentData.dueDate
          );
        }
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save assignment");
      console.error("Error saving assignment:", error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Assignment",
      "Are you sure you want to delete this assignment?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            if (existingAssignment) {
              await deleteAssignment(existingAssignment.id);
              navigation.goBack();
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter assignment title"
            placeholderTextColor="#999"
          />
        </View>

        <DatePicker label="Due Date" date={dueDate} onChange={setDueDate} />

        <ClassPicker
          classes={classes}
          selectedClassId={selectedClassId}
          onSelect={setSelectedClassId}
        />

        <View style={styles.switchField}>
          <Text style={styles.label}>Completed</Text>
          <Switch
            value={completed}
            onValueChange={setCompleted}
            trackColor={{ false: "#ccc", true: "#4CAF50" }}
            thumbColor="#fff"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {isEditing ? "Update Assignment" : "Create Assignment"}
          </Text>
        </TouchableOpacity>

        {isEditing && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete Assignment</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 16,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
  },
  switchField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

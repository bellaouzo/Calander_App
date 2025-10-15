import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { AssignmentWithClass } from "../data/assignmentsDB";

interface AssignmentCardProps {
  assignment: AssignmentWithClass;
  onToggleComplete: (id: number) => void;
  onPress?: () => void;
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  onToggleComplete,
  onPress,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View
        style={[styles.colorBar, { backgroundColor: assignment.classColor }]}
      />
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <Text
            style={[
              styles.title,
              assignment.completed ? styles.completedText : null,
            ]}
          >
            {assignment.title}
          </Text>
          <Text style={styles.className}>{assignment.className}</Text>
          <Text style={styles.dueDate}>
            Due: {formatDate(assignment.dueDate)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => onToggleComplete(assignment.id)}
        >
          <View
            style={[
              styles.checkboxInner,
              assignment.completed ? styles.checkboxChecked : null,
            ]}
          >
            {assignment.completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  colorBar: {
    width: 6,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  mainContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  className: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  dueDate: {
    fontSize: 13,
    color: "#888",
  },
  checkbox: {
    padding: 8,
  },
  checkboxInner: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  checkmark: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

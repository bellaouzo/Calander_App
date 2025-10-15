import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useApp } from "../lib/context/AppContext";
import { AssignmentCard } from "../components/AssignmentCard";

export const ListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { assignments, toggleAssignmentCompletion } = useApp();
  const [showCompleted, setShowCompleted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const filteredAssignments = useMemo(() => {
    return assignments.filter((a) => {
      const isUpcoming = a.dueDate >= today;
      if (showCompleted) {
        return isUpcoming;
      }
      return isUpcoming && !a.completed;
    });
  }, [assignments, showCompleted, today]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming Assignments</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowCompleted(!showCompleted)}
        >
          <Text style={styles.filterText}>
            {showCompleted ? "Hide Completed" : "Show Completed"}
          </Text>
        </TouchableOpacity>
      </View>

      {filteredAssignments.length > 0 ? (
        <FlatList
          data={filteredAssignments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AssignmentCard
              assignment={item}
              onToggleComplete={toggleAssignmentCompletion}
              onPress={() =>
                navigation.navigate("EditAssignment", { assignment: item })
              }
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            {showCompleted
              ? "No upcoming assignments"
              : "No incomplete assignments"}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddAssignment")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  filterText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabText: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "300",
  },
});

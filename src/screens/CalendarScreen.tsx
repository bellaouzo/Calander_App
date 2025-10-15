import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useApp } from "../lib/context/AppContext";
import { AssignmentCard } from "../components/AssignmentCard";
import { AssignmentWithClass } from "../data/assignmentsDB";

export const CalendarScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { assignments, toggleAssignmentCompletion } = useApp();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const markedDates = useMemo(() => {
    const marked: { [key: string]: any } = {};

    assignments.forEach((assignment) => {
      const date = assignment.dueDate;
      if (!marked[date]) {
        marked[date] = { marked: true, dots: [] };
      }
    });

    marked[selectedDate] = {
      ...marked[selectedDate],
      selected: true,
      selectedColor: "#007AFF",
    };

    return marked;
  }, [assignments, selectedDate]);

  const selectedDateAssignments = useMemo(() => {
    return assignments.filter((a) => a.dueDate === selectedDate);
  }, [assignments, selectedDate]);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const formatSelectedDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          todayTextColor: "#007AFF",
          selectedDayBackgroundColor: "#007AFF",
          dotColor: "#007AFF",
          arrowColor: "#007AFF",
        }}
      />

      <View style={styles.assignmentsSection}>
        <Text style={styles.dateHeader}>
          {formatSelectedDate(selectedDate)}
        </Text>
        {selectedDateAssignments.length > 0 ? (
          <FlatList
            data={selectedDateAssignments}
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
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              No assignments due on this date
            </Text>
          </View>
        )}
      </View>

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
  assignmentsSection: {
    flex: 1,
    marginTop: 16,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
    marginBottom: 12,
    color: "#333",
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

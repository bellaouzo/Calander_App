import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CalendarScreen } from "../screens/CalendarScreen";
import { ListScreen } from "../screens/ListScreen";
import { AddAssignmentScreen } from "../screens/AddAssignmentScreen";
import { ManageClassesScreen } from "../screens/ManageClassesScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CalendarMain"
        component={CalendarScreen}
        options={({ navigation }) => ({
          title: "Calendar",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ManageClasses")}
              style={{ marginRight: 16 }}
            >
              <Text
                style={{ color: "#007AFF", fontSize: 16, fontWeight: "600" }}
              >
                Classes
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="AddAssignment" component={AddAssignmentScreen} />
      <Stack.Screen name="EditAssignment" component={AddAssignmentScreen} />
      <Stack.Screen name="ManageClasses" component={ManageClassesScreen} />
    </Stack.Navigator>
  );
};

const ListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListMain"
        component={ListScreen}
        options={({ navigation }) => ({
          title: "Assignments",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ManageClasses")}
              style={{ marginRight: 16 }}
            >
              <Text
                style={{ color: "#007AFF", fontSize: 16, fontWeight: "600" }}
              >
                Classes
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="AddAssignment" component={AddAssignmentScreen} />
      <Stack.Screen name="EditAssignment" component={AddAssignmentScreen} />
      <Stack.Screen name="ManageClasses" component={ManageClassesScreen} />
    </Stack.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#8E8E93",
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
        }}
      >
        <Tab.Screen
          name="Calendar"
          component={CalendarStack}
          options={{
            tabBarLabel: "Calendar",
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 24, color }}>📅</Text>
            ),
          }}
        />
        <Tab.Screen
          name="List"
          component={ListStack}
          options={{
            tabBarLabel: "List",
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 24, color }}>📋</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

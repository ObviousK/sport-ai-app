import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function HomeScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>🏋️ Séance du jour de la semaine</Text>
    </View>
  );
}
function ProgramScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>📅 Mon programme</Text>
    </View>
  );
}
function TrackingScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>📊 Suivi & progression</Text>
    </View>
  );
}
function ProfileScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>👤 Profil</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Programme" component={ProgramScreen} />
        <Tab.Screen name="Suivi" component={TrackingScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "700" },
});

// exemple TypeScript fetch
async function askAdjust() {
  const res = await fetch("http://192.168.1.10:8000/api/v1/adjust", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: 1,
      planned_session: { name: "Intervalle", intensity: 1.0, duration_min: 40 },
      metrics: { sleep_hours: 5.5, hrv: 0.8 }
    })
  });
  const json = await res.json();
  console.log(json);
}

import { useRouter } from "expo-router";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../src/firebase/config";

import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import * as Location from "expo-location";

export default function HomeScreen() {
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sosMessage, setSosMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Location permission denied");
        setLoading(false);
        return;
      }

      const currentLocation =
        await Location.getCurrentPositionAsync({});

      setLocation(currentLocation.coords);
    } catch (error) {
      Alert.alert("Error fetching location");
    } finally {
      setLoading(false);
    }
  };

  const handleSOS = async () => {
    try {
        await addDoc(collection(db, "sos_alerts"), {
            latitude: location?.latitude || null,
            longitude: location?.longitude || null,
            timestamp: new Date().toISOString(),
        });

        setSosMessage(
            "Emergency request has been recorded successfully."
        );
    } catch (error) {
        Alert.alert("Error", "Failed to save SOS event.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safety Dashboard</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Location</Text>

          <Text style={styles.locationText}>
            Latitude:{" "}
            {location?.latitude || "Unavailable"}
          </Text>

          <Text style={styles.locationText}>
            Longitude:{" "}
            {location?.longitude || "Unavailable"}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.sosButton}
        onPress={handleSOS}
      >
        <Text style={styles.buttonText}>SOS</Text>
      </TouchableOpacity>

      {sosMessage ? (
        <Text style={styles.successText}>
        {sosMessage}
         </Text>
      ) : null}

      <TouchableOpacity 
        style={styles.reportButton}
        onPress={() => router.push("/report")}
      >
        <Text style={styles.buttonText}>
          Report Incident
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  locationText: {
    fontSize: 16,
    marginBottom: 5,
  },

  sosButton: {
    backgroundColor: "red",
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
  },

  reportButton: {
    backgroundColor: "#007AFF",
    padding: 18,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  successText: {
    color: "green",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
});
import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../src/firebase/config";

export default function ReportScreen() {
  const [incidentType, setIncidentType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const pickImage = async () => {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!incidentType || !description) {
        Alert.alert(
          "Please fill all required fields"
        );
        return;
      }

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Location permission denied");
        return;
      }

      const location =
        await Location.getCurrentPositionAsync({});

      await addDoc(collection(db, "incident_reports"), {
        incidentType,
        description,
        image,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: new Date().toISOString(),
      });

      setSuccessMessage(
        "Incident report submitted successfully."
      );

      setIncidentType("");
      setDescription("");
      setImage(null);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to submit incident report."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Report Incident
      </Text>

      <TextInput
        placeholder="Incident Type"
        value={incidentType}
        onChangeText={setIncidentType}
        style={styles.input}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={[styles.input, styles.textArea]}
      />

      <TouchableOpacity
        style={styles.imageButton}
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>
          Pick Image (Optional)
        </Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}

      {successMessage ? (
        <Text style={styles.successText}>
          {successMessage}
        </Text>
      ) : null}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          Submit Report
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },

  textArea: {
    height: 120,
    textAlignVertical: "top",
  },

  imageButton: {
    backgroundColor: "#555",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  submitButton: {
    backgroundColor: "#007AFF",
    padding: 18,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },

  successText: {
    color: "green",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
});
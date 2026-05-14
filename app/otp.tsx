import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OtpScreen() {
  const [otp, setOtp] = useState("");

  const router = useRouter();

  const { mobile } = useLocalSearchParams();

  const handleVerifyOtp = async () => {
    if (otp !== "1234") {
      Alert.alert("Invalid OTP");
      return;
    }

    await AsyncStorage.setItem("isLoggedIn", "true");
    await AsyncStorage.setItem("mobile", String(mobile));

    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>

      <Text style={styles.subtitle}>
        Enter OTP: 1234
      </Text>

      <TextInput
        placeholder="Enter OTP"
        keyboardType="numeric"
        maxLength={4}
        value={otp}
        onChangeText={setOtp}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerifyOtp}
      >
        <Text style={styles.buttonText}>
          Verify OTP
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    color: "gray",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
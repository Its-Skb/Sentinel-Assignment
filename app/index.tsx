import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [mobile, setMobile] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const isLoggedIn =
      await AsyncStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      router.replace("/home");
    }
  };

  const handleSendOtp = () => {
    if (mobile.length !== 10) {
      Alert.alert("Invalid Mobile Number");
      return;
    }

    router.push({
      pathname: "/otp",
      params: { mobile },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safety MVP</Text>

      <TextInput
        placeholder="Enter Mobile Number"
        keyboardType="numeric"
        maxLength={10}
        value={mobile}
        onChangeText={setMobile}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
        <Text style={styles.buttonText}>Send OTP</Text>
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
    marginBottom: 40,
    textAlign: "center",
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
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import InputBox from "../components/InputBox";
const link = "192.168.0.102:8000"
const API_URL = `http://${link}/predict`;

export default function HomeScreen() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const predict = async () => {
    try {
      setLoading(true);

      const payload = {
        age: Number(form.age),
        sex: Number(form.sex),
        cp: Number(form.cp),
        trestbps: Number(form.trestbps),
        chol: Number(form.chol),
        fbs: Number(form.fbs),
        restecg: Number(form.restecg),
        thalach: Number(form.thalach),
        exang: Number(form.exang),
        oldpeak: Number(form.oldpeak),
        slope: Number(form.slope),
        ca: Number(form.ca),
        thal: Number(form.thal),
      };

      const res = await axios.post(API_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

      setResult(res.data);
    } catch (error) {
      console.log("AXIOS ERROR:", error?.response || error?.message);

      Alert.alert(
        "Connection Error",
        "Backend not reachable.\nCheck IP, backend running, same Wi-Fi."
      );
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    "age",
    "sex",
    "cp",
    "trestbps",
    "chol",
    "fbs",
    "restecg",
    "thalach",
    "exang",
    "oldpeak",
    "slope",
    "ca",
    "thal",
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>❤️ Heart Disease Risk</Text>

        {fields.map((field) => (
          <InputBox
            key={field}
            placeholder={field.toUpperCase()}
            value={form[field]}
            onChange={(value) => handleChange(field, value)}
          />
        ))}

        <TouchableOpacity
          style={styles.button}
          onPress={predict}
          disabled={loading}
        >
          <Text style={styles.btnText}>
            {loading ? "Predicting..." : "Predict Risk"}
          </Text>
        </TouchableOpacity>

        {result && (
          <View style={styles.resultBox}>
            <Text style={styles.riskText}>
              Risk: {result.risk}
            </Text>
            <Text>Target: {result.target}</Text>
            <Text>Probability: {result.probability}%</Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#DC2626",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  resultBox: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#ECFDF5",
    borderRadius: 14,
  },
  riskText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#065F46",
  },
});

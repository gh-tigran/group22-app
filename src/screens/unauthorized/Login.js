import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "toastify-react-native";
import { loginRequest } from "../../store/actions/users";
import { Button, ScrollView, StyleSheet, TextInput, Text } from "react-native";
import { useDispatch } from "react-redux";
import Styles from "toastify-react-native/components/styles";

function Login(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = useCallback((path) => (value) => {
    setFormData({ ...formData, [path]: value });
    setErrors({ ...errors, [path]: "" });
  }, [formData, errors]);

  const handleSubmit = useCallback(async (ev) => {
    const { payload } = await dispatch(loginRequest(formData));
    if (payload.status === "ok") {
      // navigate('/');
    } else if (payload.errors) {
      setErrors(payload.errors);
    } else {
      Toast.error(payload.message || "Something went wrong");
    }
  }, [formData]);

  return (
    <ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoComplete="email"
        inputMode="email"
        value={formData.email}
        onChangeText={handleChange("email")}
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={handleChange("password")}
      />
      {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
      <Button style={styles.button} title="LogIn" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    marginTop: 20,
    backgroundColor: "white",
    fontFamily: "Roboto-Bold2",
  },
  button: {
    marginTop: 20,
  },
  error: {
    color: "red",
    fontFamily: "Roboto-Regular",
  },
});
export default Login;

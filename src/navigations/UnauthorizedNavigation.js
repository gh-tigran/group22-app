import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderLeft from "../components/header/HeaderLeft";
import Login from "../screens/unauthorized/Login";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerTitleAlign: "center",
  headerLeft: (p) => <HeaderLeft {...p} />,
  headerBackVisible: false,
};

function UnauthorizedNavigation(props) {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Login"
        title={{
          title: "Login",
        }}
        component={Login}
      />
      <Stack.Screen
        name="Register"
        component={Login}
      />
    </Stack.Navigator>
  );
}

export default UnauthorizedNavigation;

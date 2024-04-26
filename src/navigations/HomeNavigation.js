import React from "react";
import Home from "../screens/main/Home";
import Settings from "../screens/settings/Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderLeft from "../components/header/HeaderLeft";
import SingleProduct from "../screens/main/SingleProduct";
import SingleUser from "../screens/account/SingleUser";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerTitleAlign: "center",
  headerLeft: (p) => <HeaderLeft {...p} />,
  headerBackVisible: false,
};
function HomeNavigation(props) {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Welcome",
        }}
      />
      <Stack.Screen
        name="SingleProduct"
        component={SingleProduct}
        options={{
          headerTitleAlign: "center",
        }}
      />

      {/*<Stack.Screen*/}
      {/*  name="SingleUser"*/}
      {/*  component={SingleUser}*/}
      {/*/>*/}
    </Stack.Navigator>
  );
}

export default HomeNavigation;

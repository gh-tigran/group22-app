import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderLeft from "../components/header/HeaderLeft";
import Settings from "../screens/settings/Settings";
import UpdateSettings from "../screens/settings/UpdateSettings";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerTitleAlign: "center",
  headerLeft: (p) => <HeaderLeft {...p} />,
  headerBackVisible: false,
};

function SettingsNavigation(props) {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Settings"
        component={Settings}
      />
      <Stack.Screen
        name="UpdateSettings"
        component={UpdateSettings}
        options={{
          title: "Update",
        }}
      />
    </Stack.Navigator>
  );
}

export default SettingsNavigation;

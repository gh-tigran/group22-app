import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderLeft from "../components/header/HeaderLeft";
import Settings from "../screens/settings/Settings";
import UpdateSettings from "../screens/settings/UpdateSettings";
import UsersList from "../screens/account/UsersList";
import SingleUser from "../screens/account/SingleUser";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerTitleAlign: "center",
  headerLeft: (p) => <HeaderLeft {...p} />,
  headerBackVisible: false,
};

function AccountNavigation(props) {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="UsersList"
        component={UsersList}
      />
      <Stack.Screen
        name="SingleUser"
        component={SingleUser}
      />
    </Stack.Navigator>
  );
}

export default AccountNavigation;

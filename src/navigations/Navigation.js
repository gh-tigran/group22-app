import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigation from "./HomeNavigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import SettingsNavigation from "./SettingsNavigation";
import AccountNavigation from "./AccountNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import { socketConnect, socketDisconnect, socketUserOffline } from "../store/actions/socket";
import UnauthorizedNavigation from "./UnauthorizedNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "../store/actions/users";
import SplashScreen from "react-native-splash-screen";

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
};

function Navigation(props) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.users.token);

  useEffect(() => {
    appInit();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(socketConnect(token));
    } else {
      dispatch(socketDisconnect());
    }
  }, [token]);

  const appInit = async () => {
    const [token] = await Promise.all([
      AsyncStorage.getItem("token"),
    ]);
    await dispatch(setToken(token));

    SplashScreen.hide();
  };

  return (
    <NavigationContainer>
      {token ? (
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen
            name="HomeNavigation"
            component={HomeNavigation}
            options={{
              title: "Home",
              tabBarIcon: (p) => <Icon size={p.size} color={p.color} name="home" />,
            }}
          />
          <Tab.Screen
            name="SettingsNavigation"
            component={SettingsNavigation}
            options={{
              title: "Settings",
              tabBarIcon: (p) => <Icon size={p.size} color={p.color} name="settings" />,
            }}
          />
          <Tab.Screen
            name="AccountNavigation"
            component={AccountNavigation}
            options={{
              title: "Account",
              tabBarIcon: (p) => <Icon size={p.size} color={p.color} name="person" />,
            }}
          />
        </Tab.Navigator>
      ) : (
        <UnauthorizedNavigation />
      )}
    </NavigationContainer>
  );
}

export default Navigation;

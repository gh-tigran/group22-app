import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";

const { FRONT_URL } = process.env;

function Settings(props) {
  const navigation = useNavigation();
  const token = useSelector(state => state.users.token);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `${FRONT_URL}/login?token=${token}`,
        }}
        injectedJavaScriptObject={{
          token,
        }}
        onMessage={(ev) => {
          try {
            const data = JSON.parse(ev.nativeEvent.data);
            if (data.action === "USER_SELECT") {
              console.log(data.user);
            }
          } catch (e) {

          }
        }}
      />
    </View>
  );
}

export default Settings;

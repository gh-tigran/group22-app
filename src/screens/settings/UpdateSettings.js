import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

function UpdateSettings(props) {
  const { params = {} } = useRoute();
  return (
    <View>
      <Text>Settings</Text>
      <Text>{params.name}</Text>
    </View>
  );
}

export default UpdateSettings;

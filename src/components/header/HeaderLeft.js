import React from "react";
import { Text, Touchable, TouchableOpacity } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

function HeaderLeft(props) {
  const navigation = useNavigation();
  if (!props.canGoBack) {
    return null;
  }
  const handlePress = () => {
    if (props.canGoBack) {
      navigation.goBack();
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: navigation.getState().routeNames[0] },
          ],
        }),
      );
    }
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Icon name="arrow-back" color={props.tintColor} size={25} />
    </TouchableOpacity>
  );
}

export default HeaderLeft;

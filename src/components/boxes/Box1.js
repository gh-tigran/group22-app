import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, useWindowDimensions, Easing, Animated } from "react-native";

function Box1(props) {
  const { isRight } = props;
  const { width } = useWindowDimensions();
  const left = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(left, {
      toValue: isRight ? width - 150 : 0,
      duration: 500,
      useNativeDriver: true,

    }).start(() => {
      console.log(2);
    });
  }, [isRight]);
  return (
    <Animated.View style={[styles.box, { transform: [{ translateX: left }] }]} />
  );
}

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    backgroundColor: "red",
    marginBottom: 10,
  },
});

export default Box1;

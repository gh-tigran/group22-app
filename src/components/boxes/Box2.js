import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue, withDecay, withDelay,
  withTiming,
} from "react-native-reanimated";

function Box1(props) {
  const { isRight } = props;
  const { width } = useWindowDimensions();
  const left = useSharedValue(0);

  const style = useAnimatedStyle(() => (
    { transform: [{ translateX: left.value }] }
  ));

  useEffect(() => {
    left.value = withTiming(isRight ? width - 150 : 0, {
      duration: 500,
    });
  }, [isRight]);

  return (
    <Animated.View style={[styles.box, style]} />
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

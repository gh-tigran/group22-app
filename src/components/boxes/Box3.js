import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, useWindowDimensions } from "react-native";
import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window");

function Box3(props) {
  const { isRight } = props;
  const ref = useRef();
  useEffect(() => {
    if (isRight) {
      ref.current.toRight(500);
    } else {
      ref.current.toLeft(500);
    }
  }, [isRight]);

  return (
    <Animatable.View
      ref={ref}
      duration={500}
      easing="linear"
      style={[styles.box]}
    />
  );
}

Animatable.initializeRegistryWithDefinitions({
  toRight: {
    0: {
      marginLeft: 0,
    },
    1: {
      marginLeft: width - 150,
    },
  }
});

Animatable.initializeRegistryWithDefinitions({
  toLeft: {
    0: {
      marginLeft: width - 150,
    },
    1: {
      marginLeft: 0,
    },
  }
});


const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    backgroundColor: "red",
    marginBottom: 10,
  },
});

export default Box3;

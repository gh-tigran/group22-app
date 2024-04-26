import React, { useCallback, useState } from "react";
import { Button, StyleSheet, View, Image } from "react-native";
import Box1 from "./boxes/Box1";
import Box2 from "./boxes/Box2";
import Box3 from "./boxes/Box3";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as DocumentPicker from "react-native-document-picker";

function Animations(props) {
  const [isRight, setRight] = useState(false);
  const [image, setImage] = useState(null);
  const selectImage = async () => {
    try {
      const data = await DocumentPicker.pickSingle({
        type: ["application/pdf"],
        mode: "open",
      });
      data.lastModifiedDate = new Date();
      const files = {
        lastModifiedDate: new Date(),
        name: data.name,
        size: data.size,
        type: data.type,
        uri: data.uri,
      };
    } catch (e) {
      if (DocumentPicker.isCancel(e)) {
        return;
      }
      throw e;
    }
    return;
    // const { assets } = await launchImageLibrary({
    //   mediaType: "photo",
    //   maxWidth: 500,
    //   maxHeight: 500,
    //   quality: 0.9,
    //   includeExtra: true,
    //   selectionLimit: 10,
    // });
    // console.log(assets);
    //
    // const files = {
    //   lastModifiedDate: new Date(),
    //   name: assets[0].fileName,
    //   size: assets[0].fileSize,
    //   type: assets[0].type,
    //   uri: assets[0].uri,
    // };
    // setImage(files);
  };
  return (
    <View style={styles.wrapper}>
      <Box1 isRight={isRight} />
      <Button title={isRight ? "Right" : "Left"} onPress={() => setRight(!isRight)} />
      <Button title="image picker" onPress={selectImage} />
      {image ? (
        <Image source={{ uri: image.uri }} style={styles.image} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  image: {
    width: 160,
    height: 160,
  },
});

export default Animations;

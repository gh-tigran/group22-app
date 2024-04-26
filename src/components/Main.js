import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  RefreshControl,
  PermissionsAndroid,
  Dimensions,
  SectionList,
  BackHandler,
  Alert,
  ToastAndroid,
  ActivityIndicator,
  useWindowDimensions,
  PixelRatio,
  StatusBar, TextInput, KeyboardAvoidingView,
} from "react-native";
import Contacts from "react-native-contacts";
import Modal from "react-native-modal";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from 'toastify-react-native'
function Main(props) {
  const flatList = useRef();
  const [loading, setLoading] = useState(false);
  const [activeContact, setActiveContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const { height: windowHeight, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  console.log(insets);

  useEffect(() => {
    // Toast.show("Hello !!!");
    Toast.success('Promised is resolved')
    const listener = BackHandler.addEventListener("hardwareBackPress", () => {

      // Alert.alert(
      //   "Exit app",
      //   "Are you sure you want to exit?",
      //   [
      //     {
      //       text: "Cancel",
      //       style: "cancel",
      //       onPress: () => {
      //       },
      //     },
      //     {
      //       text: "Exit",
      //       style: "destructive",
      //       onPress: () => {
      //         BackHandler.exitApp();
      //       },
      //     },
      //     {
      //       text: "Test  ",
      //       onPress: () => {
      //       },
      //     },
      //   ],
      // );

      return true;
    });
    return () => {
      listener.remove();
    };
  }, []);
  useEffect(() => {
    getContactsList();
  }, []);

  const getContactsList = async () => {
    setLoading(true);
    if (Platform.OS === "android") {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
    }
    const list = await Contacts.getAll();
    const listGrouped = _.chain(list)
      .groupBy(d => d.givenName ? d.givenName[0].toUpperCase() : "#")
      .map((data, title) => ({
        title,
        data,
      }))
      .orderBy(d => d.title)
      .value();
    setContacts(listGrouped);
    setLoading(false);
  };
  const handlePress = () => {
    const i = contacts.findIndex(u => u.givenName === "Qeri");
    flatList.current.scrollToIndex({
      index: i,
      animated: true,
      viewOffset: windowHeight - 80,
    });
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.5)" translucent />
      <KeyboardAvoidingView
        enabled={Platform.OS === "ios"} behavior="padding">
        <SectionList
          sections={contacts}
          stickySectionHeadersEnabled
          keyExtractor={(item) => item.recordID}
          ListEmptyComponent={() => <Text>Empty</Text>}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={getContactsList} />}
          renderSectionHeader={({ section }) => (
            <Text style={styles.header}>{section.title}</Text>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setActiveContact(item)} style={styles.item}>
              <Text>{item.givenName}</Text>
              <TextInput style={styles.input} />
            </TouchableOpacity>
          )}
        />
      </KeyboardAvoidingView>
      <Modal
        isVisible={activeContact !== null}
        onSwipeComplete={() => setActiveContact(null)}
        onBackdropPress={() => setActiveContact(null)}
        onBackButtonPress={() => setActiveContact(null)}
        swipeDirection={["left"]}
        animationIn="fadeInLeft"
        animationOut="fadeOutLeft"
        hideModalContentWhileAnimatin
        statusBarTranslucent
        deviceHeight={Platform.OS === "android" ? windowHeight + insets.top : windowHeight}
        style={{ backgroundColor: "white", padding: 30 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo nam odit quam quas sint. Beatae debitis
            dolore doloribus ex harum maiores modi, nesciunt pariatur quam quidem sunt ullam vero, voluptatum.
          </Text>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  item: {
    paddingHorizontal: 16,
    paddingLeft: 40,
  },
  hr: {
    width: "100%",
    height: 2,
    backgroundColor: "red",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 22,
  },
  box: {
    backgroundColor: "red",
    height: 100 * PixelRatio.get(),
    width: PixelRatio.getPixelSizeForLayoutSize(100),
  },
  input: {
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 1,
    height: 40,
    marginBottom: 5,
  },
});

export default Main;

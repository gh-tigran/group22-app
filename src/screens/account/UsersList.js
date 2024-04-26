import React from "react";
import { Button, FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const users = [
  { id: 1, name: "Poxos" },
  { id: 2, name: "Armen" },
  { id: 3, name: "Vazgen" },
];

function UsersList(props) {
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() => navigation.navigate("SingleUser", { id: item.id })}
          />
        )}
      />
    </View>
  );
}

export default UsersList;

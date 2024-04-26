import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

const users = [
  { id: 1, name: "Poxos" },
  { id: 2, name: "Armen" },
  { id: 3, name: "Vazgen" },
];

function UsersList(props) {
  const { params = {} } = useRoute();
  return (
    <View>
      <Text>
        {users.find(d => d.id === params.id).name}
      </Text>
    </View>
  );
}

export default UsersList;

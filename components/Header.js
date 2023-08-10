import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS } from "../constants";

const Header = ({ iconLeft, iconRight, iconPack: IconPack, title, onEdit }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {iconLeft && IconPack && (
          <IconPack name={iconLeft} size={24} style={styles.icon} />
        )}
      </TouchableOpacity>
      <Text style={{ ...FONTS.h4, color:COLORS.white }}>{title}</Text>
      <TouchableOpacity style={{ marginRight: 5 }} onPress={onEdit}>
        {iconRight && IconPack && (
          <IconPack name={iconRight} size={24} style={styles.icon} />
        )}
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  headerContainer: {
    height:150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: '#EEF2F3',
    borderRadius: 0,

  },
  icon: {
    marginRight: 10,
    color:COLORS.black
  },
});

export default Header;
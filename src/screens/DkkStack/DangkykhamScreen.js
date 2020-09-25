import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getQuanHeByBenhNhanId } from "../../services/fetchGET";
import { chuyenLoaiQuanHe } from "../../services/xuly";

const MyDiv = (props) => {
  const styles = {
    button: {
      height: 120,
      alignSelf: "stretch",
      alignContent: "center",
      backgroundColor: "#ffd500",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#ffd500",
      marginTop: 10,
      justifyContent: "center",
    },
    divStyle: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    textButton: {
      color: "#000",
      fontSize: 18,
      fontWeight: "700",
      margin: 10,
    },
  };
  return (
    <View style={props.style}>
      <TouchableOpacity onPress={props.onPress} style={styles.button}>
        <View style={styles.divStyle}>
          <Text style={styles.textButton}>{props.children}</Text>
          <AntDesign
            name="right"
            size={24}
            color="black"
            style={{ margin: 10, alignSelf: "center" }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const DangkykhamScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  chuyenLoaiQuanHe();
  useEffect(() => {
    getQuanHeByBenhNhanId(2)
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> Bạn đang đặt lịch khám cho ai ?</Text>
      <Modal
        animationType="fade"
        transparent={true}
        visible={loading}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalBox}>
          <View style={styles.modal}>
            <Text style={styles.modalText}> đang thực hiện</Text>
            <ActivityIndicator color="white" />
          </View>
        </View>
      </Modal>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <MyDiv
            onPress={() =>
              navigation.navigate("ThongtindangkykhamScreen", {
                benhnhanid: item.benhnhanphu.id,
                loaiquanhe: item.loaiquanhe,
              })
            }
          >
            {item.benhnhanphu.ten} - {chuyenLoaiQuanHe(item.loaiquanhe)}
          </MyDiv>
        )}
      />

      <View style={{ alignItems: "flex-end", marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ThongtindangkykhamScreen")}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30,
              }}
            >
              +
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                marginTop: 7,
              }}
            >
              {" "}
              Thêm người khác
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  modalBox: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  modal: {
    height: 35,
    width: 200,
    padding: 10,
    backgroundColor: "#0183fd",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    color: "white",
  },
  headerText: {
    color: "#0183fd",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default DangkykhamScreen;

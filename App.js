import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Linking,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  RegistryScreen,
  HomeScreen,
  SuccessScreen,
  LoginScreen,
  DangkykhamScreen,
  HosoScreen,
  SettingsScreen,
  ThemlichkhamScreen,
  QmkScreen,
  ThongtindangkykhamScreen,
  KiemtrathongtinScreen,
} from "./src/screens";
import { Loading } from "./src/components";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "./src/firebase/config";
import { color } from "react-native-reanimated";

//redux
import { createStore } from "redux";
import { Provider } from "react-redux";

const RootStack = createStackNavigator();
// const LoginStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const styleHeader = {
  headerStyle: {
    backgroundColor: "#fff",
  },
  headerTintColor: "black",
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontWeight: "600",
    elevation: 0,
  },
};

const HomeStack = createStackNavigator();

const HomeTab = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerLeft: null,
        headerStyle: {
          backgroundColor: "#3bccbb",
          height: 120,
          elevation: 0,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "600",
          color: "#fff",
        },
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Trang chủ",
        }}
      />
    </HomeStack.Navigator>
  );
};

const DKKStack = createStackNavigator();

const DangkykhamTab = ({ navigation }) => {
  return (
    <DKKStack.Navigator
      initialRouteName="DangkykhamScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#3bccbb",
          height: 120,
          elevation: 0,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "600",
          color: "#fff",
        },
        headerBackImage: () => {
          return (
            <AntDesign
              name="left"
              size={20}
              color="#fff"
              style={{ paddingLeft: 10 }}
            />
          );
        },
      }}
    >
      <DKKStack.Screen
        name="DangkykhamScreen"
        component={DangkykhamScreen}
        options={{
          title: "Đối tượng đăng ký khám",
        }}
      />
      <DKKStack.Screen
        name="ThemlichkhamScreen"
        component={ThemlichkhamScreen}
        options={{
          title: "Thêm lịch khám",
          headerRight: () => {
            return (
              <TouchableOpacity style={{ marginRight: 20 }}>
                <Text
                  style={{ fontSize: 14, color: "#fff" }}
                  onPress={() => navigation.push("DangkykhamScreen")}
                >
                  Hủy
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <DKKStack.Screen
        name="ThongtindangkykhamScreen"
        component={ThongtindangkykhamScreen}
        options={{
          title: "Thông tin đăng ký khám",
          headerRight: () => {
            return (
              <TouchableOpacity style={{ marginRight: 20 }}>
                <Text
                  style={{ fontSize: 14, color: "#fff" }}
                  onPress={() => navigation.push("DangkykhamScreen")}
                >
                  Hủy
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <DKKStack.Screen
        name="KiemtrathongtinScreen"
        component={KiemtrathongtinScreen}
        options={{
          title: "Thông tin bệnh nhân",
          headerRight: () => {
            return (
              <TouchableOpacity style={{ marginRight: 20 }}>
                <Text
                  style={{ fontSize: 14, color: "#fff" }}
                  onPress={() => navigation.push("DangkykhamScreen")}
                >
                  Hủy
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
    </DKKStack.Navigator>
  );
};

const HosoStack = createStackNavigator();

const HosoTab = () => {
  return (
    <HosoStack.Navigator initialRouteName="HosoScreen">
      <HosoStack.Screen
        name="HosoScreen"
        component={HosoScreen}
        options={{
          title: "Hồ sơ sức khỏe",
          headerStyle: {
            backgroundColor: "#3bccbb",
            elevation: 0,
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "600",
            color: "#fff",
          },
        }}
      />
    </HosoStack.Navigator>
  );
};

const SettingsStack = createStackNavigator();

const SettingsTab = () => {
  return (
    <SettingsStack.Navigator initialRouteName="SettingsScreen">
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Cài đặt",
          headerLeft: null,
          headerStyle: {
            backgroundColor: "#3bccbb",
            elevation: 0,
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "600",
            color: "#fff",
          },
        }}
      />
    </SettingsStack.Navigator>
  );
};

const TabsScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeScreen") {
            iconName = focused ? "ios-home" : "ios-home";
          } else if (route.name === "DangkykhamScreen") {
            iconName = focused ? "md-medkit" : "md-medkit";
          } else if (route.name === "HosoScreen") {
            iconName = focused ? "ios-list" : "ios-list";
          } else {
            iconName = focused ? "ios-settings" : "ios-settings";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ color }) => {
          let labelName;
          if (route.name === "HomeScreen") {
            labelName = "Home";
          } else if (route.name === "DangkykhamScreen") {
            labelName = "Đăng ký khám";
          } else if (route.name === "HosoScreen") {
            labelName = "Hồ sơ";
          } else {
            labelName = "Cài đặt";
          }
          return (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
              {" "}
              {labelName}{" "}
            </Text>
          );
        },
      })}
      tabBarOptions={{
        activeBackgroundColor: "#3bccbb",
        inactiveBackgroundColor: "#fff",
        activeTintColor: "#fff",
        inactiveTintColor: "gray",
        style: {
          height: 65,
        },
      }}
    >
      <Tab.Screen name="HomeScreen" component={HomeTab} />
      <Tab.Screen name="DangkykhamScreen" component={DangkykhamTab} />
      <Tab.Screen name="HosoScreen" component={HosoTab} />
      <Tab.Screen name="Settings" component={SettingsTab} />
    </Tab.Navigator>
  );
};

const MainStackScreen = () => {
  return (
    <MainStack.Navigator initialRouteName="Home" screenOptions={styleHeader}>
      <MainStack.Screen
        name="Home"
        component={TabsScreen}
        options={{
          title: "Trang tab",
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setUser(userData);
            setLoading(false);
          })
          .catch((error) => setLoading(false));
        setLoggedIn(true);
      } else {
        setLoading(false);
        setUser(null);
        setLoggedIn(false);
      }
    });
  }, []);

  if (loading) {
    return <Loading size="large" />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {loggedIn ? (
          <RootStack.Screen
            name="Main"
            options={{ headerShown: false }}
            component={MainStackScreen}
          />
        ) : (
          // {/* {props => <MainStackScreen {...props} user={user} />} */}
          // {/* </RootStack.Screen> */}

          <>
            <RootStack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: "Login page",
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name="Registry"
              component={RegistryScreen}
              options={{
                title: "Thông tin tài khoản",
                headerStyle: {
                  backgroundColor: "#fff",
                  height: 150,
                  elevation: 0,
                },
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontWeight: "600",
                  color: "#000",
                },
                headerBackImage: () => {
                  return (
                    <AntDesign
                      name="left"
                      size={20}
                      color="#000"
                      style={{ paddingLeft: 10 }}
                    />
                  );
                },
              }}
            />
            <RootStack.Screen
              name="SuccessScreen"
              component={SuccessScreen}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: "#3bccbb",
                  elevation: 0,
                },
              }}
            />
            <RootStack.Screen
              name="QmkScreen"
              component={QmkScreen}
              options={{
                title: "Quên mật khẩu",
              }}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;

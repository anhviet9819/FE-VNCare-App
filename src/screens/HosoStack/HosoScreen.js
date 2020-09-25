import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import Timeline from "react-native-timeline-flatlist";


class FirstRoute extends React.Component {
    constructor() {
        super();
        this.data = [
            {
                title: "Nguyễn Thanh Chính               11/04/2020",
                description:
                    " B.S Trần Quang A\n BV Bệnh nhiệt đới TW, Hà Nội \n Chuyên khoa Nhi ",
            },
            {
                title: "Nguyễn Quang Liêm                12/04/2020",
                description:
                    " Th.S BS Ngọc Trinh\n BV Phụ sản Tp.Hồ Chí Minh\n Chuyên khoa Hiếm muộn",
            },
            { time: "12:00", title: " " },
        ];
    }

    render() {
        return (
            <View style={styles.scene}>
                <Timeline
                    style={styles.list}
                    data={this.data}
                    circleSize={20}
                    circleColor="#cb2728"
                    lineColor="#cb2728"
                    rowContainerStyle={{ color: "black" }}
                    descriptionStyle={{
                        color: "gray",
                        borderWidth: 0.5,
                        borderColor: "gray",
                        borderRadius: 5,
                        padding: 10
                    }}
                    options={{
                        style: { paddingTop: 5 },
                    }}
                    showTime={false}
                />
            </View>
        );
    }
}


const SecondRoute = () => (
    <View style={styles.scene}><Text>Trang hai</Text></View>
);



const ThirdRoute = () => (
    <View style={styles.scene}><Text>Trang ba</Text></View>
);

const initialLayout = { width: Dimensions.get('window').width };

export default function HosoScreen() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Lịch hẹn khám' },
        { key: 'second', title: 'Các lần khám trước' },
        { key: 'third', title: 'Hồ sơ cá nhân' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={props =>
                <TabBar {...props}
                    renderLabel={({ route, focused, color }) => {
                        let color1;
                        color1 = focused ? 'white' : '#cbcbcb';
                        return (
                            <View style={{ flex: 1, backgroundColor: color1, borderRadius: 10, borderColor: '#cbcbcb', borderWidth: 0.5 }}>
                                <Text style={{ backgroundColor:"transparent", color: 'black', margin: 8, fontSize: 12 }}>
                                    {route.title}
                                </Text>
                            </View>
                        )
                    }}
                    pressColor='white'
                    indicatorStyle={{ backgroundColor: 'white', width: 0, height: 0, elevation: 0, }}
                    contentContainerStyle={{ justifyContent: 'center', }}
                    tabStyle={styles.tab}
                    style={styles.bar} />}
            onIndexChange={setIndex}
            initialLayout={[initialLayout]}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        //paddingTop:30,
        backgroundColor: "white",
    },
    list: {
        flex: 1,
        //marginTop:10,
    },
    scene: {
        flex: 1,
        backgroundColor: '#fff',
        borderColor: '#cbcbcb',
        borderTopWidth: 0.5,
    },
    bar: {
        backgroundColor: '#3bccbb',
        height: 30,
        elevation: 0,
    },
    tab: {
        width: 'auto',
        padding: 0,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 0.1,
        borderColor: '#cbcbcb',
        borderRadius: 10
    }
});


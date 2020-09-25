import React, { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, Picker, ActivityIndicator } from 'react-native'
import { MyButton, MyTextInput } from '../../components'
import { AntDesign } from '@expo/vector-icons'
import Svg, { Line } from 'react-native-svg'
import { getBenhNhanByBenhnhanId } from '../../services/fetchGET'
import { chuyenGioiTinh } from '../../services/xuly'
import { useEffect } from 'react'



const Textsao = (props) => {
    return (
        <View style={props.style}>
            <Text>{props.children}<Text style={{ color: 'red' }} >*    </Text></Text>
        </View>
    )
}

const MyDiv = (props) => {
    const styles = {
        button: {
            height: 35,
            alignSelf: 'stretch',
            alignContent: 'center',
            backgroundColor: '#2e3094',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#2e3094',
            justifyContent: 'center',
        },
        divStyle: {
            flexDirection: 'row',
            padding: 5
        },
        text: {
            color: '#fff',
            fontSize: 14,
            fontWeight: '700',
        }
    }
    return (
        <View style={props.style}>
            <TouchableOpacity onPress={props.onPress} style={styles.button}>
                <View style={styles.divStyle}>
                    <View style={{ flex: 1 }} />
                    <Text style={styles.text}>{props.children}</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <AntDesign name="right" size={16} color="#fff" />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}



const ThemlichkhamScreen = ({ route, navigation }) => {
    const [selectedValue, setSelectedValue] = useState("java");
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { benhnhanid } = route.params;
    const { loaiquanhe } = route.params;

    useEffect(() => {
        getBenhNhanByBenhnhanId(benhnhanid)
            .then((json) => setData(json))
            .finally(() => setIsLoading(false));
    }, []);
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <ScrollView>
                {isLoading ? <ActivityIndicator /> :
                    <View>
                        <MyTextInput style={{ marginTop: 10, marginBottom: 10 }} placeholder='Con trai' >
                            <Text>Mối quan hệ</Text>
                        </MyTextInput>
                        <View style={styles.container}>
                            <Text style={{ fontWeight: "bold" }}>Thông tin cá nhân</Text>
                            <Svg height="35" width="500" >
                                <Line x1="40" y1="10" x2="300" y2="10" stroke="gray" strokeWidth="1" />
                            </Svg>
                        </View>
                        <View style={styles.container}>
                            <Textsao >Họ và tên</Textsao>
                            <Text>{data.ten}</Text>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.container}>
                                <Textsao >Ngày sinh</Textsao>
                                <Text >{data.ngaysinh}</Text>
                            </View>

                            <View style={styles.container}>
                                <Textsao>Giới tính</Textsao>
                                <Text> {chuyenGioiTinh(data.gioitinh)}</Text>
                            </View>

                        </View>
                        <View style={styles.container}>
                            <Textsao >Số CMND/Hộ chiếu</Textsao>
                            <Text>{data.cmnd}</Text>
                        </View>
                        <View style={styles.container}>
                            <View style={{ flex: 1 }}>
                                <Text>Nơi cấp <Text>{data.noicap}</Text></Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>Ngày cấp <Text>{data.ngaycap}</Text></Text>
                            </View>

                        </View>
                        <MyTextInput placeholder='B120300304' style={{ marginTop: 5, marginBottom: 10 }}>
                            <Text>Thẻ BHYT</Text>
                        </MyTextInput>

                        <View style={styles.container}>
                            <Text style={{ fontWeight: "bold" }}>Thông tin liên lạc</Text>
                            <Svg height="35" width="500" >
                                <Line x1="45" y1="10" x2="300" y2="10" stroke="gray" strokeWidth="1" />
                            </Svg>

                        </View>

                        <View style={styles.box} >
                            <Textsao style={{ alignSelf: 'center' }}>Tỉnh/Thành phố</Textsao>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 30, width: 240 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                                <Picker.Item label="Đà Nẵng" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker>
                        </View>

                        <View style={styles.box} >
                            <Textsao style={{ alignSelf: 'center' }}>Quận/Huyện</Textsao>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 30, width: 240 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                                <Picker.Item label="Hải Châu" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker>
                        </View>

                        <View style={styles.box} >
                            <Textsao style={{ alignSelf: 'center' }}>Phường/Xã</Textsao>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 30, width: 240 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                                <Picker.Item label="Hòa Cường Bắc" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker>
                        </View>

                        <MyTextInput
                            placeholder='344 Đường 2/9'
                            style={{ marginTop: 5, marginBottom: 10 }}>
                            <Textsao>Số nhà</Textsao>
                        </MyTextInput>
                        <MyDiv style={{ marginTop: 30 }}>Thêm</MyDiv>
                    </View>
                }
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 35,
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

export default ThemlichkhamScreen;
import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { MyButton } from '../../components'
import anh from '../../../assets/imgs/check.png'

const SuccessScreen = ({ navigation }) => {
    return (
        <View style={{ padding: 30 }}>
            <Image source={anh} style={styles.img} />
            <Text style={styles.textstyle} >
                Bạn đã đăng ký tài khoản thành công
            </Text>
            <MyButton onPress={() => navigation.navigate('Login')} >
                ĐÓNG
            </MyButton>
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        marginTop: 100,
        marginBottom: 20,
        width: 80,
        height: 80,
        alignSelf: 'center'
    },
    textstyle: {
        marginBottom: 100,
        alignSelf: 'center',
        fontSize: 18
    }
})


export default SuccessScreen;
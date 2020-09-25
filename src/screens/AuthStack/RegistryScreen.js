import React from 'react'
import { Alert, Text, View, CheckBox, Image, Modal, StyleSheet, ScrollView, TextInput, ActivityIndicator, } from 'react-native'
import { firebase } from '../../firebase/config'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons';


function RegistryScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [b1, setB1] = useState(false)
    const [b2, setB2] = useState(false)
    const [b3, setB3] = useState(false)
    const [b4, setB4] = useState(false)
    const [b5, setB5] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [confirmPassword, setComfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [fullName, setFullName] = useState('')
    const [contact, setContact] = useState('')
    const [checkbox, setCheckbox] = useState(false);
    const onRegistry = () => {
        setError('')
        setLoading(true)

        if (password !== confirmPassword) {
            Alert.alert(
                '~~~~~~~ Đã có lỗi xảy ra ~~~~~~~ ',
                'Mật khẩu không trùng khớp',
                [
                    { text: 'OK' },
                ],
                { cancelable: true })
            setLoading(false)
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                    contact,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Home')
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch(onRegistryFail)
    }

    const onRegistryFail = () => {
        Alert.alert(
            '~~~~~~~ Đã có lỗi xảy ra ~~~~~~~',
            'Email và Mật khẩu không phù hợp hoặc đã tồn tại',
            [
                { text: 'OK', onPress: () => () => navigation.push('SuccessScreen') },
            ],
            { cancelable: true })
        setError('Đăng ký không thành công !')
        setLoading(false)
    }


    return (
        <View style={styles.container}>
            <ScrollView >
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
                            <Text style={styles.modalText}> Đang đăng ký</Text>
                            <ActivityIndicator color='white' />
                        </View>
                    </View>
                </Modal>
                <Text style={styles.saoText}>Email <Text style={{ color: 'red', }} >*</Text></Text>
                <View style={[styles.inputBox,
                b1 ? { borderColor: '#3bccbb', borderBottomWidth: 2 } : { borderColor: 'gray', borderBottomWidth: 1 }]}>
                    <TextInput
                        style={styles.inputText}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder='user@gmail.com'
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onFocus={() => setB1(true)}
                        onBlur={() => setB1(false)}
                        placeholderTextColor="#a5a5a5"
                        returnKeyType="next"
                        onSubmitEditing={() => { secondTextInput.focus(); }}
                        blurOnSubmit={false}
                        underlineColorAndroid="transparent"
                    >
                    </TextInput>
                </View>

                <Text style={styles.saoText}>Mật khẩu <Text style={{ color: 'red', }} >*</Text></Text>
                <View style={[styles.inputBox,
                b2 ? { borderColor: '#3bccbb', borderBottomWidth: 2 } : { borderColor: 'gray', borderBottomWidth: 1 }]}>
                    <TextInput
                        style={styles.inputText}
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        autoCapitalize="none"
                        placeholder='************'
                        onFocus={() => setB2(true)}
                        onBlur={() => setB2(false)}
                        placeholderTextColor="#a5a5a5"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        ref={(input) => { secondTextInput = input; }}
                        onSubmitEditing={() => { thirdTextInput.focus() }}
                        underlineColorAndroid="transparent"
                    >
                    </TextInput>
                </View>

                <Text style={styles.saoText}>Xác nhận mật khẩu<Text style={{ color: 'red', }} >*</Text></Text>
                <View style={[styles.inputBox,
                b3 ? { borderColor: '#3bccbb', borderBottomWidth: 2 } : { borderColor: 'gray', borderBottomWidth: 1 }]}>
                    <TextInput
                        style={styles.inputText}
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={(text) => setComfirmPassword(text)}
                        autoCapitalize="none"
                        placeholder='************'
                        onFocus={() => setB3(true)}
                        onBlur={() => setB3(false)}
                        placeholderTextColor="#a5a5a5"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        ref={(input) => { thirdTextInput = input; }}
                        onSubmitEditing={() => { fourthTextInput.focus() }}
                        underlineColorAndroid="transparent"
                    >
                    </TextInput>
                </View>
                <Text style={styles.saoText}>Số điện thoại <Text style={{ color: 'red', }} >*</Text></Text>
                <View style={[styles.inputBox,
                b4 ? { borderColor: '#3bccbb', borderBottomWidth: 2 } : { borderColor: 'gray', borderBottomWidth: 1 }]}>
                    <TextInput
                        style={styles.inputText}
                        value={contact}
                        onChangeText={(text) => setContact(text)}
                        placeholder='Nhập số điện thoại liên hệ'
                        textContentType="telephoneNumber"
                        autoCapitalize="none"
                        keyboardType="numeric"
                        onFocus={() => setB4(true)}
                        onBlur={() => setB4(false)}
                        placeholderTextColor="#a5a5a5"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        ref={(input) => { fourthTextInput = input; }}
                        onSubmitEditing={() => { fifthTextInput.focus() }}
                        underlineColorAndroid="transparent"
                    >
                    </TextInput>
                </View>

                <Text style={styles.saoText}>Họ và Tên</Text>
                <View style={[styles.inputBox,
                b5 ? { borderColor: '#3bccbb', borderBottomWidth: 2 } : { borderColor: 'gray', borderBottomWidth: 1 }]}>
                    <TextInput
                        style={styles.inputText}
                        value={fullName}
                        onChangeText={(text) => setFullName(text)}
                        placeholder='Nhập Họ và Tên'
                        autoCapitalize="characters"
                        textContentType="name"
                        onFocus={() => setB5(true)}
                        onBlur={() => setB5(false)}
                        placeholderTextColor="#a5a5a5"
                        ref={(input) => { fifthTextInput = input; }}
                        underlineColorAndroid="transparent"
                    >
                    </TextInput>
                </View>
                <Text style={[styles.luuyText, { color: 'red', marginTop: 30 }]}>Lưu ý:</Text>
                <Text style={styles.luuyText} textDecorationStyle='dotted' >Họ tên phải là tên trên các giấy tờ tùy thân CMND/CCCD/Hộ Chiếu</Text>
                <Text style={styles.luuyText}>Mật khẩu có độ dài 6 ký tự, bao gồm :</Text>
                <Text style={styles.luuyText}><Entypo name="dot-single" size={10} color="black" />1 ký tự hoa</Text>
                <Text style={styles.luuyText}><Entypo name="dot-single" size={10} color="black" />1 ký tự số</Text>
                <View style={styles.checkboxBox}>
                    <CheckBox
                        value={checkbox}
                        onValueChange={setCheckbox}
                    />
                    <View style = {{flexDirection:'row'}}>
                        <Text> Tôi đã đọc và đồng ý với </Text>
                        <TouchableOpacity>
                            <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Điều khoản sử dụng</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.buttonBox}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onRegistry}
                        disabled={!checkbox} >
                        <Text style={styles.buttonText}>
                            Đăng ký tài khoản
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* <Text style={{ alignSelf: 'center', marginTop: 10 }}>{error}</Text> */}
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    modalBox: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    modal: {
        height: 40,
        width: 200,
        padding: 10,
        backgroundColor: "#0183fd",
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-around',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        color: 'white'
    },
    saoText: {
        marginTop: 20,
        color: 'gray',
        fontSize: 16,
    },
    inputBox: {
        flexDirection: "row",
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        height: 50,
    },
    inputText: {
        fontSize: 16,
        width: 350
    },
    luuyText: {
        marginTop: 5
    },
    buttonBox: {
        alignSelf: 'stretch',
        marginTop: 50,
        marginBottom: 20
    },
    button: {
        backgroundColor: '#3bccbb',
        borderRadius: 10,
        borderColor: '#3bccbb',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    checkboxBox: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default RegistryScreen;
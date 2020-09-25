import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Linking, CheckBox, Image, StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Loading, MyTextInput } from '../../components'
import { TextInput } from 'react-native-gesture-handler'
import { firebase } from '../../firebase/config';
import { Octicons } from '@expo/vector-icons';

const MyButton = (props) => {
    return (
        <View style={styles.buttonBox}>
            <TouchableOpacity onPress={props.onPress} style={[styles.button, props.stylebox]}>
                <Text style={[styles.buttonText, props.styletext]}>
                    {props.children}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

function LoginScreen({ navigation }) {
    const [hide, setHide] = useState(true);
    const [b1, setB1] = useState(false);
    const [b2, setB2] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [checkbox, setCheckbox] = useState(true);


    const onLogin = () => {
        setLoading(true)
        setError('')
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        navigation.navigate('Main')
                    })
                    .catch(error => {
                        onLoginFail
                    });
            })
            .catch(onLoginFail)
    }


    const onLoginSuccess = () => {
        setEmail('')
        setPassword('')
        setError('')
        setLoading(false)
    }

    const onLoginFail = () => {
        setError('fail')
        setLoading(false)
    }

    const hideOrNot = () => {
        if (hide) {
            return (
                <Octicons name="eye" size={24} color="#3bccbb" />
            )
        } else {
            return (
                <Octicons name="eye-closed" size={24} color="#3bccbb" />
            )

        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.containerItem} keyboardShouldPersistTaps='always' >
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
                            <Text style = {styles.modalText}> Đang đăng nhập</Text>
                            <ActivityIndicator color='white' />
                        </View>
                    </View>
                </Modal>
                <Image source={require('../../../assets/imgs/vncare2.jpg')} style={{ width: 250, height: 250, }} />
                <Text style={styles.headerText}> Đăng nhập </Text>
                <View>
                    <View style={[
                        styles.inputBox,
                        {borderColor: b1 ? '#3bccbb' : 'gray' , borderBottomWidth: b1 ?  2  : 0.5 }
                        ]}>
                        <TextInput style={{ fontSize: 16, width: 350 }}
                            value={email}
                            onChangeText={text => setEmail(text)}
                            placeholder='user@gmail.com'
                            placeholderTextColor='gray'
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            onFocus={() => setB1(true)}
                            onBlur={() => setB1(false)}
                            returnKeyType="next"
                            onSubmitEditing={() => { secondTextInput.focus(); }}
                            blurOnSubmit={false}>
                        </TextInput>
                    </View>
                    <View style={[
                        styles.inputBox,
                        {borderColor: b2 ? '#3bccbb' : 'gray' , borderBottomWidth: b2 ?  2  : 0.5 }
                        ]}>
                        <TextInput style={{ flex: 13, fontSize: 16, width: 300 }}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={hide}
                            placeholder='**************'
                            placeholderTextColor='gray'
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            onFocus={() => setB2(true)}
                            onBlur={() => setB2(false)}
                            ref={(input) => { secondTextInput = input; }}>
                        </TextInput>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => { setHide(!hide) }} >
                            {hideOrNot()}
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.qmkBox}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CheckBox
                            value={checkbox}
                            onValueChange={setCheckbox}
                        />
                        <Text style={styles.qmkText}> Ghi nhớ</Text>
                    </View>
                    <TouchableOpacity style={{ justifyContent: 'center' }}
                        onPress={() => navigation.navigate('QmkScreen')}
                    >
                        <Text style={styles.qmkText}>
                            Quên mật khẩu?
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ alignSelf: 'stretch' }}>
                    <MyButton onPress={onLogin}
                        stylebox={{
                            backgroundColor: '#3bccbb',
                            borderRadius: 10,
                            borderColor: '#3bccbb'
                        }}>
                        Đăng nhập
                        </MyButton>
                </View>

                <View style={{ alignSelf: 'stretch' }}>
                    <MyButton onPress={() => navigation.navigate('Registry')}
                        stylebox={{
                            backgroundColor: '#fff',
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#3bccbb'
                        }}
                        styletext={{ color: '#3bccbb' }}
                    >
                        Đăng ký
                    </MyButton>
                </View>

                <Text>{error}</Text>
                <StatusBar style="auto" />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
        paddingRight: 20,
        paddingLeft: 20,
    },
    containerItem: {
        alignItems: 'center',
    },
    modalBox: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    modal: {
        height:40,
        width:200,
        padding:10,
        backgroundColor: "#0183fd",
        borderRadius: 10,
        flexDirection:'row',
        alignItems: "center",
        justifyContent:'space-around',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText:{
        color:'white'
    },
    headerText: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        margin: 15, 
        color: '#3bccbb'
    },
    inputBox: {
        flexDirection: "row",
        alignSelf: 'stretch',
        alignItems: 'center',
        margin: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
    },
    qmkBox: {
        alignSelf: 'stretch',
        marginTop: 20,
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    qmkText: {
        color: '#0183fd',
        fontSize: 15
    },
    buttonBox: {
        alignSelf: 'stretch',
        height: 50,
        marginTop: 15
    },
    button: {
        flex: 1,
        alignSelf: 'stretch',
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        alignSelf: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
    }
})

export default LoginScreen;
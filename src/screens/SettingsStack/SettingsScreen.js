import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { firebase } from '../../firebase/config'

class SettingsScreen extends React.Component {
    render() {
        var user = firebase.auth().currentUser;
        var str = `~~~~~ FIREBASE USER INFO ~~~~~\n\n`
        if (user != null) {
            user.providerData.forEach(function (profile) {
                str += "\n Sign-in provider: " + profile.providerId;
                str += "\n Provider-specific UID: " + profile.uid;
                str += "\n Name: " + profile.displayName;
                str += "\n Email: " + profile.email;
                str += "\n Photo URL: " + profile.photoURL;
            });
        }
        return (
            <View style={styles.container}>
                <Text style={styles.container} >{str}</Text>
                <Button
                    onPress={() => firebase.auth().signOut()}
                    title="log out"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default SettingsScreen;
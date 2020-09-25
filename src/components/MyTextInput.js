import React from 'react'
import { TextInput, View } from 'react-native'

const MyTextInput = (props) => {
    return (
        <View style={props.style}>
            <View style={styles.div} >
                <View style={styles.children} >{props.children}</View>
                <TextInput style={styles.inputbox} placeholder={props.placeholder} placeholderTextColor="gray" underlineColorAndroid="transparent" keyboardShouldPersistTaps='always' />
            </View>
        </View>
    )
}

const styles = {
    div: {
        flexDirection: "row",
        justifyContent: 'space-between',
        flexWrap: "wrap",
        alignItems: 'center',
    },
    inputbox: {
        flex: 3,
        height: 30,
        paddingLeft:10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 3,
        
    },
    children: {
        flex: 2,
        flexDirection: 'row',
    }
}

export default MyTextInput;
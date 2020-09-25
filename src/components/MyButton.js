import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'

const MyButton = (props) => {
    return (
        <View style={props.style}>
            <TouchableOpacity onPress={props.onPress} style={styles.button}>
                <Text style={styles.textButton}>
                    {props.children}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = {
    button: {
        
        alignSelf: 'stretch',
        alignContent: 'center',
        backgroundColor: '#2e3094',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#2e3094',
        marginRight: 5,
        marginLeft: 5,
        justifyContent: 'center',
    },
    textButton: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        padding: 10,
        justifyContent: 'space-between',
    }
}

export default MyButton;
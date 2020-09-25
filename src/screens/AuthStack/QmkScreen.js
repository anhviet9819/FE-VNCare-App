import React from 'react'
import { View,Text,StyleSheet } from 'react-native'

export default function QmkScreen(){
    return(
        <View style={styles.container}>
            <Text>
                Quen mat khau
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    }
})
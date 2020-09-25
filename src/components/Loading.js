import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

export default function Loading({ size }) {
    return (
        <View style={styles.container}>
            <Text>Loading</Text>
            <ActivityIndicator size={size || "large"} />
        </View>
    )
}
const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
}
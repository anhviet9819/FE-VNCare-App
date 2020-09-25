import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Header = ({children})=>{
    return(
        <View
          style={{
            height: 45,
            marginTop: 20,
            backgroundColor: 'red',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
                {children}
          </Text>
        </View>
    )

}

// const styles = StyleSheet.create({
//     header:{
//         height:50,
//         backgroundColor: '#2183f3',
//     }
// });

export default Header;
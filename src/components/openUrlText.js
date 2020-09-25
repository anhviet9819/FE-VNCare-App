import React,{useCallback} from 'react'
import {Button, Linking ,Text } from 'react-native'
import { color } from 'react-native-reanimated';

const supportedURL = "https://google.com";
const OpenURLText = ({ url, children }) => {
    // const handlePress = useCallback(async () => {
    //     // Checking if the link is supported for links with custom URL scheme.
    //     const supported = await Linking.canOpenURL(url);

    //     if (supported) {
    //         // Opening the link with some app, if the URL scheme is "http" the web link should be opened placeholderTextColor = "white"
    //         // by some browser in the mobile
    //         await Linking.openURL(url);
    //     } else {
    //         Alert.alert(`Don't know how to open this URL: ${url}`);
    //     }
    // }, [url]);
    const handlePress = () =>{ Linking.openURL(url) }

    return <Text title={children} onPress={ handlePress } ></Text>;
};

export default OpenURLText;
import { ImageBackground, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../../constants/images';
import FormField from '../../components/formField';


const { width, height } = Dimensions.get('window');

export default function SignIn() {
    return (
        <SafeAreaView styles={styles.container}>
            <ImageBackground style={styles.imageBackground} source={Images.pexels_stephen_tam} >
                <View style={styles.transparentViewStyle}>
                    <Text style={styles.text}>asdfsdfdsfdsf</Text>
                    <FormField />
                </View>


            </ImageBackground>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: "center",
        alignItems: "center"
    },
    transparentViewStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        marginTop: height * 0.2,
        width: width * 0.85,
        height: width,
        elevation: 4,

        shadowColor: "orange",
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
})
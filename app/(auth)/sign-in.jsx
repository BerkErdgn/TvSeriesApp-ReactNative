import { ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../../constants/images';
import FormField from '../../components/formField';
import CustomButton from '../../components/customButton';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from '../../components/loading';
import { useAuth } from '../../context/authContext';


const { width, height } = Dimensions.get('window');

export default function SignIn() {

    const emailRef = useRef("");
    const passwordRef = useRef("");
    const { login } = useAuth();
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert("Sign In", "Please fill all the fields!");
            return;
        }

        //login process
        setLoading(true);
        const response = await login(emailRef.current, passwordRef.current);
        setLoading(false);
        if (!response.success) {
            Alert.alert("Sign In", response.msg);
        }

    }

    return (
        <SafeAreaView styles={styles.container}>
            <ImageBackground style={styles.imageBackground} source={Images.pexels_stephen_tam} >
                {/* Transparent View */}
                <Animated.View entering={FadeInDown.duration(500).springify()} style={styles.transparentViewStyle}>
                    <Text style={styles.text}>Login</Text>
                    {/* Email FormField */}
                    <FormField
                        handlerChangeText={(value) => emailRef.current = value}
                        title={"E-mail"}
                        placeholder={"Email address"}
                    />
                    {/* Password FormField */}
                    <FormField
                        handlerChangeText={(value) => passwordRef.current = value}
                        title={"Password"}
                        placeholder={"Password"}
                    />



                    <View>
                        {
                            loading ? (
                                // Loading Spring 
                                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                    <Loading />
                                </View>
                            ) : (
                                //    Login Button 
                                <CustomButton customStyle={{ margin: 20, width: width * 0.5, height: 50 }} title={"Login"} handleLogin={handleLogin} />
                            )

                        }
                    </View>

                    {/* SignUp text  */}
                    <TouchableOpacity style={styles.signInContainer} onPress={() => router.push("/sign-up")}>
                        <Text style={styles.signInText}> If you don't have any account, SIGN UP HERE</Text>
                    </TouchableOpacity>

                </Animated.View>


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
        justifyContent: "flex-end",
        alignItems: "center"
    },
    transparentViewStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        marginBottom: 30,
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
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'start',
        marginTop: 50,
        marginHorizontal: 15,
        fontFamily: 'SpaceMono'
    },
    signInContainer: {
        alignItems: "center",
        margin: 10,
    },
    signInText: {
        color: "white"

    }
})
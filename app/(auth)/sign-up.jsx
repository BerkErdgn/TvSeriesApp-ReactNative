import { ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../../constants/images';
import Animated, { FadeInDown } from 'react-native-reanimated';
import FormField from '../../components/formField';
import CustomButton from '../../components/customButton';
import { router } from 'expo-router';
import Loading from '../../components/loading';
import { useAuth } from "../../context/authContext";


const { width, height } = Dimensions.get('window');

export default function SignUp() {

    const emailRef = useRef("");
    const { register } = useAuth();
    const passwordRef = useRef("");
    const verifyPasswordRef = useRef("");
    const [loading, setLoading] = useState(false)

    const handleRegister = async () => {
        if (!emailRef.current || !passwordRef.current || !verifyPasswordRef) {
            Alert.alert("Sign In", "Please fill all the fields!");
            return;
        }
        if (passwordRef.current === verifyPasswordRef) {
            Alert.alert("Sign In", "Password and Verify Password must  be same");
            return;
        }
        setLoading(true);

        let response = await register(emailRef.current, passwordRef.current);
        setLoading(false);

        console.log("get resoult: ", response);
        if (!response.success) {
            Alert.alert("Sign Up", response.msg);
        }

        console.log(emailRef.current);
    }

    return (
        <SafeAreaView styles={styles.container}>
            <ImageBackground source={Images.pexels_cottonbro_studio_8273617} style={styles.imageBackground}>
                <Animated.View entering={FadeInDown.duration(500).springify()} style={styles.transparentViewStyle}>
                    <Text style={styles.text}>Sign Up</Text>
                    <FormField
                        title={"E-mail"}
                        placeholder={"Email address"}
                        handlerChangeText={(value) => emailRef.current = value}
                    />
                    <FormField
                        title={"Password"}
                        placeholder={"Password"}
                        handlerChangeText={(value) => passwordRef.current = value}

                    />
                    <FormField
                        title={"Verify Password"}
                        placeholder={"Verify Password"}
                        handlerChangeText={(value) => verifyPasswordRef.current = value}
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
                                <CustomButton customStyle={{ margin: 20, width: width * 0.5, height: 50 }} title={"Sign Up"} handleLogin={handleRegister} />
                            )

                        }
                    </View>

                    <TouchableOpacity style={styles.signInContainer} onPress={() => router.push("/sign-in")}>
                        <Text style={styles.signInText}> I have a account, GO LOGIN</Text>
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
        height: height * 0.60,
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
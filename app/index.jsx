import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import { setItem } from './utils/asyncStorage';

const { width, height } = Dimensions.get('window');


export default function App() {
    const router = useRouter();

    const handleDone = async () => {
        await setItem("onboarded", "1");
        router.push("/sign-in");
    }

    const doneButton = (props) => {
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>Done</Text>
            </TouchableOpacity>
        );
    }


    return (
        <SafeAreaView style={styles.container}>
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                DoneButtonComponent={doneButton}
                containerStyles={{ paddingHorizontal: 15 }}
                pages={[
                    {
                        backgroundColor: "#151718",
                        image: (
                            <View style={styles.lottie}>
                                <LottieView style={{ flex: 1 }} source={require('../assets/animations/movie.json')} autoPlay loop />
                            </View>
                        ),
                        title: 'Hi !',
                        subtitle: 'Prepare your corn and food, there are many TV series we can watch.',
                    },
                    {
                        backgroundColor: "#151718",
                        image: (
                            <View style={styles.lottie}>
                                <LottieView style={{ flex: 1 }} source={require('../assets/animations/popcorn.json')} autoPlay loop />
                            </View>
                        ),
                        title: 'Shhhhh!',
                        subtitle: 'How about choosing a good series? Or is there an artist you are curious about? Here is the right place… (Between us, do not tell anyone.)',
                    },
                ]}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    lottie: {
        width: width * 0.9,
        height: width,
    },
    doneButton: {
        padding: 20,
        backgroundColor: "white",
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
    }

})
import { StyleSheet, Text, View, Alert, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from "../../context/authContext";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import CustomButton from '../../components/customButton';
import TitleComponent from '../../components/titleComponent';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen() {
    const { logout } = useAuth();
    const [userEmail, setUserEmail] = useState("");



    const handleLogout = async () => {
        await logout();
    }

    useEffect(() => {
        const getCurrentUser = () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUserEmail(user.email);
                } else {
                    console.log('No user is signed in');
                    Alert.alert("Error", "Error");
                }
            });
        };

        getCurrentUser();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TitleComponent />
            <View style={styles.mainContainer}>
                <Ionicons name="person-circle-outline" size={150} color="white" />
                <Text style={{ color: "white" }}>{userEmail}</Text>
                <CustomButton title="Sign Out" handleLogin={handleLogout} customStyle={{ margin: 15, paddingHorizontal: 60, paddingVertical: 10 }} />

            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: height / 3,

    }
})
import { StyleSheet, Text, View, Button, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from "../../context/authContext";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    }

    return (
        <SafeAreaView>
            <Text style={{ color: "white" }}>ProfileScreen</Text>
            <Pressable onPress={handleLogout}>
                <Text style={{ color: "white" }}>Sign out</Text>
            </Pressable>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
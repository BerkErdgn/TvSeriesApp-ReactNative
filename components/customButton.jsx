import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function CustomButton({ customStyle, title, handleLogin }) {
    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={handleLogin} style={[styles.container, customStyle]}>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgb(157, 102, 11)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
    title: {
        fontSize: 20,
        fontWeight: "700"
    },

})
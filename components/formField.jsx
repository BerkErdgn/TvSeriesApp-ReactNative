import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Images from "../constants/images";

export default function FormField({ title, value, placeholder, handlerChangeText }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={{ flex: 1, color: "white", fontSize: 20, margin: 5 }}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="grey"
                    onChangeText={handlerChangeText}
                    secureTextEntry={title === "Password" && !showPassword || title == "Verify Password"}
                />
                {
                    title !== "E-mail" && (
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Image source={!showPassword ? Images.eye : Images.eyehide} style={{ width: 25, height: 25, resizeMode: "contain", marginEnd: 7 }} />
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: "white",
        marginTop: 15,
        marginHorizontal: 15,

    },
    textInputContainer: {
        width: "90%",
        height: 40,
        marginHorizontal: 15,
        marginTop: 5,
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 13,
        flexDirection: "row",
        alignItems: "center",
    }

})
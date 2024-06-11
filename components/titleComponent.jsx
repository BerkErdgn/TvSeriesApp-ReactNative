import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function TitleComponent() {
    return (
        <View style={styles.container}>
            <Text style={styles.tvTitle}>Tv</Text>
            <Text style={styles.seriesTitle}>Series</Text>
            <Text style={styles.appTitle}>App</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 5
    },
    tvTitle: {
        color: "#FCA311",
        fontSize: 44,
        fontWeight: "800"

    },
    seriesTitle: {
        color: "#D6D6D6",
        fontSize: 44,
        fontWeight: "800"
    },
    appTitle: {
        color: "#14213C",
        fontSize: 44,
        fontWeight: "800"
    },
})
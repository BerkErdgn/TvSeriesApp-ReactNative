import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

export default function detailScreen() {
    const { id } = useLocalSearchParams();
    console.log(id);
    return (
        <View>
            <Text>id</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
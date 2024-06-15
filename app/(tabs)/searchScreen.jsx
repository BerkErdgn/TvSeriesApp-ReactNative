import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TitleComponent from '../../components/titleComponent'
import SearchComponent from '../../components/searchComponent'

export default function SearchScreen() {
    return (
        <SafeAreaView>
            <ScrollView>
                <TitleComponent />
                <SearchComponent />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
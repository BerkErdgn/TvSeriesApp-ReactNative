import { StyleSheet, Text, View, Dimensions, ScrollView, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getPersonData } from '../../data/api/tvSeriesApi';
import { useLocalSearchParams } from 'expo-router';


const { width, height } = Dimensions.get('window');


export default function PersonDetail() {
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [personData, setPersonData] = useState([])

    useEffect(() => {
        const fetchTvSeriesData = async (id) => {
            try {
                setLoading(true);
                const result = await getPersonData(id);
                setPersonData(result.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }


        fetchTvSeriesData(id)

    }, [])

    return (
        <ScrollView>
            {
                loading ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                ) : (
                    <View style={styles.mainContainer}>
                        {/* Image */}
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: personData.image.medium }}
                                style={{ width: width / 4, height: height * 0.4 }}
                                resizeMode="contain"
                            />
                        </View>


                        {/* Data */}
                        <View style={styles.dataContainer}>
                            {/* title */}
                            <View style={styles.titleContainer}>
                                <Text style={{ justifyContent: "center", alignItems: "center" }}>{personData.name}</Text>
                            </View>


                            {/*SubData Container  */}
                            <View style={styles.subDataContainer}>
                                <Text style={styles.title}>Country: {personData.country.timezone ? personData.country.timezone : ""}</Text>
                                <Text style={styles.title}>Gender: {personData.gender}</Text>
                            </View>
                            <View style={styles.subDataContainer}>
                                <Text style={styles.title}>Birthday: {personData.birthday}</Text>
                                <Text style={styles.title}>Deathday: {personData.deathday}</Text>
                            </View>
                        </View>

                    </View>
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {

    },
    dataContainer: {
        backgroundColor: "#DC5F00",
        margin: 30,
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,

        elevation: 4,
        shadowColor: "white",
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
    },
    subDataContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    title: {
        color: "white",
        fontSize: 14
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
    }
})
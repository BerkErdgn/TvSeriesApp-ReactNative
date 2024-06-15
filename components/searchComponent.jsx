import { StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, ActivityIndicator, ScrollView, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather, Entypo } from '@expo/vector-icons';
import { getSearchedTvSeriesData } from '../data/api/tvSeriesApi';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { Link } from 'expo-router';


const { width, height } = Dimensions.get('window');

export default function SearchComponent() {

    const [searchTvSeries, setSearchTvSeries] = useState("")
    const [loading, setLoading] = useState(true);
    const [searchedTvSeriesData, setSearchedTvSeriesData] = useState([]);


    const clearButtonHandler = () => {
        setSearchTvSeries("");
    }

    useEffect(() => {
        const fetchSearchedTvSeries = async () => {
            if (searchTvSeries === "") {
                setLoading(false);
                return;
            };
            try {
                setLoading(true);
                const result = await getSearchedTvSeriesData(searchTvSeries);
                if (result.success) {
                    setSearchedTvSeriesData(result.data);
                } else {
                    console.error(result.msg);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }

        }

        fetchSearchedTvSeries();
    }, [searchTvSeries]);




    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.search}>
                    <TouchableOpacity>
                        <Feather name="search" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <TextInput
                    placeholder='Search Tv Series'
                    style={styles.field}
                    placeholderTextColor="white"
                    onChangeText={(text) => setSearchTvSeries(text)}
                    value={searchTvSeries}
                />
                {
                    searchTvSeries === "" ? null : (
                        <View style={styles.cross}>
                            <TouchableOpacity onPress={clearButtonHandler}>
                                <View>
                                    <Entypo name="cross" size={24} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }

                <View>

                </View>
            </View>
            {
                loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                ) : (
                    <View>

                        {
                            searchedTvSeriesData.length === 0 ? (
                                <View>

                                </View>
                            ) : (
                                <View>
                                    <Animated.Text entering={FadeInLeft.delay(1500).duration(600).springify().damping(12)} style={styles.allTvSeriesTitle}>TV series you are looking for : {searchTvSeries}</Animated.Text>
                                    <FlatList
                                        data={searchedTvSeriesData}
                                        showsVerticalScrollIndicator={false}
                                        style={{ marginVertical: 20 }}
                                        keyExtractor={item => item.show.id}
                                        renderItem={({ item, i }) => item.show.image && item.show.image.medium ? <AllTvSeriesCard item={item} index={i} /> : null}
                                        numColumns={3}
                                        scrollEnabled={false}
                                    />
                                </View>
                            )
                        }

                    </View>
                )
            }
        </ScrollView>
    )
}

const AllTvSeriesCard = ({ item, index }) => {
    return (
        <Link href={`/detail/${item.show.id}`} asChild>

            <TouchableOpacity style={{ flex: 1 }} >
                <Animated.View entering={FadeInDown.delay(index * 1000).duration(600).springify().damping(12)} style={styles.cardStyle}>
                    <Image
                        source={{ uri: item.show.image.medium }}
                        sharedTransitionTag={item.id}
                        style={{ width: width / 4, borderRadius: 10, height: width / 3, }}
                        resizeMode="contain"
                    />
                    <Text style={styles.tvSeriesTitle}>{item.show.name}</Text>
                </Animated.View>
            </TouchableOpacity>

        </Link>

    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flexDirection: "row",
        height: 50,
        margin: 30,
        alignItems: "center",
        justifyContent: "center",
        color: "#444444",
        borderRadius: 20,
        borderWidth: 1,

        elevation: 4,
        shadowColor: "orange",
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
    },
    search: {
        marginHorizontal: 10
    },
    field: {
        flex: 1,
        color: "white"
    },
    cross: {
        marginHorizontal: 10
    },

})
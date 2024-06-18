import { Image, StyleSheet, Text, View, Dimensions, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router';
import { getTvSeriesCast, getTvSeriesCrew, getTvSeriesDetail, getTvSeriesEpisodes } from '../../data/api/tvSeriesApi';
import { ScrollView } from 'react-native';
import { FontAwesome6 } from "@expo/vector-icons"
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../../context/authContext';
import { auth } from "../../firebaseConfig"
import { onAuthStateChanged } from 'firebase/auth';


const { width, height } = Dimensions.get('window');

export default function detailScreen() {
    const { id } = useLocalSearchParams();

    const [tvSeriesDetailData, setTvSeriesDetailData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [episodesData, setEpisodesData] = useState([]);
    const [castData, setCastData] = useState([]);
    const [crewData, setCrewData] = useState([]);
    const { sendData } = useAuth();

    const [name, setName] = useState("");
    const [userEmail, setUserEmail] = useState("");


    //Get user from firebase
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

    //Add Favorite TvSeries İn Firebase
    const handleAddFavoriteButton = async () => {
        try {
            let response = await sendData(userEmail, tvSeriesDetailData.id, tvSeriesDetailData.image.medium, tvSeriesDetailData.name);
            Alert.alert("Favorilere Eklendi");
        } catch (error) {
            Alert.alert(error);
        }
    }

    useEffect(() => {

        const fetchTvSeriesData = async (id) => {
            try {
                setLoading(true);
                const result = await getTvSeriesDetail(id);
                setTvSeriesDetailData(result.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        const fetchEpisodeData = async (id) => {
            try {
                setLoading(true);
                const result = await getTvSeriesEpisodes(id);
                setEpisodesData(result.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        const fetchCastData = async (id) => {
            try {
                setLoading(true);
                const result = await getTvSeriesCast(id);
                setCastData(result.data._embedded.cast);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        const fetchCrewData = async (id) => {
            try {
                setLoading(true);
                const result = await getTvSeriesCrew(id);
                setCrewData(result.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchTvSeriesData(id);
        fetchEpisodeData(id);
        fetchCastData(id);
        fetchCrewData(id);
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
                        <Image
                            source={{ uri: tvSeriesDetailData.image ? tvSeriesDetailData.image.medium : null }}
                            style={{ width: width, height: height * 0.4 }}
                            resizeMode="stretch"
                        />
                        {/* Title and Like Button */}
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTitle} >{tvSeriesDetailData.name}</Text>

                            <TouchableOpacity onPress={handleAddFavoriteButton}>
                                <View style={styles.likeButtonContainer}>
                                    <AntDesign name="heart" size={24} color="white" />
                                </View>
                            </TouchableOpacity>


                        </View>
                        {/* Genres and rating */}
                        <View style={styles.genderAndRatingContainer}>
                            <View style={styles.genresContainer}>
                                {
                                    tvSeriesDetailData.genres.map((item) => (
                                        <Text key={item} style={styles.genresTitle}>{item}, </Text>
                                    ))
                                }
                            </View>
                            <View style={styles.ratingContainer}>
                                <FontAwesome6 name="imdb" size={24} color="#F5C518" />
                                <Text style={styles.ratingTitle}>{tvSeriesDetailData.rating.average}</Text>
                            </View>
                        </View>

                        {/* Summary */}
                        <View style={styles.summeryContainer}>
                            <Text style={styles.summaryTitle} >{tvSeriesDetailData.summary}</Text>
                        </View>

                        {/* generalInformation  */}
                        <View style={styles.generalInformationContainer}>
                            <View style={styles.generalInformationTitleContainer}>
                                <Text style={styles.generalInformationTitle}>General Information</Text>
                            </View>

                            <View style={styles.generalInformationItem} >
                                <Text style={styles.generalTitle} >Status: {tvSeriesDetailData.status}</Text>
                                <Text style={styles.generalTitle} >Premiered: {tvSeriesDetailData.premiered}</Text>
                            </View>
                            <View style={styles.generalInformationItem} >
                                <Text style={styles.generalTitle} >Runtime: {tvSeriesDetailData.runtime}</Text>
                                <Text style={styles.generalTitle} >Ended: {tvSeriesDetailData.ended}</Text>
                            </View>
                            <View style={styles.generalInformationItem} >
                                <Text style={styles.generalTitle} >Schedule: {tvSeriesDetailData.schedule.time}/{tvSeriesDetailData.schedule.days}</Text>
                                <Text style={styles.generalTitle} >Language: {tvSeriesDetailData.language}</Text>
                            </View>
                        </View>

                        {/* Episodes */}

                        <View style={styles.episodesContainer}>
                            <View style={styles.episodesContainerTitleContainer}>
                                <Text style={styles.episodesContainerTitle}>Episodes</Text>
                            </View>
                            <FlatList
                                data={episodesData}
                                horizontal={true}
                                renderItem={({ item, i }) => {
                                    return (
                                        <Link href={""} asChild>
                                            <TouchableOpacity>
                                                <Animated.View entering={FadeInDown.delay(i * 1000).duration(600).springify().damping(12)} style={styles.episodes}>
                                                    <Image
                                                        source={{ uri: item.image ? item.image.medium : null }}
                                                        sharedTransitionTag={item.id}
                                                        style={{ width: width / 3, borderRadius: 10, height: width / 4, }}
                                                        resizeMode="contain"

                                                    />
                                                    <Text style={styles.episodesTitle}>{item.name}</Text>

                                                </Animated.View>
                                            </TouchableOpacity>
                                        </Link>
                                    )
                                }}
                            />

                        </View>

                        {/* Cast */}

                        <View style={styles.castContainer}>
                            <View style={styles.castContainerTitleContainer}>
                                <Text style={styles.castContainerTitle}>Cast</Text>
                            </View>
                            <FlatList
                                data={castData}
                                horizontal={true}
                                renderItem={({ item, i }) => {
                                    return (
                                        <Link href={`/person/${item.person.id}`} asChild>
                                            <TouchableOpacity>
                                                <Animated.View entering={FadeInDown.delay(i * 1000).duration(600).springify().damping(12)} style={styles.cast}>
                                                    <Image
                                                        source={{ uri: item.person.image ? item.person.image.medium : null }}
                                                        sharedTransitionTag={item.person.id}
                                                        style={{ width: width / 5, borderRadius: 10, height: width / 4, }}
                                                        resizeMode="contain"

                                                    />
                                                    <Text style={styles.castCharacterTitle}>{item.character.name}</Text>
                                                    <Text style={styles.castTitle}>{item.person.name}</Text>

                                                </Animated.View>
                                            </TouchableOpacity>
                                        </Link>
                                    )
                                }}
                            />

                        </View>

                        {/* Crew */}

                        <View style={styles.crewContainer}>
                            <View style={styles.crewContainerTitleContainer}>
                                <Text style={styles.crewContainerTitle}>Crew</Text>
                            </View>
                            <FlatList
                                data={crewData}
                                horizontal={true}
                                renderItem={({ item, i }) => {
                                    return (
                                        <Link href={`/person/${item.person.id}`} asChild>
                                            <TouchableOpacity>
                                                <Animated.View entering={FadeInDown.delay(i * 1000).duration(600).springify().damping(12)} style={styles.crew}>
                                                    <Image
                                                        source={{ uri: item.person.image ? item.person.image.medium : null }}
                                                        sharedTransitionTag={item.person.id}
                                                        style={{ width: width / 5, borderRadius: 10, height: width / 4, }}
                                                        resizeMode="contain"

                                                    />
                                                    <Text style={styles.crewCharacterTitle}>{item.person.name}</Text>
                                                    <Text style={styles.crewTitle}>{item.type}</Text>

                                                </Animated.View>
                                            </TouchableOpacity>
                                        </Link>
                                    )
                                }}
                            />

                        </View>



                    </View>


                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        marginBottom: 25,
    },
    nameContainer: {
        flexDirection: 'row',
        marginTop: 10,
        width: width,
        alignItems: 'center',
    },
    nameTitle: {
        color: 'white',
        fontSize: 35,
        fontWeight: '400',
        textAlign: 'center',
        flex: 1,
    },
    likeButtonContainer: {
        justifyContent: 'flex-end',
        marginRight: 30,
    },
    genresTitle: {
        color: "#6B6B6B",
        fontSize: 16
    },
    genresContainer: {
        marginLeft: 5,
        flexDirection: "row"
    },
    genderAndRatingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginRight: 40,
        marginTop: 10
    },
    ratingContainer: {
        flexDirection: "row",
        gap: 2
    },
    ratingTitle: {
        color: "#F5C518",
        fontSize: 16
    },
    summeryContainer: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
    summaryTitle: {
        color: "#6B6B6B",
        fontSize: 15,
    },
    generalInformationContainer: {
        flexDirection: "column",
        margin: 5
    },
    generalInformationTitleContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
    },
    generalInformationTitle: {
        color: "white",
        fontSize: 18,
    },
    generalInformationItem: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    generalTitle: {
        color: "#6B6B6B",
        fontSize: 13
    },
    episodesContainer: {

    },
    episodesContainerTitleContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
    },
    episodesContainerTitle: {
        color: "white",
        fontSize: 18,
    },
    episodes: {
        padding: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    episodesTitle: {
        color: "#6B6B6B",
        fontSize: 13
    },
    castContainer: {

    },
    castContainerTitleContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
    },
    castContainerTitle: {
        color: "white",
        fontSize: 18,
    },
    cast: {
        padding: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    castCharacterTitle: {
        color: "white",
        fontSize: 14
    },
    castTitle: {
        color: "#6B6B6B",
        fontSize: 13
    },
    crewContainer: {

    },
    crewContainerTitleContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
    },
    crewContainerTitle: {
        color: "white",
        fontSize: 18,
    },
    crew: {
        padding: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    crewCharacterTitle: {
        color: "white",
        fontSize: 14
    },
    crewTitle: {
        color: "#6B6B6B",
        fontSize: 13
    },



})
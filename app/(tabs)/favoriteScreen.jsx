import { ScrollView, StyleSheet, Text, View, Dimensions, FlatList, Animated, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import TitleComponent from '../../components/titleComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function FavoriteScreen() {
    const [userEmail, setUserEmail] = useState("");
    const [favoritesData, setFavoritesData] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);

    // Fetch current user
    useEffect(() => {
        const getCurrentUser = () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUserEmail(user.email);
                } else {
                    console.log('No user is signed in');
                    Alert.alert("Error", "No user is signed in");
                }
            });
        };

        getCurrentUser();
    }, []);

    // Fetch favorite data
    useEffect(() => {
        const fetchFavoriteData = async () => {
            if (userEmail) {
                const q = query(collection(db, "favoritesTvSeries"), where("user", "==", userEmail));
                const querySnapshot = await getDocs(q);

                const favoriteDataArray = [];
                querySnapshot.forEach((doc) => {
                    favoriteDataArray.push({ ...doc.data(), uuid: doc.id });
                });

                setFavoritesData(favoriteDataArray);
                console.log(favoriteDataArray);
            }
        };

        fetchFavoriteData();
    }, [userEmail, isDeleted]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TitleComponent />
            {
                favoritesData.length === 0 ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                ) : (
                    <ScrollView style={styles.mainContainer}>
                        <View style={styles.allTvSeriesContainer}>
                            <Animated.Text entering={FadeInLeft.delay(1500).duration(600).springify().damping(12)} style={styles.allTvSeriesTitle}>Favorites</Animated.Text>
                            <FlatList
                                data={favoritesData}
                                showsVerticalScrollIndicator={false}
                                style={{ marginVertical: 20 }}
                                keyExtractor={item => item.uuid}
                                renderItem={({ item, index }) => (
                                    item.imageUrl && (
                                        <AllTvSeriesCard
                                            item={item}
                                            index={index}
                                            isDeleted={isDeleted}
                                            setIsDeleted={setIsDeleted}
                                        />
                                    )
                                )}
                                numColumns={3}
                                scrollEnabled={false}
                                contentContainerStyle={styles.flatListContent}
                            />
                        </View>
                    </ScrollView>
                )
            }
        </SafeAreaView>
    );
}

const AllTvSeriesCard = ({ item, index, isDeleted, setIsDeleted }) => {
    // Delete data from Firebase
    const handleUnFavoriteButton = async (value) => {
        try {
            await deleteDoc(doc(db, "favoritesTvSeries", value));
            setIsDeleted(!isDeleted);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.itemContainer}>
            <Link href={`/detail/${item.id}`} asChild>
                <TouchableOpacity>
                    <Animated.View entering={FadeInDown.delay(index * 200).duration(600).springify().damping(12)} style={styles.cardStyle}>
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <View style={styles.nameContainer}>
                            <Text style={styles.tvSeriesTitle}>{item.name}</Text>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </Link>
            <TouchableOpacity onPress={() => handleUnFavoriteButton(item.uuid)} style={styles.heartStyle}>
                <View style={styles.likeButtonContainer}>
                    <FontAwesome5 name="trash" size={24} color="white" />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    mainContainer: {
        flex: 1,
    },
    allTvSeriesContainer: {
        marginTop: 5,
        padding: 3,
    },
    allTvSeriesTitle: {
        color: "grey",
        fontSize: 25,
        fontWeight: "500",
        textAlign: 'center',
    },
    flatListContent: {
        alignItems: 'center',
    },
    cardStyle: {
        width: width / 4,
        margin: 5,
        alignItems: 'center',
    },
    tvSeriesTitle: {
        color: "grey",
        textAlign: 'center',
        marginTop: 5,
    },
    nameContainer: {
        alignItems: 'center',
    },
    likeButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    heartStyle: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    itemContainer: {
        width: width / 3,
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: width / 3.5,
        height: width / 2.5,
        borderRadius: 10,
    }
});

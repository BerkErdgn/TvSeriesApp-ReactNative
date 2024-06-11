
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import MasonryList from 'react-native-masonry-list/src/MasonryList'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Link } from 'expo-router';


const { width, height } = Dimensions.get('window');

export default function AllTvModel({ allTvSeriesData }) {

    return (
        <View>
            <Text style={styles.allTvSeriesTitle}> All Tv Series</Text>
            <View >
                {
                    allTvSeriesData.length == 0 ? (
                        <ActivityIndicator size="large" color="white" />
                    ) : (
                        <FlatList
                            data={allTvSeriesData}
                            showsVerticalScrollIndicator={false}
                            style={{ marginVertical: 20 }}
                            keyExtractor={item => item.id}
                            renderItem={({ item, i }) => item.image && item.image.medium ? <AllTvSeriesCard item={item} index={i} /> : null}
                            numColumns={3}
                            scrollEnabled={false}
                        />

                    )
                }

            </View>
        </View>
    )
}

const AllTvSeriesCard = ({ item, index }) => {
    return (
        <Link href={`/detail/${item.id}`} asChild>

            <TouchableOpacity style={{ flex: 1 }} >
                <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)} style={styles.cardStyle}>
                    <Image
                        source={{ uri: item.image.medium }}
                        sharedTransitionTag={item.id}
                        style={{ width: width / 4, borderRadius: 10, height: width / 3, }}
                        resizeMode="contain"
                    />

                </Animated.View>
            </TouchableOpacity>

        </Link>

    )
}

const styles = StyleSheet.create({
    allTvSeriesTitle: {
        color: "grey",
        fontSize: 25,
        fontWeight: "500"
    },
    cardStyle: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        padding: 5,
        margin: 5
    },
    tvSeriesTitle: {
        color: "grey"
    }
})
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllTvSeries, getTodayTvSeries } from '../../data/api/tvSeriesApi'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import AllTvModel from '../../components/allTvModel';
import TitleComponent from '../../components/titleComponent';



const { width, height } = Dimensions.get('window');


export default function HomeScreen() {

    const [pagingEnabled, setPagingEnabled] = useState(true);
    const [data, setData] = useState({});
    const [imageData, setImageData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [todayDate, setTodayDate] = useState("2023-01-30")
    const [allTvSeries, setAllTvSeries] = useState([]);

    useEffect(() => {
        var dateG = new Date().getDate() //current Date
        var month = new Date().getMonth() + 1 //current Month
        var year = new Date().getFullYear() //current Year
        setTodayDate(year + "-" + month + "-" + dateG);

        const fetchAllTvSeriesData = async () => {
            try {
                setLoading(true);
                const result = await getAllTvSeries();
                setAllTvSeries(result.data)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        const fetchTodayMovieData = async () => {
            try {
                setLoading(true);
                const result = await getTodayTvSeries(todayDate);
                setData(result.data);
                const imageUrls = result.data.map(item => item._embedded.show.image ? item._embedded.show.image.medium : null);
                setImageData(imageUrls);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchTodayMovieData();
        fetchAllTvSeriesData();
    }, [todayDate])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TitleComponent />
            {
                loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                ) : (
                    <ScrollView style={styles.mainContainer}>
                        {/* Today TvMovies Slider */}
                        <View style={styles.sliderContainer}>
                            <Carousel
                                width={width * 0.8}
                                height={width * 0.8}
                                data={imageData}
                                loop
                                mode='parallax'
                                modeConfig={{
                                    parallaxScrollingScale: 0.9,
                                    parallaxScrollingOffset: 100,
                                }}
                                autoPlay={true}
                                pagingEnabled={pagingEnabled}
                                scrollAnimationDuration={2000}
                                renderItem={({ item }) => (
                                    <View style={styles.carouselItem} >
                                        <Image style={styles.img} source={{ uri: item }} resizeMode="contain" />
                                    </View>
                                )}
                            />
                        </View>

                        {/* All Tv Series */}
                        <View style={styles.allTvSeriesContainer}>
                            <AllTvModel allTvSeriesData={allTvSeries} />
                        </View>

                    </ScrollView>

                )
            }

        </SafeAreaView>
    )
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
    sliderContainer: {
        marginTop: 10,
        alignItems: 'center',
        height: width * 0.8
    },
    carouselItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: width * 0.6,
        height: height * 0.4
    },
    allTvSeriesContainer: {
        marginTop: 5,
        padding: 3,
        width: width,
        height: (width * 0.9) - height
    },

})
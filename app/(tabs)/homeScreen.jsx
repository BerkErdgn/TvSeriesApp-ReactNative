import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getTodayTvSeries } from '../../data/api/tvSeriesApi'

export default function HomeScreen() {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [todayDate, setTodayDate] = useState("2023-01-30")

    useEffect(() => {
        var date = new Date().getDate() //current Date
        var month = new Date().getMonth() + 1 //current Month
        var year = new Date().getFullYear() //current Year
        setTodayDate(year + "-" + month + "-" + data);

        const fetchTodayMovieData = async () => {
            try {
                setLoading(true);
                const result = await getTodayTvSeries(todayDate);
                setData(result.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchTodayMovieData();
    }, [])

    console.log(data);

    return (
        <View>
            <Text>HomeScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
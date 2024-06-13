import axios from "axios"

//https://api.tvmaze.com/schedule/web?date=2023-01-30
//https://api.tvmaze.com/shows
//https://api.tvmaze.com/shows/1
// https://api.tvmaze.com/seasons/1/episodes
//https://api.tvmaze.com/shows/1/crew
//https://api.tvmaze.com/shows/1?embed=cast

const BASE_URL = "https://api.tvmaze.com"



export const getTodayTvSeries = async (todayDate) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/schedule/web?date=${todayDate}`
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, msg: error };
    }

};

export const getAllTvSeries = async () => {
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/shows`
        })
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, msg: error };
    }
}


export const getTvSeriesDetail = async (id) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/shows/${id}`
        })
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, msg: error }
    }
}



export const getTvSeriesEpisodes = async (id) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/seasons/${id}/episodes`
        })
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, msg: error }
    }
}



export const getTvSeriesCrew = async (id) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/shows/${id}/crew`
        })
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, msg: error }
    }
}



export const getTvSeriesCast = async (id) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/shows/${id}?embed=cast`
        })
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, msg: error }
    }
}


export const getPersonData = async (id) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/people/${id}`
        })
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, msg: error }
    }
}



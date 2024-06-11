import axios from "axios"

//https://api.tvmaze.com/schedule/web?date=2023-01-30
//https://api.tvmaze.com/shows
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


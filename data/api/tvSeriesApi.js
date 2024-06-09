import axios from "axios"

//https://api.tvmaze.com/schedule/web?date=2023-01-30
const BASE_URL = "https://api.tvmaze.com/schedule/"



export const getTodayTvSeries = async (todayDate) => {
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}web?date=${todayDate}`
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, msg: error };
    }

};


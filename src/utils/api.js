import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "5ef6b24ee5a2d9653ed9d398f48df919"; // Replace with your actual API key

// const headers ={
//     Authorization: "bearer" + API_KEY,
// }

export const fetchDataFromApi = async (url, params = {}) => {
    try {
        // Add the API key to the params
        params.api_key = API_KEY;

        // Make the API call
        const { data } = await axios.get(BASE_URL + url, {
            // headers,
            params, 
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

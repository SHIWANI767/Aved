// pages/api/data.js
const MAX_RETRIES = 3;
let retryCount = 0;
// Import necessary libraries/modules
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
const URLEND = process.env.baseURL
// Example function to fetch and process data
async function fetchDataAndProcess(payload) {
    try {
        // Fetch data from third-party API using query parameters and authorization header
 

        const rawData = await axios({
            method: "POST",
            url: `https://${URLEND}api/v1/user/userLogin`,
            // headers: {
            //   token: token,
            // },
            data: payload,
        });
        const data = await rawData.data;

        // Process the data (e.g., filter out sensitive information)
        const processedData = {
            responseMessage: data.responseMessage,
            responseCode: data.responseCode
        };
        return processedData;
    } catch (error) {
        console.log(" error --", error.response.data)
        console.log(" req error ---- ", error.response.data)
    //    if(error.response){ 
    //     throw new Error(error.response.data);
    // }else{
    //     throw new Error(error);
    // }
    if (retryCount < MAX_RETRIES) {
        retryCount++;
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchDataAndProcess(); // Retry the request
      } else {
        throw new Error('Max retries exceeded');
      }
    }
}

// API route handler
export default async function handler(
    req,
    res
) {
    try {
     
        const payload = req.body;
        if (!payload) {
            return res
                .status(400)
                .json({ error: "Missing email and password!" });
        }

        // Fetch and process data using query parameter and auth token
        const processedData = await fetchDataAndProcess(
            payload
        );

        // Send processed data as JSON response
        res.status(200).json(processedData);


        // const rawData = await axios({
        //     method: "POST",
        //     url: `https://${URLEND}api/v1/user/userLogin`,
        //     // headers: {
        //     //   token: token,
        //     // },
        //     data: payload,
        // });
        // const data = await rawData.data;

        // // Process the data (e.g., filter out sensitive information)
        // const processedData = {
        //     responseMessage: data.responseMessage,
        //     responseCode: data.responseCode
        // };
        // res.status(200).json(processedData);
    } catch (error) {
        // Handle errors
        console.error("Error: 12345", error);
        res.status(500).json({ error : error});
    }
}

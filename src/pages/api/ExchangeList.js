const axios = require("axios");

export default async function handler(req, res) {
  const token = req.headers.token;
  if (!token) {
    return res.status(400).json({ error: "Token is missing" });
  }

  // Set CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  try {
    const response = await axios({
      method: "GET",
      url: "https://node-arbitragebotasad.mobiloitte.io/api/v1/wallet/connectedExchangeList",
      headers: {
        token: token,
      },
      timeout: 10000, // 10 seconds
    });

    const data = response.data;
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    const status = error.response ? error.response.status : 500;
    const message = error.response
      ? error.response.data
      : error?.message
      ? error
      : { error: "Failed to fetch data" };
    return res.status(status).json(message);
  }
}

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.API_KEY;

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { lat, lon } = req.query;

  try {
    const response = await axios.get(
      "https://revgeocode.search.hereapi.com/v1/revgeocode",
      {
        params: {
          at: `${lat},${lon}`,
          lang: "en-US",
          apiKey: apiKey,
        },
      }
    );
    console.log(response.config);
    res.json(response.data);
  } catch (e) {
    console.error(e);
    res.status(401).json({ error: e });
  }
}

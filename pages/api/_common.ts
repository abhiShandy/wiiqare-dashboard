import axios from "axios";
import hawk from "hawk";

export const MERCHANT_ID: string = process.env.MERCHANT_ID || "";

export const credentials: {
  id: string;
  key: string;
  algorithm: "sha256" | "sha1";
} = {
  id: process.env.COINDIRECT_HAWK_ID || "",
  key: process.env.COINDIRECT_HAWK_KEY || "",
  algorithm: "sha256",
};

export const CreateChannel = async (
  displayCurrency: string,
  payCurrency: string,
  reference: string
): Promise<WiiQare.Channel | null> => {
  const url = `https://api.sandbox.coindirect.com/api/v2/channel`;
  const { header } = hawk.client.header(url, "POST", { credentials });
  try {
    const response = await axios.post<WiiQare.Channel>(
      url,
      { merchantId: MERCHANT_ID, displayCurrency, payCurrency, reference },
      {
        headers: { Authorization: header },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    console.log("Error creating channel");
    return null;
  }
};

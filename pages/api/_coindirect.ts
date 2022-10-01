import axios from "axios";
import hawk from "hawk";

export const MERCHANT_ID: string = process.env.MERCHANT_ID || "";

export const COINDIRECT_API_URL = "https://api.sandbox.coindirect.com/api";

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
  const url = `${COINDIRECT_API_URL}/v2/channel`;
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

export const CreateWallet = async (
  currency: string,
  description: string
): Promise<WiiQare.Wallet> => {
  try {
    const url = `${COINDIRECT_API_URL}/wallet`;
    const { header } = hawk.client.header(url, "POST", {
      credentials,
    });
    const response = await axios.post<WiiQare.Wallet>(
      url,
      { currency, description },
      {
        headers: { Authorization: header },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error creating wallet");
    console.log(error);
    throw error;
  }
};

export const ListChannels = async (): Promise<WiiQare.Channel[] | null> => {
  try {
    const url = `${COINDIRECT_API_URL}/v2/channel?merchantId=${MERCHANT_ID}`;
    const { header } = hawk.client.header(url, "GET", { credentials });
    const response = await axios.get<WiiQare.Channel[]>(url, {
      headers: { Authorization: header },
    });
    return response.data;
  } catch (error) {
    console.log("Error getting list of channels");
    console.log(error);

    return null;
  }
};

export const ListChannelPayments = async () => {
  try {
    const url = `${COINDIRECT_API_URL}/v2/channel/payment?merchantId=${MERCHANT_ID}&max=1000`;
    const { header } = hawk.client.header(url, "GET", {
      credentials,
    });
    const response = await axios.get<any[]>(url, {
      headers: { Authorization: header },
    });
    return response.data;
  } catch (error) {
    console.log("Error getting list of channel payments");
    console.log(error);
    return null;
  }
};

export const ListMerchants = async (): Promise<WiiQare.Merchant[] | null> => {
  try {
    const url = `${COINDIRECT_API_URL}/v1/merchant`;
    const { header } = hawk.client.header(url, "GET", {
      credentials,
    });
    const response = await axios.get<WiiQare.Merchant[]>(url, {
      headers: { Authorization: header },
    });
    return response.data;
  } catch (error) {
    console.log("Error getting list of merchants");
    console.log(error);
    return null;
  }
};

export const ListPayments = async (): Promise<WiiQare.Payment[] | null> => {
  try {
    const url = `${COINDIRECT_API_URL}/v1/pay/summary?merchantId=${MERCHANT_ID}`;
    const { header } = hawk.client.header(url, "GET", {
      credentials,
    });
    const response = await axios.get<WiiQare.Payment[] | null>(url, {
      headers: { Authorization: header },
    });
    return response.data;
  } catch (error) {
    console.log("Error getting list of payments");
    console.log(error);
    return null;
  }
};

export const ListQuotes = async (): Promise<WiiQare.Quote[] | null> => {
  try {
    const url = `${COINDIRECT_API_URL}/v1/quote`;
    const { header } = hawk.client.header(url, "GET", {
      credentials,
    });
    const response = await axios.get<WiiQare.Quote[]>(url, {
      headers: { Authorization: header },
    });
    return response.data;
  } catch (error) {
    console.log("Error getting list of quotes.");
    console.log(error);
    return null;
  }
};

export const ListWallets = async (): Promise<WiiQare.Wallet[] | null> => {
  try {
    const url = `${COINDIRECT_API_URL}/wallet`;
    const { header } = hawk.client.header(url, "GET", {
      credentials,
    });
    const response = await axios.get<WiiQare.Wallet[]>(url, {
      headers: { Authorization: header },
    });
    return response.data;
  } catch (error) {
    console.log("Error getting list of wallets");
    console.log(error);
    return null;
  }
};

import { NextApiHandler } from "next";
import { CreateWallet, ListWallets } from "./_common";

const Wallets: NextApiHandler = async (request, response) => {
  if (request.method === "GET") {
    try {
      const wallets = await ListWallets();
      response.status(200).json(wallets);
    } catch (error) {
      response.status(500).json({});
    }
  } else if (request.method === "POST") {
    const { currency, description } = request.body;
    try {
      const wallet = await CreateWallet(currency, description);
      response.status(200).json(wallet);
    } catch (error) {
      response.status(500).json({});
    }
  }
};

export default Wallets;

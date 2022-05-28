import Head from "next/head";
import { MouseEventHandler, useState } from "react";
import Navbar from "../components/navbar";
import hawk from "hawk";
import axios from "axios";

const url = "https://api.sandbox.coindirect.com/api/v2/channel";
const credentials: {
  id: string;
  key: string;
  algorithm: "sha256" | "sha1";
} = {
  id: "ZPcwjLvvZ107UEhAgOvFqgl6Qmlz92pmJYTVOfPGl3SSseCJJuqF92nlkjSeEHSp",
  key: "4KcRYkSBfJmPRpNO6ebccRLvuxlsq5pEtGzJjAuLleZvYMdiUP1xMEHJ9Chtkges",
  algorithm: "sha256",
};

type Channel = {
  id: string;
  address: string;
  reference: string;
  payCurrency: string;
  dateCreated: string;
};

const Channels = () => {
  const [channelReference, setChannelReference] = useState<string>("");
  const [channels, setChannels] = useState<Channel[]>([]);
  const getChannels: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const eg = `${url}?merchantId=e7c967e0-ea58-41de-aad2-c8a28d970baa`;
      const { header } = hawk.client.header(eg, "GET", { credentials });
      const response = await axios.get(eg, {
        headers: { Authorization: header },
      });
      setChannels(response.data);
    } catch (error) {
      alert("Failed to load channels!");
    }
  };
  const createChannel: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const { header } = hawk.client.header(url, "post", { credentials });
      const response = await axios.post(
        url,
        {
          merchantId: "e7c967e0-ea58-41de-aad2-c8a28d970baa",
          payCurrency: "BTC",
          displayCurrency: "USD",
          reference: channelReference,
        },
        { headers: { Authorization: header } }
      );
    } catch (error) {
      alert("Failed to create channel!");
    }
  };
  return (
    <>
      <Head>
        <title>Coindirect | Channels</title>
      </Head>
      <Navbar />
      <div className="border-gray-500 border-2 rounded-md max-w-xl mx-auto justify-center p-2 flex gap-2">
        <input
          type="text"
          className="text-center"
          placeholder="channel reference"
          value={channelReference}
          onChange={(e) => {
            setChannelReference(e.target.value);
          }}
        />
        <button
          className="bg-blue-500 p-2 rounded-md text-white"
          onClick={createChannel}
        >
          Create Channel
        </button>
      </div>
      <div className="border-gray-500 border-2 rounded-md max-w-5xl mx-auto mt-5 text-center p-2">
        <button
          className="bg-blue-500 p-2 rounded-md text-white"
          onClick={getChannels}
        >
          List Channels
        </button>
        <table className="divide-y divide-gray-300 m-auto mt-2">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                ID
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Reference
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Date Created
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Address
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Pay Currency
              </th>
            </tr>
          </thead>
          <tbody>
            {channels &&
              channels.map((channel) => (
                <tr key={channel.id}>
                  <td className="text-left">{channel.id}</td>
                  <td className="text-left">{channel.reference}</td>
                  <td className="text-left">
                    {new Date(channel.dateCreated).toISOString().slice(0, -8)}
                  </td>
                  <td className="text-left">{channel.address}</td>
                  <td className="text-right">{channel.payCurrency}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Channels;

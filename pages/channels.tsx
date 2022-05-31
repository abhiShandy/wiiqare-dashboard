import Head from "next/head";
import hawk from "hawk";
import axios from "axios";
import Dashboard from "../components/dashboard";

type Channel = {
  id: string;
  address: string;
  reference: string;
  payCurrency: string;
  dateCreated: string;
};

const credentials: {
  id: string;
  key: string;
  algorithm: "sha256" | "sha1";
} = {
  id: process.env.COINDIRECT_HAWK_ID || "",
  key: process.env.COINDIRECT_HAWK_KEY || "",
  algorithm: "sha256",
};

export async function getServerSideProps() {
  const url = `https://api.sandbox.coindirect.com/api/v2/channel?merchantId=${
    process.env.MERCHANT_ID || ""
  }`;
  try {
    const { header } = hawk.client.header(url, "GET", { credentials });
    const response = await axios.get<Channel[]>(url, {
      headers: { Authorization: header },
    });
    return {
      props: {
        channels: response.data,
      },
    };
  } catch (error) {
    console.log("Failed to load channels!");
    return {
      props: {
        channels: [],
      },
    };
  }
}

const Channels = ({ channels }: { channels: Channel[] }) => {
  // const [channelReference, setChannelReference] = useState<string>("");
  // const createChannel: MouseEventHandler<HTMLButtonElement> = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { header } = hawk.client.header(url, "post", { credentials });
  //     const response = await axios.post(
  //       url,
  //       {
  //         merchantId: "e7c967e0-ea58-41de-aad2-c8a28d970baa",
  //         payCurrency: "BTC",
  //         displayCurrency: "USD",
  //         reference: channelReference,
  //       },
  //       { headers: { Authorization: header } }
  //     );
  //   } catch (error) {
  //     alert("Failed to create channel!");
  //   }
  // };
  return (
    <>
      <Head>
        <title>WiiQare | Channels</title>
      </Head>
      {/* <div className="border-gray-500 border-2 rounded-md max-w-xl mx-auto justify-center p-2 flex gap-2">
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
          className="bg-gray-500 p-2 rounded-md text-white"
          onClick={createChannel}
        >
          Create Channel
        </button>
      </div> */}
      <Head>
        <title>WiiQare | Channels</title>
      </Head>
      <Dashboard title="Channels">
        {channels && (
          <div className="border border-gray-200 rounded-md">
            <table className="w-full">
              <thead>
                <tr className="text-left h-8">
                  <th className="pl-4">Reference</th>
                  <th>Date Created</th>
                  <th>Address</th>
                  <th className="text-right pr-4">Pay Currency</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((channel) => (
                  <tr
                    key={channel.id}
                    className="hover:bg-gray-200 h-8 text-left"
                  >
                    <td className="pl-4">{channel.reference}</td>
                    <td>
                      {new Date(channel.dateCreated).toISOString().slice(0, -8)}
                    </td>
                    <td>{channel.address}</td>
                    <td className="text-right pr-4">{channel.payCurrency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Dashboard>
    </>
  );
};

export default Channels;

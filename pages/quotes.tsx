import axios from "axios";
import hawk from "hawk";
import Head from "next/head";
import Dashboard from "../components/dashboard";

const credentials: {
  id: string;
  key: string;
  algorithm: "sha256" | "sha1";
} = {
  id: process.env.COINDIRECT_HAWK_ID || "",
  key: process.env.COINDIRECT_HAWK_KEY || "",
  algorithm: "sha256",
};

type Quote = {
  id: string;
  from: string;
  to: string;
  paymentStatus: string;
  dateCreated: string;
};

export async function getServerSideProps() {
  try {
    const url = "https://api.sandbox.coindirect.com/api/v1/quote";
    const { header } = hawk.client.header(url, "GET", {
      credentials,
    });
    const response = await axios.get(url, {
      headers: { Authorization: header },
    });
    return {
      props: {
        quotes: response.data,
      },
    };
  } catch (error) {
    console.log("Failed to get Quotes");
    return {
      props: {
        quotes: [],
      },
    };
  }
}

const Quotes = ({ quotes }: { quotes: Quote[] }) => {
  return (
    <>
      <Head>
        <title>WiiQare | Quotes</title>
      </Head>
      <Dashboard title="Quotes">
        {quotes && (
          <div className="border rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr className="text-left h-8">
                  <th className="pl-4">ID</th>
                  <th>Date Created</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {quotes &&
                  quotes.map((quote) => (
                    <tr key={quote.id} className="h-8 hover:bg-gray-200">
                      <td className="pl-4">{quote.id}</td>
                      <td>{new Date(quote.dateCreated).toISOString()}</td>
                      <td>{quote.from}</td>
                      <td>{quote.to}</td>
                      <td>{quote.paymentStatus}</td>
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

export default Quotes;

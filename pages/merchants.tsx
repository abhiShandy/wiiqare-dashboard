import axios from "axios";
import hawk from "hawk";
import Head from "next/head";
import Dashboard from "../components/dashboard";

const credentials: {
  id: string;
  key: string;
  algorithm: "sha256" | "sha1";
} = {
  id: process.env.NEXT_PUBLIC_COINDIRECT_HAWK_ID || "",
  key: process.env.NEXT_PUBLIC_COINDIRECT_HAWK_KEY || "",
  algorithm: "sha256",
};

type Merchant = {
  merchantId: string;
  displayName: string;
  wallet: {
    currency: {
      code: string;
    };
  };
};

export async function getServerSideProps() {
  try {
    const url = "https://api.sandbox.coindirect.com/api/v1/merchant";
    const { header } = hawk.client.header(url, "GET", {
      credentials,
    });
    const response = await axios.get<Merchant[]>(url, {
      headers: { Authorization: header },
    });
    return {
      props: {
        merchants: response.data,
      },
    };
  } catch (error) {
    console.log("Failed to load merchants");
    return {
      props: {
        merchants: [],
      },
    };
  }
}

const Merchants = ({ merchants }: { merchants: Merchant[] }) => {
  return (
    <>
      <Head>
        <title>WiiQare | Merchants</title>
      </Head>
      <Dashboard title="Merchants">
        {merchants && (
          <div className="rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="text-left h-8 bg-gray-200">
                  <th className="pl-4">Display Name</th>
                  <th>Merchant ID</th>
                  <th className="pr-4">Currency</th>
                </tr>
              </thead>
              <tbody>
                {merchants &&
                  merchants.map((merchant) => (
                    <tr
                      key={merchant.merchantId}
                      className="hover:bg-gray-200 h-8"
                    >
                      <td className="pl-4">{merchant.displayName}</td>
                      <td>{merchant.merchantId}</td>
                      <td className="pr-4">{merchant.wallet.currency.code}</td>
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

export default Merchants;

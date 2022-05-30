import axios from "axios";
import hawk from "hawk";
import Head from "next/head";
import Image from "next/image";
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

type Wallet = {
  id: string;
  balance: string;
  currency: {
    code: string;
    name: string;
    icon: string;
    fiat: boolean;
  };
};

export async function getServerSideProps() {
  const url = "https://api.sandbox.coindirect.com/api/wallet";
  try {
    const { header } = hawk.client.header(url, "GET", {
      credentials,
    });
    const response = await axios.get<Wallet[]>(url, {
      headers: { Authorization: header },
    });
    return {
      props: {
        wallets: response.data,
      },
    };
  } catch (error) {
    console.log("Failed to load wallets!");
    return {
      props: {
        wallets: [],
      },
    };
  }
}

const CurrencyRow = ({ wallet }: { wallet: Wallet }) => {
  return (
    <tr className="hover:bg-gray-200 h-16">
      <td className="text-center p-2">
        {wallet.currency.icon && (
          <Image
            src={wallet.currency.icon}
            alt={wallet.currency.code}
            width={50}
            height={50}
          />
        )}
      </td>
      <td>
        <p>{wallet.currency.name}</p>
        <p className="text-gray-500">{wallet.currency.code}</p>
      </td>
      <td>{wallet.balance}</td>
      <td></td>
    </tr>
  );
};

const Wallets = ({ wallets }: { wallets: Wallet[] }) => {
  return (
    <>
      <Head>
        <title>WiiQare | Wallets</title>
      </Head>
      <Dashboard title="Wallets">
        {wallets && (
          <div className="rounded-lg border">
            <table className="w-full">
              <tbody>
                <tr>
                  <td
                    className="pl-4 py-4 bg-gray-200 font-semibold"
                    colSpan={4}
                  >
                    Fiat
                  </td>
                </tr>
                {wallets
                  .filter((wallet) => wallet.currency.fiat)
                  .map((wallet) => (
                    <CurrencyRow key={wallet.id} wallet={wallet} />
                  ))}
                <tr>
                  <td
                    className="pl-4 py-4 bg-gray-200 font-semibold"
                    colSpan={4}
                  >
                    Cryptocurrency
                  </td>
                </tr>
                {wallets
                  .filter((wallet) => !wallet.currency.fiat)
                  .map((wallet) => (
                    <CurrencyRow key={wallet.id} wallet={wallet} />
                  ))}
              </tbody>
            </table>
            {/* <p>{JSON.stringify(wallets[1])}</p> */}
          </div>
        )}
      </Dashboard>
    </>
  );
};

export default Wallets;

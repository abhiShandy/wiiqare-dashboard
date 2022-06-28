import Head from "next/head";
import useSWR from "swr";
import Dashboard from "../components/dashboard";
import { fetcher } from "../utils/fetcher";

const Quotes = () => {
  const { data: quotes, error } = useSWR<WiiQare.Quote[]>(
    "/api/quotes",
    fetcher
  );
  if (error) return <p>Error fetching quotes!</p>;
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

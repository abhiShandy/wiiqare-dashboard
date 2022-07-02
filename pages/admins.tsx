import Head from "next/head";
import useSWR from "swr";
import Dashboard from "../components/dashboard";
import { fetcher } from "../utils/fetcher";

const Admins = () => {
  const { data: admins, error } = useSWR<WiiQare.Admin[]>(
    "/api/admins",
    fetcher
  );

  if (error) return <p>Error getting list of admins.</p>;

  if (!admins) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>WiiQare | Admins</title>
      </Head>
      <Dashboard title="Admins">
        <div className="border border-gray-200 rounded-md">
          <table className="w-full">
            <thead>
              <tr className="text-left h-8">
                <th className="pl-4">ID</th>
                <th>Email</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-200 h-8 text-left">
                  <td className="pl-4">{admin.id}</td>
                  <td>{admin.email}</td>
                  <td>{admin.name ? admin.name : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dashboard>
    </>
  );
};

export default Admins;

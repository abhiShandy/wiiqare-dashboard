import { MongoClient, WithId } from "mongodb";
import Head from "next/head";
import Dashboard from "../components/dashboard";

const Admins = ({ admins }: { admins: WiiQare.Admin[] }) => {
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

export const getServerSideProps = async () => {
  const client = new MongoClient(process.env.MONGODB_URL || "");

  try {
    await client.connect();
  } catch (error) {
    console.log("Error connecting to MongoDB");
    return { props: { admins: [] } };
  }

  const cursor = client.db("admins").collection<WiiQare.Admin>("web").find();

  const projectCursor = cursor.project<WiiQare.Admin>({ _id: 0 });

  try {
    const admins = await projectCursor.toArray();
    return { props: { admins: admins } };
  } catch (error) {
    console.log("Error converting to array");
    return { props: { admins: [] } };
  }
  await client.close();
};

export default Admins;

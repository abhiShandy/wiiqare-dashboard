import { MongoClient } from "mongodb";

export default class MongoDB {
  private static client = new MongoClient(process.env.MONGODB_URL || "");

  public static ListAdmins = async () => {
    try {
      await this.client.connect();
    } catch (error) {
      console.log("Error connecting to MongoDB");
      return null;
    }

    const cursor = this.client
      .db("admins")
      .collection<WiiQare.Admin>("web")
      .find();

    const projectCursor = cursor.project<WiiQare.Admin>({ _id: 0 });

    const admins = await projectCursor.toArray();

    await this.client.close();

    return admins;
  };

  public static ListExpats = async (): Promise<WiiQare.Expat[]> => {
    try {
      await this.client.connect();
    } catch (error) {
      console.log("Error connecting to MongoDB");
      throw error;
    }

    const cursor = this.client
      .db("customers")
      .collection<WiiQare.Expat>("expats")
      .find();
    const projectCursor = cursor.project<WiiQare.Expat>({ _id: 0 });

    const expats = await projectCursor.toArray();
    await this.client.close();

    return expats;
  };

  public static ListPatients = async (): Promise<WiiQare.Patient[]> => {
    try {
      await this.client.connect();
    } catch (error) {
      console.log("Error connecting to MongoDB");
      throw error;
    }

    const cursor = this.client
      .db("customers")
      .collection<WiiQare.Patient>("patients")
      .find();
    const projectCursor = cursor.project<WiiQare.Patient>({ _id: 0 });

    const patients = await projectCursor.toArray();
    await this.client.close();

    return patients;
  };
}

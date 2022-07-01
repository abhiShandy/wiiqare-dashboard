import { MongoClient } from "mongodb";
import { NextApiHandler } from "next";
import { v4 as uuid } from "uuid";

const Patients: NextApiHandler = async (request, response) => {
  if (request.method === "POST") {
    const { name, email, phone } = request.body;

    const client = new MongoClient(process.env.MONGODB_URL || "");

    try {
      await client.connect();
    } catch (error) {
      console.log("Error connecting to MongoDB");
    }

    try {
      const data = await client
        .db("customers")
        .collection<WiiQare.Patient>("patients")
        .insertOne({ id: uuid(), name, email, phone });
      response.status(200).json(data);
    } catch (error) {
      console.log("Error creating Patient!");
      response.status(500);
    }
    await client.close();
  }

  if (request.method === "GET") {
    const { phone } = request.query;
    console.log(request.query);

    const client = new MongoClient(process.env.MONGODB_URL || "");

    try {
      await client.connect();
    } catch (error) {
      console.log("Error connecting to MongoDB");
    }

    if (phone) {
      const patient = await client
        .db("customers")
        .collection<WiiQare.Patient>("patients")
        .findOne({ phone });

      response.status(200).json(patient);
    } else {
      const patientCursor = client
        .db("customers")
        .collection<WiiQare.Patient>("patients")
        .find();
      const projectPatientCursor = patientCursor.project<WiiQare.Patient>({
        _id: 0,
      });
      try {
        const patients = await projectPatientCursor.toArray();

        response.status(200).json(patients);
      } catch (error) {
        console.log("Error converting patients to array");
        response.status(500);
      }
    }

    await client.close();
  }
};

export default Patients;

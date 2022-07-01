import { Dialog } from "@headlessui/react";
import axios from "axios";
import { WithId } from "mongodb";
import { MouseEventHandler, useState } from "react";
import Button from "../button";
import Modal from "../modal";

export default function CreateTransferForm({ expatID }: { expatID: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const createTransfer: MouseEventHandler = async (e) => {
    e.preventDefault();
    try {
      if (!phone || isNaN(amount) || !amount) {
        alert("Invalid form. Please correct.");
        return;
      }

      const patient = (
        await axios.get<WithId<WiiQare.Patient> | null>(
          `/api/patients?phone=${encodeURIComponent(phone)}`
        )
      ).data;

      if (!patient) {
        alert("Invalid phone number. Please try again.");
        return;
      }

      await axios.post("/api/transfers", {
        expatID,
        patientID: patient.id,
        amount,
        currency,
      });

      closeModal();

      alert(
        `Transfer of ${amount} ${currency} to ${patient.name} is submitted`
      );
    } catch (error) {
      alert("Error creating transfer. Please try again.");
      console.log(error);
    }
  };

  return (
    <Modal
      buttonText="Transfer"
      isOpen={isOpen}
      openModal={openModal}
      closeModal={closeModal}
    >
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Transfer money to a patient
      </Dialog.Title>

      <div className="mt-2">
        <form>
          <div className="flex flex-col my-2">
            <label htmlFor="" className="my-1">
              Enter patient&apos;s phone number
            </label>
            <input
              type="text"
              name="phone"
              className="border rounded h-10 px-4 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <label htmlFor="" className="my-1 mt-4">
              Enter amount
            </label>
            <div className="flex justify-between">
              <input
                type="number"
                name="amount"
                className="border rounded h-10 px-4 py-2"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                required
              />

              <select
                className="border rounded h-10 px-4 py-2"
                name="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option>USD</option>
                <option>EUR</option>
                <option>NGN</option>
              </select>
            </div>
            <div className="mt-4 flex justify-end">
              <Button type="submit" onClick={createTransfer} className="mr-4">
                Submit
              </Button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

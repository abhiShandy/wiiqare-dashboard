import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import axios from "axios";
import Button from "./button";

const DepositOptions: string[] = ["BTC", "ETH", "ADA"];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Deposit({ expatId }: { expatId: string }) {
  const [mem, setMem] = useState(DepositOptions[0]);

  const getChannel = async () => {
    try {
      const channel = (
        await axios.get<WiiQare.Channel>(
          `/api/expats/${expatId}/channels?payCurrency=${mem}`
        )
      ).data;
      console.log(channel);
    } catch (error) {
      console.log("Error getting channel");
    }
  };

  return (
    <div className="mt-6">
      <h1>Select cryptocurrency to deposit</h1>
      <RadioGroup value={mem} onChange={setMem} className="mt-2">
        <RadioGroup.Label className="sr-only">
          Choose a memory option
        </RadioGroup.Label>
        <div className={`grid grid-cols-${DepositOptions.length} gap-2`}>
          {DepositOptions.map((option) => (
            <RadioGroup.Option
              key={option}
              value={option}
              className={({ active, checked }) =>
                classNames(
                  "cursor-pointer focus:outline-none",
                  active ? "ring-2 ring-offset-2 ring-indigo-500" : "",
                  checked
                    ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                  "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                )
              }
            >
              <RadioGroup.Label as="span">{option}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      <Button className="float-right mt-4" onClick={getChannel}>
        Proceed
      </Button>
    </div>
  );
}

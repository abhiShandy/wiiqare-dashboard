type Admin = {
  id: string;
  email: string;
  name?: string;
};

type Channel = {
  id: string;
  dateCreated: number;
  lastUpdated: number;
  merchantId: string;
  walletCurrency: string;
  displayCurrency: string;
  payCurrency: string;
  address: string;
  tag: number | null;
  reference: string;
  status: string;
  uuid: string;
  redirectUrl: string;
  uri: string;
  alternatives?: {
    protocol: string;
    address: string;
    tag: string;
    uri: string;
  }[];
};

type Currency = {
  name: string;
  code: string;
  depositFee: string;
  withdrawalFee: string;
};

export type Expat = {
  id: string;
  email: string;
  phone: string;
  name: string;
  kyc: string;
  displayCurrency: string;
  channels?: Channel[];
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

type Patient = {
  id: string;
  email: string;
  phone: string;
  name: string;
};

type Payment = {
  uuid: string;
  type: string;
  status: string;
  dateCreated: string;
  displayCurrency: {
    amount: number;
    currency: string;
  };
};

type Quote = {
  id: string;
  from: string;
  to: string;
  paymentStatus: string;
  dateCreated: string;
};

export type Transaction = {
  hash: string;
  paidAmount: number;
  paidCurrency: string;
  displayAmount: number;
  displayCurrency: string;
  dateCreated: number;
  lastUpdated: number;
  status: "DETECTED" | "COMPLETE";
  balance: number;
};

type Transfer = {
  id: string;
  expatID: string;
  patientID: string;
  amount: number;
  currency: string;
  dateCreated: number;
  lastUpdated: number;
  status: "SUBMITTED" | "PROCESSING" | "COMPLETED";
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
  description: string;
};

export as namespace WiiQare;

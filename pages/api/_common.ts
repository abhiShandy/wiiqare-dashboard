export const MERCHANT_ID: string = process.env.MERCHANT_ID || "";

export const credentials: {
  id: string;
  key: string;
  algorithm: "sha256" | "sha1";
} = {
  id: process.env.COINDIRECT_HAWK_ID || "",
  key: process.env.COINDIRECT_HAWK_KEY || "",
  algorithm: "sha256",
};

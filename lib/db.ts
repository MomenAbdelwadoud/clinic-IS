import PocketBase from "pocketbase";
// initialize client
export const pbClient = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

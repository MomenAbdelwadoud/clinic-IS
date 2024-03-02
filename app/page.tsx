import {pbClient} from "@/lib/db";
import {cookies} from "next/headers";
import Accountant from "./components/accountant/Accountant";
import Doctor from "./components/doctor/Doctor";
import Pharmacist from "./components/pharmacist/Pharmacist";

export default async function Home() {
	const auth_cookies = cookies().get("pb_auth");
	pbClient.authStore.loadFromCookie(auth_cookies?.value as string);
	const role = await pbClient.authStore.model?.role;
	const roleComponentMap: any = {
		doctor: <Doctor />,
		accountant: <Accountant />,
		pharmacist: <Pharmacist />,
	};
	return <main className="">{roleComponentMap[role]}</main>;
}

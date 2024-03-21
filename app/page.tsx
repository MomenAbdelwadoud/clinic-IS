import {pbClient} from "@/lib/db";
import {cookies} from "next/headers";
import Accountant from "./components/accountant/Accountant";
import Doctor from "./components/doctor/Doctor";
import Pharmacist from "./components/pharmacist/Pharmacist";
import {addDays} from "date-fns";

export default async function Home({
	searchParams,
}: {
	searchParams: {[key: string]: string | string[] | undefined};
}) {
	const auth_cookies = cookies().get("pb_auth");
	pbClient.authStore.loadFromCookie(auth_cookies?.value as string);
	const role = await pbClient.authStore.model?.role;
	const {from = addDays(new Date(), -30), to = new Date()} = searchParams;
	const roleComponentMap: any = {
		doctor: (
			<Doctor
				from={from}
				to={to}
			/>
		),
		accountant: (
			<Accountant
				from={from}
				to={to}
			/>
		),
		pharmacist: (
			<Pharmacist
				from={from}
				to={to}
			/>
		),
	};
	return <main className="">{roleComponentMap[role]}</main>;
}

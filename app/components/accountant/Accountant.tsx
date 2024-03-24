import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {pbClient} from "@/lib/db";
import {DollarSign, UserPlus, Users} from "lucide-react";
import {cookies} from "next/headers";
import React from "react";
import DatePickerWithRange from "../DateRangePicker";
import NewPatient from "./NewPatient";
import DataTable from "./DataTable";
import {columns} from "./columns";
import {appointmentRevenue, patientType, userType} from "@/lib/types";
import {GET_PATIENTS_URL} from "@/lib/urls";
import {toDateFormat} from "@/lib/toDateFormat";

const Accountant = async ({from, to}: {from: Date; to: Date}) => {
	const pbAuth = cookies().get("pb_auth")?.value;
	pbClient.authStore.loadFromCookie(pbAuth!);
	const currentUser: userType & any = pbClient.authStore.model!;
	const {from: formattedFrom, to: formattedTo} = toDateFormat(
		from.toString(),
		to.toString()
	);
	const res = await fetch(
		process.env.NEXT_PUBLIC_PB_URL +
			GET_PATIENTS_URL +
			`?filter=created>='${formattedFrom}'%26%26created<='${formattedTo}'`,
		{
			next: {tags: ["patients"]},
			headers: {
				Authorization: pbClient.authStore.token,
			},
		}
	);
	const result = await res.json();
	const patientList: patientType[] = result.items;
	const totalRevenue = patientList.length * appointmentRevenue;

	return (
		<div>
			<div>
				<h1 className="text-2xl font-bold">
					Welcome back {JSON.stringify(currentUser.username)}
				</h1>
				<h4 className="text-sm text-gray-800">
					Here is a summary to the appointments
				</h4>
			</div>
			<div className="pt-12 flex justify-between">
				<DatePickerWithRange
					from={from}
					to={to}></DatePickerWithRange>
				<NewPatient></NewPatient>
			</div>
			<div className="pt-4 flex gap-5 xl:gap-16 flex-wrap">
				<Card className="flex flex-col border-[1px]shadow-sm max-w-[300px] rounded-xl min-w-[250px]">
					<CardHeader className="flex flex-row items-baseline justify-between w-full">
						<CardTitle className="text-md font-medium">
							Total Revenue
						</CardTitle>
						<DollarSign className="w-5 h-5"></DollarSign>
					</CardHeader>
					<CardContent className="w-full flex flex-row">
						<p className="text-4xl">$</p>
						<p className="text-4xl font-bold">{totalRevenue.toFixed(2)}</p>
					</CardContent>
				</Card>
				<Card className="flex flex-col border-[1px]shadow-sm max-w-[300px] rounded-xl min-w-[250px]">
					<CardHeader className="flex flex-row items-baseline justify-between w-full">
						<CardTitle className="text-md font-medium">
							Total Patients
						</CardTitle>
						<Users className="w-5 h-5"></Users>
					</CardHeader>
					<CardContent className="w-full flex justify-center">
						<p className="text-4xl font-bold">{patientList.length}</p>
					</CardContent>
				</Card>
			</div>
			<div className="mt-8">
				<DataTable
					data={patientList}
					columns={columns}></DataTable>
			</div>
		</div>
	);
};

export default Accountant;

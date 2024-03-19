import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {pbClient} from "@/lib/db";
import {UserPlus, Users} from "lucide-react";
import {cookies} from "next/headers";
import React from "react";
import DatePickerWithRange from "../doctor/DateRangePicker";
import NewPatient from "./NewPatient";
import DataTable from "./DataTable";
import {columns} from "./columns";

const Accountant = async () => {
	const pbAuth = cookies().get("pb_auth")?.value;
	pbClient.authStore.loadFromCookie(pbAuth!);
	const currentUser: userData & any = pbClient.authStore.model!;
	const patientList: patientData[] = await pbClient
		.collection("patients")
		.getFullList();

	return (
		<div>
			<div>
				<h1 className="text-2xl font-bold">
					Welcome back {JSON.stringify(currentUser.username)}
				</h1>
				<h4 className="text-sm text-gray-800">
					Here is a summary the appointments
				</h4>
			</div>
			<div className="pt-12 flex justify-between">
				<DatePickerWithRange></DatePickerWithRange>
				<NewPatient></NewPatient>
			</div>
			<div className="pt-4 flex gap-5 xl:gap-16 flex-wrap">
				<Card className="flex flex-col border-[1px]shadow-sm max-w-[300px] rounded-xl min-w-[250px]">
					<CardHeader className="flex flex-row items-baseline justify-between w-full">
						<CardTitle className="text-md font-medium">
							Total Revenue
						</CardTitle>
						<UserPlus className="w-5 h-5"></UserPlus>
					</CardHeader>
					<CardContent className="w-full flex flex-row justify-center">
						<strong>$</strong>
						<p className="text-2xl font-bold">56.2</p>
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
						<p className="text-2xl font-bold">56</p>
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

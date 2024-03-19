import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {pbClient} from "@/lib/db";
import {cookies} from "next/headers";
import React from "react";
import DatePickerWithRange from "./DateRangePicker";
import DataTable from "./DataTable";
import {ColumnDef} from "@tanstack/react-table";
import {columns} from "./columns";
import NewPatient from "../accountant/NewPatient";
import {AlertCircle, Cross, Plus, UserPlus, Users} from "lucide-react";

const Doctor = async () => {
	const pbAuth = cookies().get("pb_auth")?.value;
	pbClient.authStore.loadFromCookie(pbAuth!);
	const currentUser: userData & any = pbClient.authStore.model!;
	const patientList: patientData[] = await pbClient
		.collection("patients")
		.getFullList({filter: `doctor.id = '${pbClient.authStore.model?.id}'`});

	return (
		<div>
			<div>
				<h1 className="text-2xl font-bold">
					Welcome back Dr {JSON.stringify(currentUser.username)}
				</h1>
				<h4 className="text-sm text-gray-800">
					Here is a summary of your patients
				</h4>
			</div>
			<div className="pt-12 flex justify-between">
				<DatePickerWithRange></DatePickerWithRange>
			</div>
			<div className="pt-4 flex gap-5 xl:gap-16 flex-wrap">
				<Card className="flex flex-col border-[1px]shadow-sm max-w-[300px] rounded-xl min-w-[250px]">
					<CardHeader className="flex flex-row items-baseline justify-between w-full">
						<CardTitle className="text-md font-medium">
							Total New Patients
						</CardTitle>
						<UserPlus className="w-5 h-5"></UserPlus>
					</CardHeader>
					<CardContent className="flex flex-col items-start">
						<div className="w-full flex justify-center">
							<p className="text-2xl font-bold">24</p>
						</div>
					</CardContent>
				</Card>
				<Card className="flex flex-col border-[1px]shadow-sm max-w-[300px] rounded-xl min-w-[250px]">
					<CardHeader className="flex flex-row items-baseline justify-between w-full">
						<CardTitle className="text-md font-medium">
							Total Patients
						</CardTitle>
						<Users className="w-5 h-5"></Users>
					</CardHeader>
					<CardContent className="flex flex-col items-start">
						<div className="w-full flex justify-center">
							<p className="text-2xl font-bold">56</p>
						</div>
					</CardContent>
				</Card>
				<Card className="flex flex-col border-[1px]shadow-sm max-w-[300px] rounded-xl min-w-[250px]">
					<CardHeader className="flex flex-row items-baseline justify-between w-full">
						<CardTitle className="text-md font-medium">
							Critical Conditions
						</CardTitle>
						<AlertCircle className="w-5 h-5"></AlertCircle>
					</CardHeader>
					<CardContent className="flex flex-col items-start">
						<div className="w-full flex justify-center">
							<p className="text-2xl font-bold">56</p>
						</div>
					</CardContent>
				</Card>
				<Card className="flex flex-col border-[1px]shadow-sm max-w-[300px] rounded-xl min-w-[250px]">
					<CardHeader className="flex flex-row items-baseline justify-between w-full">
						<CardTitle className="text-md font-medium">
							Non-Critical Conditions
						</CardTitle>
						<Cross className="w-5 h-5"></Cross>
					</CardHeader>
					<CardContent className="flex flex-col items-start">
						<div className="w-full flex justify-center">
							<p className="text-2xl font-bold">56</p>
						</div>
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

export default Doctor;

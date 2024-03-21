import React from "react";
import DatePickerWithRange from "../DateRangePicker";
import DataTable from "./DataTable";
import {columns} from "./columns";
import {UserPlus} from "lucide-react";
import {userType, patientType} from "@/lib/types";
import {GET_PATIENTS_URL} from "@/lib/urls";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {pbClient} from "@/lib/db";
import {cookies} from "next/headers";

const Pharmacist = async ({from, to}: {from: Date; to: Date}) => {
	const pbAuth = cookies().get("pb_auth")?.value;
	pbClient.authStore.loadFromCookie(pbAuth!);
	const currentUser: userType & any = pbClient.authStore.model!;
	const res = await fetch(
		process.env.NEXT_PUBLIC_PB_URL + GET_PATIENTS_URL + `?filter=prescription != ''`,
		{
			next: {tags: ["patients"]},
			headers: {
				Authorization: pbClient.authStore.token,
			},
		}
	);
	const result = await res.json();
	const patientList: patientType[] = result.items;
	return (
		<div>
			<div>
				<h1 className="text-2xl font-bold">
					Welcome back Dr {JSON.stringify(currentUser.username)}
				</h1>
				<h4 className="text-sm text-gray-800">
					Here is a summary of patients with prescription
				</h4>
			</div>
			<div className="pt-12 flex justify-between">
				<DatePickerWithRange
					from={from}
					to={to}></DatePickerWithRange>
			</div>
			<div className="pt-4 flex gap-5 xl:gap-16 flex-wrap">
				<Card className="flex flex-col border-[1px]shadow-sm max-w-[300px] rounded-xl min-w-[250px]">
					<CardHeader className="flex flex-row items-baseline justify-between w-full">
						<CardTitle className="text-md font-medium">
							Total Patients
						</CardTitle>
						<UserPlus className="w-5 h-5"></UserPlus>
					</CardHeader>
					<CardContent className="flex flex-col items-start">
						<div className="w-full flex justify-center">
							<p className="text-2xl font-bold">{patientList.length}</p>
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

export default Pharmacist;

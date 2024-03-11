import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {pbClient} from "@/lib/db";
import {cookies} from "next/headers";
import React from "react";
import DatePickerWithRange from "./DateRangePicker";
import DataTable from "./DataTable";
import {ColumnDef} from "@tanstack/react-table";
import {columns} from "./columns";

const Doctor = async () => {
	const pbAuth = cookies().get("pb_auth")?.value;
	pbClient.authStore.loadFromCookie(pbAuth!);
	const data: userData & any = pbClient.authStore.model!;
	const patientList: patientData[] = await pbClient
		.collection("patients")
		.getFullList({filter: `doctor.id = '${pbClient.authStore.model?.id}'`});

	return (
		<div>
			<div>
				<h1 className="text-2xl font-bold">
					Welcome back Dr {JSON.stringify(data.username)}
				</h1>
				<h4 className="text-sm text-gray-800">
					Here is a summary of your patients
				</h4>
			</div>
			<div className="pt-12">
				<DatePickerWithRange></DatePickerWithRange>
			</div>
			<div className="pt-4 flex gap-5 xl:gap-16 flex-wrap">
				<Card className="flex flex-col border-[1px]shadow-sm max-w-[300px] rounded-xl min-w-[250px]">
					<CardHeader className="flex flex-row items-baseline justify-between w-full">
						<CardTitle className="text-md font-medium">
							Total New Patients
						</CardTitle>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-user-plus">
							<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
							<circle
								cx="9"
								cy="7"
								r="4"
							/>
							<line
								x1="19"
								x2="19"
								y1="8"
								y2="14"
							/>
							<line
								x1="22"
								x2="16"
								y1="11"
								y2="11"
							/>
						</svg>
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-users">
							<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
							<circle
								cx="9"
								cy="7"
								r="4"
							/>
							<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
							<path d="M16 3.13a4 4 0 0 1 0 7.75" />
						</svg>
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-alert-circle">
							<circle
								cx="12"
								cy="12"
								r="10"
							/>
							<line
								x1="12"
								x2="12"
								y1="8"
								y2="12"
							/>
							<line
								x1="12"
								x2="12.01"
								y1="16"
								y2="16"
							/>
						</svg>
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-cross">
							<path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
						</svg>
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

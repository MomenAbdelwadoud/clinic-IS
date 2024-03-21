"use client";
import {ColumnDef} from "@tanstack/react-table";
import {patientType} from "@/lib/types";

export const columns: ColumnDef<patientType>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "prescription",
		header: "Prescription",
		cell: ({row}) => {
			const patient = row.original;
			return (
				<div className="max-w-xs truncate hover:overflow-x-scroll hover:text-wrap">
					{patient.prescription ? patient.prescription : "No prescription"}
				</div>
			);
		},
	},
	{
		accessorKey: "created",
		header: "Created",
	},
	{
		accessorKey: "updated",
		header: "Updated",
	},
];

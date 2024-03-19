"use client";
import {ColumnDef} from "@tanstack/react-table";
import {patientData} from "@/lib/types";

export const columns: ColumnDef<patientData>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},

	{
		accessorKey: "created",
		header: "Created",
	},
];

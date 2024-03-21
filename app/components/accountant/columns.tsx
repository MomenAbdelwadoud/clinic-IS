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
		accessorKey: "created",
		header: "Created",
	},
];

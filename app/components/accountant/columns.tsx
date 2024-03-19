"use client";
import {ColumnDef} from "@tanstack/react-table";

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

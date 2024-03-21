"use client";
import {ColumnDef} from "@tanstack/react-table";
import {MoreHorizontal, X} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {useState} from "react";
import {pbClient} from "@/lib/db";
import UpdatePatientForm from "./UpdatePatientForm";
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
		accessorKey: "notes",
		header: "Notes",
		cell: ({row}) => {
			const patient = row.original;
			return (
				<div className="max-w-xs truncate">
					{patient.notes ? patient.notes : "No notes"}
				</div>
			);
		},
	},
	{
		accessorKey: "prescription",
		header: "Prescription",
		cell: ({row}) => {
			const patient = row.original;
			return (
				<div className="max-w-xs truncate">
					{patient.prescription ? patient.prescription : "No prescription"}
				</div>
			);
		},
	},
	{
		accessorKey: "condition",
		header: "Condition",
	},
	{
		accessorKey: "created",
		header: "Created",
	},
	{
		accessorKey: "updated",
		header: "Updated",
	},
	{
		id: "actions",
		cell: ({row}) => {
			const patient = row.original;
			const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
			const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
			const deletePatient = async (patientId: string) => {
				try {
					console.log(patientId);
					await pbClient.collection("patients").delete(patientId);
					setDeleteDialogOpen(false);
					window.location.reload();
				} catch (error) {
					console.log(error);
				}
			};
			return (
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="h-6 w-6 p-0">
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem onClick={() => setUpdateDialogOpen(true)}>
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								className="text-red-500"
								onClick={() => setDeleteDialogOpen(true)}>
								<p className="text-red-500">Delete</p>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<AlertDialog open={deleteDialogOpen}>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Are you sure to delete this patient record?
								</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently
									delete the patient data and remove it from the
									database.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel
									onClick={() => setDeleteDialogOpen(false)}>
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction
									className="bg-red-500"
									onClick={() => deletePatient(patient.id)}>
									Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
					<AlertDialog open={updateDialogOpen}>
						<AlertDialogContent>
							<AlertDialogHeader className="flex justify-between items-center flex-row">
								<AlertDialogTitle>Edit Patient</AlertDialogTitle>
								<X
									onClick={() => setUpdateDialogOpen(false)}
									className="h-5 w-5 cursor-pointer"></X>
							</AlertDialogHeader>
							<UpdatePatientForm patientData={patient}></UpdatePatientForm>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			);
		},
	},
];

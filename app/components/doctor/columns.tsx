"use client";
import {ColumnDef} from "@tanstack/react-table";
import {MoreHorizontal} from "lucide-react";

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
		accessorKey: "notes",
		header: "Notes",
	},
	{
		accessorKey: "prescription",
		header: "Prescription",
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
			const [dialogOpen, setDialogOpen] = useState(false);
			const deletePatient = async (patientId: string) => {
				try {
					console.log(patientId);
					await pbClient.collection("patients").delete(patientId);
					setDialogOpen(false);
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
							<DropdownMenuItem>Edit</DropdownMenuItem>
							<DropdownMenuItem
								className="text-red-500"
								onClick={() => setDialogOpen(true)}>
								<p className="text-red-500">Delete</p>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<AlertDialog open={dialogOpen}>
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
								<AlertDialogCancel onClick={() => setDialogOpen(false)}>
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
				</div>
			);
		},
	},
];

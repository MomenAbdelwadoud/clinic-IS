import React from "react";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {pbClient} from "@/lib/db";
import Cookies from "js-cookie";
import {patientData} from "@/lib/types";

const formSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().email().min(2).max(50),
	condition: z.enum(["green", "red"]),
	notes: z.string().min(1),
	prescription: z.string().optional(),
});

const UpdatePatientForm = ({patientData}: {patientData: patientData}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: patientData.name,
			email: patientData.email,
			condition: patientData.condition,
			notes: patientData.notes,
			prescription: patientData.prescription,
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Add patient to pbClient
		try {
			const pbAuth = Cookies.get("pb_auth");
			pbClient.authStore.loadFromCookie(pbAuth!);
			await pbClient.collection("patients").update(patientData.id, values);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<Form {...form}>
			<form
				id="update-patient"
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({field}) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder="John Doe"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({field}) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="Email address"
									type="email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}></FormField>
				<FormField
					control={form.control}
					name="condition"
					render={({field}) => (
						<FormItem>
							<FormLabel>Condition</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a condition" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem
										value="green"
										className="text-green">
										Green
									</SelectItem>
									<SelectItem
										value="red"
										className="text-red">
										Red
									</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}></FormField>

				<FormField
					control={form.control}
					name="notes"
					render={({field}) => (
						<FormItem>
							<FormLabel>Notes</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Notes about the patient"
									className="resize-none h-32"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="prescription"
					render={({field}) => (
						<FormItem>
							<FormLabel>Prescription</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Write a prescription for the patient"
									className="resize-none h-32"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					form="update-patient">
					Edit
				</Button>
			</form>
		</Form>
	);
};

export default UpdatePatientForm;

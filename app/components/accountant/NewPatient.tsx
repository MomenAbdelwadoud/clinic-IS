"use client";
import {Button} from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {pbClient} from "@/lib/db";
import {zodResolver} from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import {Plus} from "lucide-react";
import {useForm} from "react-hook-form";
import {z} from "zod";

const formSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().email().min(2).max(50),
	condition: z.enum(["green", "red"]),
	notes: z.string().min(1),
	prescription: z.string().optional(),
	doctor: z.any().optional(),
});
const NewPatient = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					New Patient
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Patient</DialogTitle>
				</DialogHeader>
				<NewPatientForm></NewPatientForm>
			</DialogContent>
		</Dialog>
	);
};

const NewPatientForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Add patient to pbClient
		try {
			const pbAuth = Cookies.get("pb_auth");
			pbClient.authStore.loadFromCookie(pbAuth!);
			const currentDoctorId = pbClient.authStore.model?.id;
			values = {...values, doctor: currentDoctorId};
			await pbClient.collection("patients").create(values);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<Form {...form}>
			<form
				id="new-patient"
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
									placeholder="JohnDoe"
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
					form="new-patient">
					Add
				</Button>
			</form>
		</Form>
	);
};

export default NewPatient;

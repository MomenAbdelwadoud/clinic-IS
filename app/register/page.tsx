import React from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import {pbClient} from "@/lib/db";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const Register = () => {
	const registerUser = async (formData: FormData) => {
		"use server";
		const data = {
			username: formData.get("username")!,
			email: formData.get("email")!,
			password: formData.get("password")!,
			passwordConfirm: formData.get("password")!,
			role: formData.get("role"),
		};
		try {
			const record = await pbClient.collection("users").create(data);
			const authData = await pbClient
				.collection("users")
				.authWithPassword(data.email as string, data.password as string);
			cookies().set("pb_auth", pbClient.authStore.exportToCookie());
		} catch (error) {
			return error;
		}
		redirect("/");
	};
	return (
		<div className="flex flex-col justify-center items-center min-h-screen">
			<Card className="min-w-1/4 lg:w-1/4 min-h-[400px] flex flex-col justify-center">
				<CardHeader>
					<CardTitle>Register</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						action={registerUser}
						className="space-y-10">
						<div>
							<Label htmlFor="email">Email:</Label>
							<Input
								name="email"
								type="email"
								placeholder="someone@example.com"></Input>
						</div>
						<div>
							<Label htmlFor="username">User Name:</Label>
							<Input
								name="username"
								type="text"
								placeholder="Firstname_lastname"></Input>
						</div>
						<div>
							<Label htmlFor="Password">Password:</Label>
							<Input
								name="password"
								type="password"
								placeholder="********"></Input>
						</div>
						<div>
							<Select name="role">
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select your role" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Role</SelectLabel>
										<SelectItem value="doctor">Doctor</SelectItem>
										<SelectItem value="accountant">
											Accountant
										</SelectItem>
										<SelectItem value="pharmacist">
											Pharmacist
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<p>
							have an account?{" "}
							<Link
								href={"login"}
								className="underline">
								login here
							</Link>
						</p>
						<Button type="submit">Register</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default Register;

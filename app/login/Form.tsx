"use client";

import React from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {pbClient} from "@/lib/db";
import Cookies from "js-cookie";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {z} from "zod";
import {useRouter} from "next/navigation";

const formSchema = z.object({
	usernameOrEmail: z.string().min(2).max(50),
	password: z.string().min(2).max(50),
});

export const LoginForm = () => {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>();
	const {
		setError,
		formState: {errors},
	} = useForm();
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const data = {
			email: values.usernameOrEmail,
			password: values.password,
			passwordConfirm: values.password,
		};
		try {
			const authData = await pbClient
				.collection("users")
				.authWithPassword(data.email as string, data.password as string);
			Cookies.set("pb_auth", pbClient.authStore.exportToCookie());
			router.replace("/");
			router.refresh(); // Logout button doesn't appear without refreshing
		} catch (error) {
			setError("password", {message: "Invalid credentials"});
			return error;
		}
	};
	return (
		<Form {...form}>
			<Card className="min-w-1/4 lg:w-1/4 min-h-[400px] flex flex-col justify-center">
				<CardHeader>
					<CardTitle>Login</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-10">
						<div>
							<FormField
								control={form.control}
								name="usernameOrEmail"
								render={({field}) => (
									<FormItem>
										<FormLabel>Email or Username</FormLabel>
										<FormControl>
											<Input
												placeholder="someone@example.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div>
							<FormField
								control={form.control}
								name="password"
								render={({field}) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="********"
												type="password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
										{errors.password && (
											<FormMessage>
												{errors.password.message?.toString()}
											</FormMessage>
										)}
									</FormItem>
								)}
							/>
						</div>
						<p>
							don't have an account?{" "}
							<Link
								href={"register"}
								className="underline">
								register here
							</Link>
						</p>
						<Button type="submit">Login</Button>
					</form>
				</CardContent>
			</Card>
		</Form>
	);
};

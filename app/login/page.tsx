import React from "react";
import {Button} from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Link from "next/link";

const Login = () => {
	return (
		<div className="flex flex-col justify-center items-center min-h-screen">
			<Card className="w-1/4 min-h-[400px] flex flex-col justify-center">
				<CardHeader>
					<CardTitle>Login</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						action=""
						className="space-y-10">
						<div>
							<Label htmlFor="email">Email:</Label>
							<Input
								name="email"
								type="email"
								placeholder="someone@example.com"></Input>
						</div>
						<div>
							<Label htmlFor="Password">Password:</Label>
							<Input
								name="password"
								type="password"
								placeholder="********"></Input>
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
		</div>
	);
};

export default Login;

import {pbClient} from "@/lib/db";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {LoginForm} from "./Form";

const Login = () => {
	return (
		<div className="flex flex-col justify-center items-center min-h-screen">
			<LoginForm></LoginForm>
		</div>
	);
};

export default Login;

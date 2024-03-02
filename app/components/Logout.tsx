"use client";
import {Button} from "@/components/ui/button";
import React from "react";
import Cookies from "js-cookie";

const Logout = () => {
	const logout = () => {
		Cookies.remove("pb_auth");
		window.location.pathname = "/login";
	};
	return (
		<div>
			<Button
				onClick={logout}
				variant={"outline"}>
				Logout
			</Button>
		</div>
	);
};

export default Logout;

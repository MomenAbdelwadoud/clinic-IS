"use client";
import {Button} from "@/components/ui/button";
import {useCookies} from "next-client-cookies";
import React from "react";

const Logout = () => {
	const cookies = useCookies();
	const logout = () => {
		cookies.remove("pb_auth");
		window.location.pathname = "/login";
	};
	return (
		<div>
			<Button onClick={logout}>Logout</Button>
		</div>
	);
};

export default Logout;

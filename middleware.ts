import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {pbClient} from "./lib/db";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export const config = {
	//Match with regex every path except login and register
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|login|register).*)",
	],
};
export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const auth_cookie = cookies().get("pb_auth");
	if (!auth_cookie) {
		return NextResponse.redirect(new URL("/login", req.url));
	}
	pbClient.authStore.loadFromCookie(auth_cookie.value);
	if (pbClient.authStore.isValid) {
		return res;
	} else {
		return NextResponse.redirect(new URL("/login", req.url));
	}
}

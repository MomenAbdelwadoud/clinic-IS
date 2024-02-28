import dotenv from "dotenv";
import type {Config} from "drizzle-kit";

dotenv.config({
	path: ".env.local",
});

export default {
	schema: "./app/lib/schema.ts",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.SUPABASE_URL!,
	},
} satisfies Config;

export type userType = {
	username: string;
	email: string;
	password: string;
	role: "doctor" | "accountant" | "pharmacist";
};

export type patientType = {
	id: string;
	name: string;
	email: string;
	notes: string;
	prescription: string;
	condition: "green" | "red";
	created: DateTime;
	updated: DateTime;
};

export const appointmentRevenue = 12.2;

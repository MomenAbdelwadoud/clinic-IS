export type userData = {
	username: string;
	email: string;
	password: string;
	role: "doctor" | "accountant" | "pharmacist";
};

export type patientData = {
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

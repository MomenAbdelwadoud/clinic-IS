type userData = {
	username: string;
	email: string;
	password: string;
	role: "doctor" | "accountant" | "pharmacist";
};

type patientData = {
	id: string;
	name: string;
	email: string;
	notes: string;
	prescription: string;
	condition: "green" | "red";
	created: DateTime;
	updated: DateTime;
};

const cost = 12.2;

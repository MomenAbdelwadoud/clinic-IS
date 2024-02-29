enum userRole {
	doctor,
	accountant,
	pharmacist,
}
interface userData {
	username: string;
	email: string;
	password: string;
	role: userRole;
}

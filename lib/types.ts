enum userRole {
	doctor,
	accountant,
	pharmacist,
}
type userData {
	username: string;
	email: string;
	password: string;
	role: userRole;
}

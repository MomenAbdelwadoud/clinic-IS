enum userRole {
	doctor,
	accountant,
	pharmacist,
}
type userData = {
	username: string;
	email: string;
	password: string;
	role: userRole;
};
//  Notes: '<p>Needs nursary</p>',
//     Prescription: '<p>Saline, Oxygen</p>',
//     collectionId: 'riao0kw6gwr8j1p',
//     collectionName: 'patients',
//     condition: 'red',
//     created: '2024-03-03 16:54:07.177Z',
//     doctor: 'x9nn6k69vyx17ac',
//     email: 'patient3@gmail.com',
//     id: '1kmtn0hvqospkyg',
//     name: 'patient3',
//     updated: '2024-03-03 16:54:07.177Z'
type patientData = {
	id: string;
	name: string;
	email: string;
	notes: string;
	prescription: string;
	condition: "green" | "red";
	doctorId: string;
	created: DateTime;
	updated: DateTime;
};

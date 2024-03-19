import {faker} from "@faker-js/faker";
import {pbClient} from "./db";

const countArg = process.argv[2];
const count = Number(countArg);

// Get first doctor
const getFirstDoctor = async (): Promise<any> => {
	try {
		const response = await pbClient
			.collection("users")
			.getFirstListItem("role = 'doctor'");
		return response;
	} catch (error) {
		console.error("Error getting first doctor:", error);
	}
};

const doctor = await getFirstDoctor();
const generateRandomPatient = (): patientData & any => {
	const patientData = {
		name: faker.person.firstName(),
		email: faker.internet.email(),
		condition: faker.helpers.arrayElement(["green", "red"]),
		notes: faker.lorem.paragraph(),
		prescription: faker.lorem.paragraphs(),
		doctor: doctor.id,
	};

	return patientData;
};

const generateRandomPatients = async (count: number) => {
	const patientList = Array.from({length: count}, () => generateRandomPatient());
	// Loop through patients to create them in the database
	for (const patient of patientList) {
		try {
			await pbClient.collection("patients").create(patient);
			console.log(patient);
		} catch (error) {
			console.error("Error creating patient:", error);
		}
	}
};

generateRandomPatients(count);

export default generateRandomPatients;

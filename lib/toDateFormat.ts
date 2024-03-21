export const toDateFormat = (from: string, to: string) => {
	/**
	 * Takes two date strings from the possible 2 date formats and returns a formatted date string (yyyy-mm-dd)
	 * @param from start date string
	 * @param to end date string
	 * @returns a formatted date string (yyyy-mm-dd)
	 */
	let newFrom, newTo;
	if (from.startsWith("2")) {
		//First format (2024-02-20T21:56:15.799Z)
		newFrom = from.split("T")[0];
	} else {
		// Second format (Thu Mar 21 2024 00:00:00 GMT+0300 (East Africa Time))
		const date = new Date(from);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		newFrom = `${year}-${month}-${day}`;
	}

	if (to.startsWith("2")) {
		newTo = to.split("T")[0];
	} else {
		const date = new Date(to);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		newTo = `${year}-${month}-${day}`;
	}
	return {from: newFrom, to: newTo};
};

// Test it
// console.log(
// 	toDateFormat(
// 		"2024-02-20T21:56:15.799Z",
// 		"Thu Mar 21 2024 00:00:00 GMT+0300 (East Africa Time)"
// 	)
// );

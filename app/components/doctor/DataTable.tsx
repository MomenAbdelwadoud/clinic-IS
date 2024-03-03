import React from "react";

const DataTable = ({props: patientData}: {props: patientData[]}) => {
	return <div>{JSON.stringify(patientData)}</div>;
};

export default DataTable;

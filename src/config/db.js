import mysql from "mysql2";

const conn = mysql
	.createConnection({
		multipleStatements: true,
		host: "localhost",
		user: "root",
		database: "typescript_pos",
	})
	.promise();

export default conn;

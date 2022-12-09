import bcrypt from "bcrypt";

export const HashString = (params: string) => {
	const salt = bcrypt.genSaltSync(10);
	const password = bcrypt.hashSync(params, salt);
	return password;
};

export const ComparePassword = async (params: string, uPassword: string) => {
	const match = await bcrypt.compare(params, uPassword);

	return match;
};

interface StatusError extends Error {
	status?: number;
}

export const CreateError = (status: number, message: any) => {
	const err: StatusError = new Error();
	err.message = message;
	err.status = status;
};

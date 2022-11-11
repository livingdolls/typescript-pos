export const response = (
	statusCode: number,
	success: boolean,
	data: any,
	message: string,
	res: any
) => {
	res.status(statusCode).json({
		code: statusCode,
		success: success,
		data: data,
		message: message,
	});
};

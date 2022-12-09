import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import CategoriRoute from "./routes/CategoriRoute";
import AuthRoute from "./routes/Auth.route";
import UserRoute from "./routes/User.route";
import SatuanRoute from "./routes/Satuan.route";
import BarangRoute from "./routes/Barang.route";
import TransaksiRoute from "./routes/Transaksi.route";

const app: Application = express();
dotenv.config();

// Dependencies
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(cookieParser());

// Routes
app.route("/").get((req: Request, res: Response) => {
	res.send("Hello");
});

app.use("/api/v1/categori", CategoriRoute);
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/satuan", SatuanRoute);
app.use("/api/v1/barang", BarangRoute);
app.use("/api/v1/transaksi", TransaksiRoute);

// Error Handle

interface StatusError extends Error {
	status?: number;
}

app.use(
	(
		err: StatusError,
		req: Request,
		res: Response,
		next: NextFunction
	): Response => {
		const errorStatus: number = err.status || 500;
		const errorMessage: string = err.message || "Ada sesuatu yang salah!";

		return res.status(errorStatus).json({
			success: false,
			status: errorStatus,
			message: errorMessage,
			stack: err.stack,
		});
	}
);

const port: number = 8800;
app.listen(port, () => {
	console.log("Server connected!");
});

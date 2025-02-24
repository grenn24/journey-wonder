import User from "../models/user";
import bcrypt from "bcryptjs";
import { HttpError } from "../middlewares/error";
import { validateRefreshToken } from "../middlewares/auth";
import lodash from "lodash";

class AuthService {
	async login(email: string, password: string, remember: boolean) {
		try {
			const user = await User.findOne({ email }).exec();

			if (!user) {
				throw new HttpError(
					"Invalid email or password",
					"INVALID_EMAIL_PASSWORD"
				);
			}

			const isValid = await bcrypt.compare(password, user.passwordHash);
			if (!isValid) {
				throw new HttpError(
					"Invalid email or password",
					"INVALID_EMAIL_PASSWORD"
				);
			}

			return {
				accessToken: user.generateAccessToken(),
				refreshToken: user.generateRefreshToken(
					remember ? "30d" : "5d"
				),
				user: lodash.omit(user.toObject(), ["passwordHash"]),
			};
		} catch (err) {
			throw err;
		}
	}

	async refreshAccessToken(refreshToken : string) {
		const payload = validateRefreshToken(refreshToken);
		if (!payload) {
			throw new HttpError(
				"Invalid or missing refresh tokens",
				"INVALID_REFRESH_TOKEN"
			);
		}
		const user = await User.findById(payload?.userID).exec();
		return user?.generateAccessToken();
	}
}

const authService = new AuthService;
export default authService;
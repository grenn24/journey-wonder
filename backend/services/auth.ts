import User, { generateUniqueUsername } from "../models/user";
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
					"INVALID_EMAIL_PASSWORD",
					400
				);
			}

			if (!user.passwordHash) {
				throw new HttpError(
					"Password not yet created for email log-in",
					"PASSWORD_NOT_CREATED",
					400
				);
			}

			const isValid = await bcrypt.compare(password, user.passwordHash);
			if (!isValid) {
				throw new HttpError(
					"Invalid email or password",
					"INVALID_EMAIL_PASSWORD",
					400
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

	async signUp(user: any) {
		try {
			const existingEmail = await User.findOne({
				email: user.email,
			}).exec();

			// generate a unique and random username
			if (!user.username) {
				user.username = await generateUniqueUsername();
			}

			const existingUsername = await User.findOne({
				username: user.username,
			}).exec();

			if (existingEmail && existingUsername) {
				throw new HttpError(
					"Email and username is used by an existing user",
					"DUPLICATE_EMAIL_USERNAME",
					400
				);
			}

			if (existingEmail) {
				throw new HttpError(
					"Email is used by an existing user",
					"DUPLICATE_EMAIL",
					400
				);
			}

			if (existingUsername) {
				throw new HttpError(
					"Username is used by an existing user",
					"DUPLICATE_USERNAME",
					400
				);
			}

			const salt = await bcrypt.genSalt(10);
			user.passwordHash = await bcrypt.hash(user.password, salt);
			const createdUser = await User.create(user);

			return {
				accessToken: createdUser.generateAccessToken(),
				refreshToken: createdUser.generateRefreshToken("5d"),
				user: lodash.omit(createdUser.toObject(), ["passwordHash"]),
			};
		} catch (err) {
			throw err;
		}
	}

	async refreshAccessToken(refreshToken: string) {
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

const authService = new AuthService();
export default authService;

import config from "config";

export default () => {
	if (!config.get("DATABASE_URL")) {
		throw new Error("DATABASE_URL is not defined");
	}
	if (!config.get("SECRET_KEY")) {
		throw new Error("SECRET_KEY is not defined");
	}
};

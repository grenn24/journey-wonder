import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import config from "config";

import fs from "fs";
import path from "path";

const s3Client = new S3Client({
	region: "Asia-Pacific (APAC)",
	endpoint:
		"https://b1cb741b9309fdc766c68da7e934df35.r2.cloudflarestorage.com/journeywonder",
	credentials: {
		accessKeyId: config.get("S3_ACCESS_KEY_ID"),
		secretAccessKey: config.get("S3_SECRET_ACCESS_KEY"),
	},
});

const uploadFile = async (
	file: File,
	filename: string,
	folders: string[] = []
) => {
	try {
		const buffer = Buffer.from(await file.arrayBuffer());
		const tempPath = path.join(__dirname, "temp_" + file.name);
		await fs.promises.writeFile(tempPath, buffer); // write buffer to file
		const fileStream = fs.createReadStream(tempPath); // create stream from path

		folders.push(filename)
		const params = {
			Bucket: "journeywonder",
			Key: folders.join("/"),
			Body: fileStream,
			ContentType: file.type,
		};

		const command = new PutObjectCommand(params);

		const response = await s3Client.send(command);
		return response;
	} catch (err: any) {
		throw new err();
	}
};

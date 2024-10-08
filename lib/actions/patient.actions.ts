"use server";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import {
	BUCKET_ID,
	DATABASE_ID,
	databases,
	ENDPOINT,
	PATIENT_COLLECTION_ID,
	PROJECT_ID,
	storage,
	users,
} from "../appwrite.config";
import { InputFile } from "node-appwrite/file";
import { sendSMSNotification } from "./appointment.actions";

export const createUser = async (user: CreateUserParams) => {
	try {
		const newUser = await users.create(
			ID.unique(),
			user.email,
			user.phone,
			undefined,
			user.name
		);

		return parseStringify(newUser);
	} catch (error: any) {
		if (error && error?.code === 409) {
			const documents = await users.list([
				Query.equal("email", [user.email]),
			]);
			return documents?.users[0];
		}
		console.error("An error occurred while creating a new user:", error);
	}
};

export const getUser = async (userId: string) => {
	try {
		const user = await users.get(userId);
		console.log(user);

		return parseStringify(user);
	} catch (error) {
		console.log(
			"An error occurred while retrieving the user details:",
			error
		);
	}
};

export const getPatient = async (userId: string) => {
	try {
		const patients = await databases.listDocuments(
			DATABASE_ID!,
			PATIENT_COLLECTION_ID!,
			[Query.equal("userId", userId)]
		);
		console.log(patients);

		return parseStringify(patients.documents[0]);
	} catch (error) {
		console.log(
			"An error occurred while retrieving the user details:",
			error
		);
	}
};

export const registerPatient = async ({
	identificationDocument,
	...patient
}: RegisterUserParams) => {
	try {
		let file;
		if (identificationDocument) {
			const inputFiles = InputFile.fromBuffer(
				identificationDocument?.get("blobFile") as Blob,
				identificationDocument?.get("fileName") as string
			);
			file = await storage.createFile(
				BUCKET_ID!,
				ID.unique(),
				inputFiles
			);
		}
		const patientData = await databases.createDocument(
			DATABASE_ID!,
			PATIENT_COLLECTION_ID!,
			ID.unique(),
			{
				identificationDocumentId: file?.$id || null,
				identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
				...patient,
			}
		);
		const content = `Hi, ${patient.name}. Your account has been successfully created with CarePulse.`;
		await sendSMSNotification(patient.userId, content);
		return parseStringify(patientData);
	} catch (error) {
		console.log(error);
	}
};

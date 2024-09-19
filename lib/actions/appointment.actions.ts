"use server";
import { ID, Query } from "node-appwrite";
import {
	APPOINTMENT_COLLECTION_ID,
	DATABASE_ID,
	databases,
	messaging,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (
	appointment: CreateAppointmentParams
) => {
	try {
		const newAppointment = await databases.createDocument(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			ID.unique(),
			appointment
		);
		const content = `Hi, it's CarePulse. ${`Your appointment has been booked for ${
			formatDateTime(appointment.schedule!).dateTime
		} with Dr. ${appointment.primaryPhysician}.`}`;
		await sendSMSNotification(appointment.userId, content);
		return parseStringify(newAppointment);
	} catch (error) {
		console.log(error);
	}
};

export const getAppointment = async (appointmentId: string) => {
	try {
		const appointment = await databases.getDocument(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			appointmentId
		);
		return parseStringify(appointment);
	} catch (error) {
		console.log(error);
	}
};

export const getRecentAppointmentList = async () => {
	try {
		const appointments = await databases.listDocuments(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			[Query.orderDesc("$createdAt")]
		);
		const initialCounts = {
			scheduledCount: 0,
			pendingCount: 0,
			cancelledCount: 0,
		};
		const counts = (appointments.documents as Appointment[]).reduce(
			(acc, appointment) => {
				switch (appointment.status) {
					case "Scheduled":
						acc.scheduledCount++;
						break;
					case "Pending":
						acc.pendingCount++;
						break;
					case "Cancelled":
						acc.cancelledCount++;
						break;
				}
				return acc;
			},
			initialCounts
		);
		const data = {
			totalCount: appointments.total,
			...counts,
			documents: appointments.documents,
		};
		return parseStringify(data);
	} catch (error) {
		console.log(error);
	}
};

export const updateAppointment = async ({
	appointmentId,
	userId,
	appointment,
	type,
}: UpdateAppointmentParams) => {
	try {
		const updatedAppointment = await databases.updateDocument(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			appointmentId,
			appointment
		);

		const content = `Hi, it's CarePulse. ${
			type === "schedule"
				? `Your appointment has been ${type} for ${
						formatDateTime(appointment.schedule!).dateTime
				  } with Dr. ${appointment.primaryPhysician}.`
				: `We regret to inform you that your appointment with Dr. ${appointment.primaryPhysician} has been cancelled for the following reason: ${appointment.cancellationReason}`
		}`;
		await sendSMSNotification(userId, content);

		if (!updatedAppointment) throw new Error("Appointment not found");
		revalidatePath("/admin");
		return parseStringify(updatedAppointment);
	} catch (error) {
		console.log(error);
	}
};

export const sendSMSNotification = async (userId: string, content: string) => {
	try {
		const messsage = await messaging.createSms(
			ID.unique(),
			content,
			[],
			[userId]
		);
		return parseStringify(messsage);
	} catch (error) {
		console.log(error);
	}
};

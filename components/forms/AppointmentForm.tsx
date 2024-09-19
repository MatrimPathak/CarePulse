"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import Submitbutton from "../Submitbutton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import {
	createAppointment,
	updateAppointment,
} from "@/lib/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.types";

const AppointmentForm = ({
	userId,
	patientId,
	type,
	appointment,
	setOpen,
}: {
	userId: string;
	patientId: string;
	type: "create" | "schedule" | "cancel";
	appointment?: Appointment;
	setOpen: (open: boolean) => void;
}) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const AppointmentFormValidation = getAppointmentSchema(type);
	const form = useForm<z.infer<typeof AppointmentFormValidation>>({
		resolver: zodResolver(AppointmentFormValidation),
		defaultValues: {
			primaryPhysician: appointment ? appointment?.primaryPhysician : "",
			schedule: appointment
				? new Date(appointment?.schedule)
				: new Date(Date.now()),
			reason: appointment ? appointment.reason : "",
			note: appointment?.note || "",
			cancellationReason: appointment?.cancellationReason || "",
		},
	});

	const onSubmit = async (
		values: z.infer<typeof AppointmentFormValidation>
	) => {
		setIsLoading(true);
		let status;
		switch (type) {
			case "schedule":
				status = "Scheduled";
				break;
			case "cancel":
				status = "Cancelled";
				break;
			default:
				status = "Pending";
		}

		try {
			if (type === "create" && patientId) {
				const appointment = {
					userId,
					patient: patientId,
					primaryPhysician: values.primaryPhysician,
					schedule: new Date(values.schedule),
					reason: values.reason!,
					status: status as Status,
					note: values.note!,
				};
				const newAppointment = await createAppointment(appointment);

				if (newAppointment) {
					form.reset();
					router.push(
						`/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
					);
				}
			} else {
				const appointmentToUpdate = {
					userId,
					appointmentId: appointment?.$id!,
					appointment: {
						primaryPhysician: values.primaryPhysician,
						schedule: new Date(values.schedule),
						status: status as Status,
						cancellationReason: values.cancellationReason,
					},
					type,
				};
				const updatedAppointment = await updateAppointment(
					appointmentToUpdate
				);
				if (updatedAppointment) {
					setOpen && setOpen(false);
					form.reset();
				}
			}
		} catch (error) {
			console.error(error);
		}
		setIsLoading(false);
	};

	let buttonLabel;
	switch (type) {
		case "cancel":
			buttonLabel = "Cancel Appointment";
			break;
		case "create":
			buttonLabel = "Create Appointment";
			break;
		case "schedule":
			buttonLabel = "Schedule Appointment";
			break;
		default:
			break;
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 flex-1"
			>
				{type === "create" && (
					<section className="mb-12 space-y-4">
						<h1 className="header">New Appointment 👋</h1>
						<p className="text-dark-700">
							Request a new appointment in 10 seconds.
						</p>
					</section>
				)}
				{type !== "cancel" && (
					<>
						<CustomFormField
							control={form.control}
							fieldType={FormFieldType.SELECT}
							name="primaryPhysician"
							label="Doctor"
							placeholder="Select a doctor"
						>
							{Doctors.map((doctor) => (
								<SelectItem
									key={doctor.name}
									value={doctor.name}
								>
									<div className="flex items-center gap-2">
										<Image
											src={doctor.image}
											alt={doctor.name}
											width={32}
											height={32}
											className="rounded-full border border-dark-500"
										/>
										<p>Dr. {doctor.name}</p>
									</div>
								</SelectItem>
							))}
						</CustomFormField>
						<CustomFormField
							control={form.control}
							fieldType={FormFieldType.DATE_PICKER}
							name="schedule"
							label="Expected apooint date"
							showTimeSelect
							dateFormat="MMMM d, yyyy - h:mm aa"
						/>
						<div className="flex flex-col gap-6 xl:flex-row">
							<CustomFormField
								control={form.control}
								fieldType={FormFieldType.TEXTAREA}
								name="reason"
								label="Reason for appointment"
								placeholder="Enter appointment reason"
								disabled={type === "schedule"}
							/>
							<CustomFormField
								control={form.control}
								fieldType={FormFieldType.TEXTAREA}
								name="note"
								label="Notes"
								placeholder="Enter notes"
								disabled={type === "schedule"}
							/>
						</div>
					</>
				)}
				{type === "cancel" && (
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.TEXTAREA}
						name="cancellationReason"
						label="Reason for cancellation"
						placeholder="Enter resaon for cancellation"
					/>
				)}
				<Submitbutton
					isLoading={isLoading}
					className={`${
						type === "cancel"
							? "shad-danger-btn"
							: "shad-primary-btn"
					} w-full`}
				>
					{buttonLabel}
				</Submitbutton>
			</form>
		</Form>
	);
};

export default AppointmentForm;

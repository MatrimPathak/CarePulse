"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import AppointmentModal from "../AppointmentModal";
import { Appointment } from "@/types/appwrite.types";

export const columns: ColumnDef<Appointment>[] = [
	{
		header: "ID",
		cell: ({ row }) => {
			return <p className="text-14-medium">{row.index + 1}</p>;
		},
	},
	{
		accessorKey: "patient",
		header: "Patient",
		cell: ({ row }) => (
			<p className="flex items-center space-x-2">
				{row.original.patient.name}
			</p>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div className="min-w-[115px]">
				<StatusBadge status={row.original.status} />
			</div>
		),
	},
	{
		accessorKey: "schedule",
		header: "Appointment Date",
		cell: ({ row }) => (
			<p className="text-14-regular min-w-[100px]">
				{formatDateTime(row.original.schedule).dateTime}
			</p>
		),
	},
	{
		accessorKey: "primaryPhysician",
		header: "Doctor",
		cell: ({ row }) => {
			const doctor = Doctors.find(
				(doc) => doc.name === row.original.primaryPhysician
			);
			return (
				<div className="flex items-center gap-3">
					<Image
						src={doctor?.image!}
						alt="name"
						width={100}
						height={100}
						className="size-8"
					/>
					<p className="whitespace-nowrap">Dr. {doctor?.name}</p>
				</div>
			);
		},
	},
	{
		header: () => <div className="pl-4">Actions</div>,
		id: "actions",
		cell: ({ row: { original: data } }) => {
			return (
				<div className="flex gap-1">
					<AppointmentModal
						patientId={data.patient.$id}
						userId={data.userId}
						appointment={data}
						type="schedule"
					/>
					<AppointmentModal
						patientId={data.patient.$id}
						userId={data.userId}
						appointment={data}
						type="cancel"
					/>
				</div>
			);
		},
	},
];

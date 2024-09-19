import { StatusIcon } from "@/constants";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

const StatusBadge = ({ status }: { status: Status }) => {
	return (
		<div
			className={clsx("status-badge", {
				"bg-green-600": status === "Scheduled",
				"bg-blue-600": status === "Pending",
				"bg-red-600": status === "Cancelled",
			})}
		>
			<Image
				src={StatusIcon[status]}
				alt={status}
				width={24}
				height={24}
				className="h-full w-3"
			/>
			<p
				className={clsx("text-12-semibold", {
					"text-green-500": status === "Scheduled",
					"text-blue-500": status === "Pending",
					"text-red-500": status === "Cancelled",
				})}
			>
				{status}
			</p>
		</div>
	);
};

export default StatusBadge;

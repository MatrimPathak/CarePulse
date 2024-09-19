import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import { Patient } from "@/types/appwrite.types";
import Image from "next/image";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
	const patient = await getPatient(userId) as Patient;
	return (
		<div className="flex h-screen max-h-screen">
			<section className="remove-scrollbar container my-auto">
				<div className="sub-container max-w-[860px] flex-1 flex-col py-10">
					<Image
						src="/assets/icons/logo-full.svg"
						alt="patient"
						height={1000}
						width={1000}
						className="mb-12 h-10 w-fit"
					/>
					<AppointmentForm
						type="create"
						userId={userId}
						patientId={patient.$id}
					/>
					<p className="copyright py-12">© 2024 CarePulse</p>
				</div>
			</section>
			<Image
				src="/assets/images/appointment-img.png"
				alt="appointment"
				height={1000}
				width={1000}
				className="side-img max-w-[390px] bg-bottom"
			/>
		</div>
	);
};

export default NewAppointment;

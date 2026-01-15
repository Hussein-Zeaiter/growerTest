/* eslint-disable react-refresh/only-export-components */

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import FormCompetitor from "../../components/rhfExercise/FormCompetitor";
import { EditingProvider } from "../../stores/rhfExercise/EditingProvider";

const websiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

export const competitorSchema = z.object({
	name: z
		.string()
		.min(3, "Minimum of 3 Characters")
		.max(20, "Maximum of 20 Characters"),
	url: z.string().regex(websiteRegex, "Please enter a valid URL"),
	differentiator: z.string().optional(),
});

const schema = z
	.object({
		competitors: z
			.array(competitorSchema)
			.min(1, "Please add at least one competitor")
			.max(3, "Please add at most 3 competitors"),
		industry: z.string().nonempty("Industry is required"),
		otherIndustry: z
			.string()
			.max(10, "Enter At most 10 characters")
			.transform((val) => (val.trim() === "" ? null : val))
			.nullable()
			.optional(),
		region: z.array(z.string()).nonempty("Region is required"),
	})
	.superRefine((data, ctx) => {
		// industry → otherIndustry rule
		if (data.industry === "other" && !data.otherIndustry) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Please enter the industry",
				path: ["otherIndustry"],
			});
		}

		// competitors uniqueness
		const nameMap = new Map<string, number>();

		data.competitors.forEach((competitor, index) => {
			const name = competitor.name.trim().toLowerCase();

			if (nameMap.has(name)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom, //this needs fixing check zod docs
					message: "Competitor name must be unique",
					path: ["competitors", index, "name"],
				});
			} else {
				nameMap.set(name, index);
			}
		});
	})
	.transform((data) => {
		if (data.industry !== "other") {
			const { otherIndustry, ...rest } = data;
			return rest;
		}
		return data;
	});

export type FormInputs = z.infer<typeof schema>;

function FormCompetitorPage() {
	const methods = useForm<FormInputs>({
		mode: "onChange",
		defaultValues: {
			competitors: [],
			industry: "",
			region: [],
		},
		resolver: zodResolver(schema),
	});

	return (
		<EditingProvider>
			<FormProvider {...methods}>
				<FormCompetitor />
			</FormProvider>
		</EditingProvider>
	);
}

export default FormCompetitorPage;

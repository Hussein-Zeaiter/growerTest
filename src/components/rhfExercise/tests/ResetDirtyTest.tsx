import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useForm } from "react-hook-form";

//THIS IS UNRELATED TO THE EXERCISE AND WAS MERE TESTING, KEPT FOR REFERENCE PUPROSES

type FormValues = {
	firstName: string;
	lastName: string;
};

export default function ResetDirtyTest() {
	const [subscribeDirty, setSubscribeDirty] = React.useState(true);

	const { register, reset, getValues, formState, setError, getFieldState } =
		useForm<FormValues>({
			mode: "onChange",
			defaultValues: {
				firstName: "John",
				lastName: "Doe",
			},
		});

	// 🔴 Toggle this to see behavior change
	const dirtyFields = subscribeDirty ? formState.dirtyFields : undefined;

	console.log({ dirtyFields });

	console.log(getFieldState("firstName").invalid);

	return (
		<div style={{ padding: 20, maxWidth: 400 }}>
			<h3>Reset + Dirty Test</h3>

			<label>
				First Name
				<input
					{...register("firstName", {
						maxLength: {
							value: 2,
							message: "Max length is 2",
						},
					})}
				/>
			</label>

			<ErrorMessage errors={formState.errors} name="firstName" />

			<br />

			<button
				type="button"
				onClick={() => {
					setError("firstName", {
						type: "custom",
						message: "custom error",
					});
				}}
			>
				Set custom error
			</button>

			<br />

			<label>
				Last Name
				<input {...register("lastName")} />
			</label>

			<hr />

			<button
				type="button"
				onClick={() => {
					reset(
						{ firstName: "Server", lastName: "Update" },
						{ keepDirty: true },
					);
				}}
			>
				reset({`{ keepDirty: true }`})
			</button>

			<br />

			<button
				type="button"
				onClick={() => {
					reset(
						{ firstName: "Server", lastName: "Update" },
						{ keepDirtyValues: true },
					);
				}}
			>
				reset({`{ keepDirtyValues: true }`})
			</button>

			<hr />

			<button type="button" onClick={() => setSubscribeDirty((v) => !v)}>
				Toggle dirtyFields subscription ({subscribeDirty ? "ON" : "OFF"})
			</button>

			<hr />

			<pre style={{ fontSize: 12 }}>
				values: {JSON.stringify(getValues(), null, 2)}
			</pre>

			<pre style={{ fontSize: 12 }}>
				dirtyFields: {JSON.stringify(formState.dirtyFields, null, 2)}
			</pre>

			<pre style={{ fontSize: 12 }}>isDirty: {String(formState.isDirty)}</pre>
		</div>
	);
}

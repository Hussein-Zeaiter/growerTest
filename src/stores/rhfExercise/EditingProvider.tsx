/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type * as z from "zod";
import type { competitorSchema } from "../../pages/rhfExercise/FormCompetitorPage";

type Competitor = z.infer<typeof competitorSchema>;

interface EditingCompetitor {
	fieldId: string;
	index: number;
	isNewlyAdded: boolean;
	originalValue: Competitor | null;
}

interface EditingContextType {
	isEditing: EditingCompetitor | null;
	setIsEditing: React.Dispatch<React.SetStateAction<EditingCompetitor | null>>;
}

const EditingContext = createContext<EditingContextType | null>(null);

export function EditingProvider({ children }: { children: React.ReactNode }) {
	const [isEditing, setIsEditing] = useState<EditingCompetitor | null>(null);

	return (
		<EditingContext.Provider value={{ isEditing, setIsEditing }}>
			{children}
		</EditingContext.Provider>
	);
}

export const useEditingContext = () => {
	const editingContext = useContext(EditingContext);

	if (!editingContext) {
		throw new Error("Missing provider, only call within a provider.");
	}
	return editingContext;
};

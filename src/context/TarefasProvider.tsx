"use client";

import { createContext, useState, type ReactNode } from "react";
import type { Tarefa, TarefasContextType } from "@/type/tarefa";

export const TarefasContext = createContext<TarefasContextType | null>(null);

const TarefasProvider = ({ children }: { children: ReactNode }) => {
	const [tarefas, setTarefas] = useState<Tarefa[]>([
		{
			id: 1,
			titulo: "Tarefa exemplo",
			descricao: "Descrição exemplo",
			concluido: false,
		},
	]);

	const adicionarTarefa = (novaTarefa: Omit<Tarefa, "id">) => {
		setTarefas((prev) => [
			...prev,
			{
				...novaTarefa,
				id: prev.length > 0 ? Math.max(...prev.map((t) => t.id)) + 1 : 1,
			},
		]);
	};

	const toggleConclusao = (id: number) => {
		setTarefas((prev) =>
			prev.map((tarefa) =>
				tarefa.id === id ? { ...tarefa, concluido: !tarefa.concluido } : tarefa
			)
		);
	};

	return (
		<TarefasContext.Provider
			value={{ tarefas, adicionarTarefa, toggleConclusao }}
		>
			{children}
		</TarefasContext.Provider>
	);
}

export default TarefasProvider;
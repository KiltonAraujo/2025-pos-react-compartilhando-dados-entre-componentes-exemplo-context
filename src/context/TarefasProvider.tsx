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
	const removerTarefa = (id: number) => {
    setTarefas((tarefas) => tarefas.filter((tarefa) => tarefa.id !== id));
	};
	const editarTarefa = (id: number, novosDados: Partial<Omit<Tarefa, "id">>) => {
    setTarefas((tarefas) =>
        tarefas.map((tarefa) =>
            tarefa.id === id ? { ...tarefa, ...novosDados } : tarefa
        )
    );
};

	return (
		<TarefasContext.Provider
			value={{ tarefas, adicionarTarefa, toggleConclusao, removerTarefa, editarTarefa }}
		>
			{children}
		</TarefasContext.Provider>
	);
}

export default TarefasProvider;
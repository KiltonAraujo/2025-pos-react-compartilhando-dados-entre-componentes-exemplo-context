export interface Tarefa {
	id: number;
	titulo: string;
	descricao: string;
	concluido: boolean;
}

export type TarefasContextType = {
	tarefas: Tarefa[];
	adicionarTarefa: (tarefa: Omit<Tarefa, "id">) => void;
	toggleConclusao: (id: number) => void;
};

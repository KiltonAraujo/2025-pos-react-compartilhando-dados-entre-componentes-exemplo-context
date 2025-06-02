export type Tarefa = {
    id: number;
    titulo: string;
    descricao: string;
    concluido: boolean;
};

export type TarefasContextType = {
    tarefas: Tarefa[];
    adicionarTarefa: (tarefa: Omit<Tarefa, "id">) => void;
    toggleConclusao: (id: number) => void;
    removerTarefa: (id: number) => void;
	editarTarefa: (id: number, novosDados: Partial<Omit<Tarefa, "id">>) => void;
};

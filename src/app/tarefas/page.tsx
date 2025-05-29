"use client";

import { useContext } from "react";
import { TarefasContext } from "@/context/TarefasProvider";
import type { Tarefa } from "@/type/tarefa";
import { CheckIcon } from "@heroicons/react/24/solid";

type TarefasListaProps = {
	tarefas: Tarefa[];
	onMudarEstado: (id: number) => void;
};

const TarefasLista = ({ tarefas, onMudarEstado }: TarefasListaProps) => {
	return (
		<ul className="space-y-3">
			{tarefas.map((tarefa) => (
				<TarefasListaItem
					tarefa={tarefa}
					key={tarefa.id}
					onMudarEstado={onMudarEstado}
				/>
			))}
		</ul>
	);
};

type TarefasListaItemProps = {
	tarefa: Tarefa;
	onMudarEstado: (id: number) => void;
};

const TarefasListaItem = ({ tarefa, onMudarEstado }: TarefasListaItemProps) => {
	return (
		<li
			className={`p-4 border rounded-lg cursor-pointer transition ${
				tarefa.concluido
					? "bg-green-50 border-green-200"
					: "bg-white border-gray-200 hover:border-blue-300"
			}`}
			onClick={() => onMudarEstado(tarefa.id)}
		>
			<div className="flex items-start">
				<div
					className={`w-5 h-5 mt-1 mr-3 border rounded-full flex-shrink-0 ${
						tarefa.concluido
							? "bg-green-500 border-green-500"
							: "border-gray-300"
					}`}
				>
					{tarefa.concluido && (<CheckIcon className="w-4 h-4 text-white" />)}
				</div>
				<div>
					<h3
						className={`font-medium ${
							tarefa.concluido ? "text-green-700 line-through" : "text-gray-800"
						}`}
					>
						{tarefa.titulo}
					</h3>
					<p
						className={`text-sm ${
							tarefa.concluido ? "text-green-600" : "text-gray-600"
						}`}
					>
						{tarefa.descricao}
					</p>
				</div>
			</div>
		</li>
	);
};

const PageListaTarefas = () => {
	const { tarefas, toggleConclusao } = useContext(TarefasContext)!;

	return (
		<div className="max-w-2xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">Lista de Tarefas</h1>

			{tarefas.length === 0 ? (
				<p className="text-gray-500">Nenhuma tarefa cadastrada.</p>
			) : (
				<TarefasLista tarefas={tarefas} onMudarEstado={toggleConclusao} />
			)}
		</div>
	);
};

export default PageListaTarefas;

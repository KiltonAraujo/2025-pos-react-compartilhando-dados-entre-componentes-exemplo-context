"use client";

import { useState, type FormEvent, useContext } from "react";
import { useRouter } from "next/navigation";

import { TarefasContext } from "@/context/TarefasProvider";

const PageTarefaNova = () => {
	const [titulo, setTitulo] = useState("");
	const [descricao, setDescricao] = useState("");
	const { adicionarTarefa } = useContext(TarefasContext)!;
	const router = useRouter();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!titulo.trim()) return;

		adicionarTarefa({
			titulo,
			descricao,
			concluido: false,
		});

		router.push("/tarefas");
	};

	return (
		<div className="max-w-2xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">Nova Tarefa</h1>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="titulo"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Título *
					</label>
					<input
						id="titulo"
						type="text"
						value={titulo}
						onChange={(e) => setTitulo(e.target.value)}
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
						required
					/>
				</div>

				<div>
					<label
						htmlFor="descricao"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Descrição
					</label>
					<textarea
						id="descricao"
						value={descricao}
						onChange={(e) => setDescricao(e.target.value)}
						rows={4}
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<div className="flex justify-end space-x-3 pt-2">
					<button
						type="button"
						onClick={() => router.push("/tarefas")}
						className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
					>
						Cancelar
					</button>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Adicionar Tarefa
					</button>
				</div>
			</form>
		</div>
	);
}

export default PageTarefaNova;
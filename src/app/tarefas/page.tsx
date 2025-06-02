"use client";

import { useContext, useState } from "react";
import { TarefasContext } from "@/context/TarefasProvider";
import type { Tarefa } from "@/type/tarefa";
import { CheckIcon } from "@heroicons/react/24/solid";

const TarefasLista = ({ tarefas, onMudarEstado, onRemover, onEditar }: TarefasListaProps) => {
    return (
        <ul className="space-y-3">
            {tarefas.map((tarefa) => (
                <TarefasListaItem
                    tarefa={tarefa}
                    key={tarefa.id}
                    onMudarEstado={onMudarEstado}
                    onRemover={onRemover}
                    onEditar={onEditar}
                />
            ))}
        </ul>
    );
};

type TarefasListaProps = {
    tarefas: Tarefa[];
    onMudarEstado: (id: number) => void;
    onRemover: (id: number) => void;
    onEditar: (id: number, novosDados: Partial<Omit<Tarefa, "id">>) => void;
};

type TarefasListaItemProps = {
    tarefa: Tarefa;
    onMudarEstado: (id: number) => void;
    onRemover: (id: number) => void;
    onEditar: (id: number, novosDados: Partial<Omit<Tarefa, "id">>) => void;
};

const TarefasListaItem = ({ tarefa, onMudarEstado, onRemover, onEditar }: TarefasListaItemProps) => {
    const [editando, setEditando] = useState(false);
    const [titulo, setTitulo] = useState(tarefa.titulo);
    const [descricao, setDescricao] = useState(tarefa.descricao);

    const salvarEdicao = () => {
        onEditar(tarefa.id, { titulo, descricao });
        setEditando(false);
    };

    return (
        <li className={`p-4 border rounded-lg cursor-pointer transition ${
            tarefa.concluido
                ? "bg-green-50 border-green-200"
                : "bg-white border-gray-200 hover:border-blue-300"
        }`}>
            <div className="flex items-start">
                <div
                    className={`w-5 h-5 mt-1 mr-3 border rounded-full flex-shrink-0 ${
                        tarefa.concluido
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300"
                    }`}
                    onClick={() => onMudarEstado(tarefa.id)}
                >
                    {tarefa.concluido && (<CheckIcon className="w-4 h-4 text-white" />)}
                </div>
                <div className="flex-1">
                    {editando ? (
                        <>
                            <input
                                className="border px-2 py-1 rounded w-full mb-1"
                                value={titulo}
                                onChange={e => setTitulo(e.target.value)}
                            />
                            <input
                                className="border px-2 py-1 rounded w-full mb-1"
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                            />
                            <button className="mr-2 text-green-600" onClick={salvarEdicao}>Salvar</button>
                            <button className="text-gray-500" onClick={() => setEditando(false)}>Cancelar</button>
                        </>
                    ) : (
                        <>
                            <h3 className={`font-medium ${
                                tarefa.concluido ? "text-green-700 line-through" : "text-gray-800"
                            }`}>
                                {tarefa.titulo}
                            </h3>
                            <p className={`text-sm ${
                                tarefa.concluido ? "text-green-600" : "text-gray-600"
                            }`}>
                                {tarefa.descricao}
                            </p>
                        </>
                    )}
                </div>
                {!editando && (
                    <>
                        <button
                            className="ml-2 text-blue-500 hover:text-blue-700"
                            onClick={() => setEditando(true)}
                            title="Editar tarefa"
                        >
                            Editar
                        </button>
                        <button
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => onRemover(tarefa.id)}
                            title="Excluir tarefa"
                        >
                            Excluir
                        </button>
                    </>
                )}
            </div>
        </li>
    );
};

const PageListaTarefas = () => {
    const { tarefas, toggleConclusao, removerTarefa, editarTarefa } = useContext(TarefasContext)!;
    const tarefasAbertas = tarefas.filter((tarefa) => !tarefa.concluido);

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Lista de Tarefas</h1>

            {tarefas.length === 0 ? (
                <p className="text-gray-500">Nenhuma tarefa cadastrada.</p>
            ) : (
                <TarefasLista 
                    tarefas={tarefasAbertas} 
                    onMudarEstado={toggleConclusao} 
                    onRemover={removerTarefa}
                    onEditar={editarTarefa}
                />
            )}
        </div>
    );
};

export default PageListaTarefas;

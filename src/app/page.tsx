import Link from "next/link";

const PageHome = () => {
	return (
		<div className="max-w-2xl mx-auto text-center py-12">
			<h1 className="text-3xl font-bold mb-6">
				Bem-vindo ao Gerenciador de Tarefas
			</h1>
			<p className="text-lg mb-8">
				Organize suas tarefas diárias de forma simples e eficiente.
			</p>
			<div className="space-x-4">
				<Link
					href="/tarefas"
					className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
				>
					Ver Tarefas
				</Link>
				<Link
					href="/tarefas/nova"
					className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition"
				>
					Criar Tarefa
				</Link>
			</div>
		</div>
	);
};

export default PageHome;

# Tutorial Atualizado para Next.js 14 (App Router)

Vou recriar o tutorial usando a estrutura moderna do Next.js com o App Router. Aqui está a versão atualizada:

## Estrutura do Projeto

```
/src
  /app
    /(components)
      Navbar.tsx
    /(context)
      TarefasProvider.tsx
    /(types)
      tarefa.ts
    /tarefas
      /nova
        page.tsx
      page.tsx
    /page.tsx
  /styles
    globals.css
```

## Passo 1: Configurar Tipos TypeScript

`/src/app/(types)/tarefa.ts`:
```typescript
export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  concluido: boolean;
}

export type TarefasContextType = {
  tarefas: Tarefa[];
  adicionarTarefa: (tarefa: Omit<Tarefa, 'id'>) => void;
  toggleConclusao: (id: number) => void;
};
```

## Passo 2: Criar o Context Provider

`/src/app/(context)/TarefasProvider.tsx`:
```tsx
'use client';

import { createContext, useState, ReactNode } from 'react';
import { Tarefa, TarefasContextType } from '../(types)/tarefa';

export const TarefasContext = createContext<TarefasContextType | null>(null);

export default function TarefasProvider({ children }: { children: ReactNode }) {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { id: 1, titulo: 'Tarefa exemplo', descricao: 'Descrição exemplo', concluido: false }
  ]);

  const adicionarTarefa = (novaTarefa: Omit<Tarefa, 'id'>) => {
    setTarefas(prev => [...prev, {
      ...novaTarefa,
      id: prev.length > 0 ? Math.max(...prev.map(t => t.id)) + 1 : 1
    }]);
  };

  const toggleConclusao = (id: number) => {
    setTarefas(prev => prev.map(tarefa =>
      tarefa.id === id ? { ...tarefa, concluido: !tarefa.concluido } : tarefa
    ));
  };

  return (
    <TarefasContext.Provider value={{ tarefas, adicionarTarefa, toggleConclusao }}>
      {children}
    </TarefasContext.Provider>
  );
}
```

## Passo 3: Configurar o Layout Raiz

`/src/app/layout.tsx`:
```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TarefasProvider from './(context)/TarefasProvider';
import Navbar from './(components)/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gerenciador de Tarefas',
  description: 'Aplicativo para gerenciar tarefas diárias',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <TarefasProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto p-4">
              {children}
            </main>
          </div>
        </TarefasProvider>
      </body>
    </html>
  );
}
```

## Passo 4: Criar o Componente Navbar

`/src/app/(components)/Navbar.tsx`:
```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Tarefas App</Link>
        <div className="space-x-4">
          <Link 
            href="/tarefas" 
            className={`hover:underline ${pathname === '/tarefas' ? 'font-bold' : ''}`}
          >
            Lista
          </Link>
          <Link 
            href="/tarefas/nova" 
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition"
          >
            Nova Tarefa
          </Link>
        </div>
      </div>
    </nav>
  );
}
```

## Passo 5: Criar as Páginas

### Página Home (`/src/app/page.tsx`):
```tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <h1 className="text-3xl font-bold mb-6">Bem-vindo ao Gerenciador de Tarefas</h1>
      <p className="text-lg mb-8">Organize suas tarefas diárias de forma simples e eficiente.</p>
      <div className="space-x-4">
        <Link href="/tarefas" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Ver Tarefas
        </Link>
        <Link href="/tarefas/nova" className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition">
          Criar Tarefa
        </Link>
      </div>
    </div>
  );
}
```

### Lista de Tarefas (`/src/app/tarefas/page.tsx`):
```tsx
'use client';

import { useContext } from 'react';
import { TarefasContext } from '../(context)/TarefasProvider';

export default function ListaTarefas() {
  const { tarefas, toggleConclusao } = useContext(TarefasContext)!;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Lista de Tarefas</h1>
      
      {tarefas.length === 0 ? (
        <p className="text-gray-500">Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul className="space-y-3">
          {tarefas.map(tarefa => (
            <li 
              key={tarefa.id} 
              className={`p-4 border rounded-lg cursor-pointer transition ${tarefa.concluido ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-blue-300'}`}
              onClick={() => toggleConclusao(tarefa.id)}
            >
              <div className="flex items-start">
                <div className={`w-5 h-5 mt-1 mr-3 border rounded-full flex-shrink-0 ${tarefa.concluido ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                  {tarefa.concluido && (
                    <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className={`font-medium ${tarefa.concluido ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                    {tarefa.titulo}
                  </h3>
                  <p className={`text-sm ${tarefa.concluido ? 'text-green-600' : 'text-gray-600'}`}>
                    {tarefa.descricao}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Nova Tarefa (`/src/app/tarefas/nova/page.tsx`):
```tsx
'use client';

import { useState, FormEvent, useContext } from 'react';
import { TarefasContext } from '../../(context)/TarefasProvider';
import { useRouter } from 'next/navigation';

export default function NovaTarefa() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const { adicionarTarefa } = useContext(TarefasContext)!;
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    adicionarTarefa({
      titulo,
      descricao,
      concluido: false
    });

    router.push('/tarefas');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nova Tarefa</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
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
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
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
            onClick={() => router.push('/tarefas')}
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
```

## Principais Diferenças da Versão Atualizada

1. **Estrutura de Pastas**:
   - Uso do App Router (`app/` em vez de `pages/`)
   - Roteamento baseado em pastas (`tarefas/nova` → `/tarefas/nova`)

2. **Componentes do Next.js**:
   - `useRouter` substituído por `useNavigation` do `next/navigation`
   - Layouts compartilhados via `layout.tsx`

3. **Organização**:
   - Componentes reutilizáveis em `(components)`
   - Contexto em `(context)`
   - Tipos em `(types)`

4. **Server Components**:
   - Página home pode ser Server Component
   - Páginas interativas marcadas com 'use client'

5. **Melhorias de Performance**:
   - Roteamento mais eficiente
   - Loadings e erros podem ser tratados por arquivo

## Como Executar

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor:
```bash
npm run dev
```

3. Acesse:
```
http://localhost:3000
```

Esta versão utiliza todas as funcionalidades modernas do Next.js 14, incluindo o App Router, Server Components (quando possível) e a nova API de navegação.
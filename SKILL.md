# 🧠 Vida em M — AI Developer Skill

Esta documentação serve como instrução primária (Skill / Regras) para IAs e Agentes Inteligentes contribuindo para a base de código do App **Vida em M**. Todo código, componente React ou função gerada deve obedecer estritamente às diretrizes abaixo:

## 1. Missão e Filtro Cristocêntrico
Somos uma plataforma de aprendizado conectada ao Evangelho da Graça de Jesus. 
*   **Qualquer conteúdo gerado (textos falsos de interface, mockups, placeholders)** deve refletir ensinamentos bíblicos em vez de "Lorem Ipsum" vazio. (Ex: "Fé e Graça", "Redenção", "Romanos 3:24").
*   Não usar jargões motivacionais genéricos; focar em confiança na obra consumada de Cristo.

## 2. Tecnologias Principais (Tech Stack)
*   **Framework:** React 19 + TypeScript.
*   **Scaffold:** Vite.
*   **Estilização:** Tailwind CSS v4.
*   **Gerenciamento de Estado:** Zustand (para estado global da UI e algorítimos do SM-2) / React Context + hooks (para UI simples).
*   **Algoritmo Principal:** SM-2 Modificado para Repetição Espaçada (SuperMemo-2).

## 3. Identidade Visual e UI Tokens
Nomes de classes globais mapeadas no `index.css`:
*   A plataforma é nativamente **Dark Mode**. Nunca gere telas inteiras com fundos brancos.
*   `bg-brand-dark`: Fundo principal negro infinito (`#08080e`).
*   Variáveis de "glow" nos botões: `from-brand-purple` to `brand-pink` na criação de gradientes puros.
*   **Glassmorphism:** Use a classe unificada `.glass-panel` para os blocos principais com bordas sutis.
*   Usar Fontes Globais configuradas: `Syne` (títulos imponentes, classes text-5xl etc) e `DM Sans` (corpo e texto). 

## 4. Padrões de Código e Algoritmo (Flashcards)
*   Sempre separe a lógica de estudo (SM-2) do componente visual que "vira" o cartão.
*   **Interface SM-2 em TypeScript:**
```typescript
interface Flashcard {
  id: string;
  front: string;
  back: string;
  interval: number; // Intervalo em dias
  easeFactor: number; // Fator de facilidade (default: 2.5)
  repetitions: number; // Série (streaks) de respostas corretas
  nextReviewDate: Date;
}
```

## 5. Gamificação Básica
Se for criar novos componentes visuais para Gamificação:
- XP é dividido em Marcos de Perfil (Discípulo -> Estudante -> Obreiro -> Mestre).
- Use barras de progresso horizontais elegantes (height 3 com bg-gradiente e borda arredondada).

>> *Lembrete para IAs:* A prioridade número um é entregar uma UI absurdamente bela (cinematic feel) e um código Typescript 100% tipado.

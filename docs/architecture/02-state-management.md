# Análise de Arquitetura: State Management Patterns

Este documento analisa as estratégias de gerenciamento de estado no projeto Bytebank e propõe melhorias para otimizar a reatividade e a manutenibilidade da aplicação.

## Visão Geral

O projeto atualmente utiliza uma combinação de estado local do React (`useState`) e Context API (`NextAuthContext`, `ToastContext`) para gerenciar o estado. Essa abordagem é eficaz para cenários simples, mas pode ser otimizada, especialmente ao diferenciar o estado do servidor do estado do cliente.

---

### Pontos Fortes (O que já está bom)

1.  **Estado do Servidor Gerenciado pelo Next.js:** O uso de Server Components para buscar dados e passá-los como props para os componentes é a melhor abordagem possível para o "estado do servidor". Isso reduz a complexidade no cliente, melhora o desempenho (data fetching no servidor) e diminui a necessidade de bibliotecas de state management para dados que vêm da API.

2.  **Context API para Estado Global:** O uso da Context API para o estado de autenticação (`NextAuthContext`) e para funcionalidades de UI globais (`ToastContext`) é adequado. São estados que realmente precisam ser acessíveis em toda a árvore de componentes.

3.  **Estado Local Encapsulado:** A preferência pelo `useState` para controlar o estado de componentes individuais (como a abertura de um modal ou o valor de um input) é uma excelente prática, pois mantém o estado o mais próximo possível de onde ele é usado.

---

### Pontos de Melhoria (Oportunidades de Refatoração)

1.  **Diferenciar Claramente Estado de Cliente vs. Servidor:**
    *   **Problema:** Pode haver uma tentação de usar `useEffect` para buscar dados no cliente e armazená-los em um estado, o que é um anti-padrão no Next.js App Router.
    *   **Sugestão:** Reforçar a prática: **dados que vêm da API são "estado do servidor"**. Eles devem ser buscados em Server Components, Server Actions ou Route Handlers. O estado do cliente (`useState`, `useReducer`) deve ser reservado para informações que existem apenas no navegador (ex: UI state, formulários não enviados).

2.  **Adotar um Padrão Avançado para Estado de Cliente Complexo:**
    *   **Problema:** Para estados de cliente que precisam ser compartilhados por múltiplos componentes não relacionados (sem ser global como a autenticação), a Context API pode levar a re-renderizações desnecessárias e ao "provider hell".
    *   **Sugestão:** Introduzir uma biblioteca de estado minimalista como o **Zustand**.
        *   **Por quê?** Zustand é leve, não requer "providers" e permite criar "stores" reativas que podem ser acessadas por qualquer componente através de um hook. Os componentes só re-renderizam quando a parte do estado que eles consomem é alterada.
        *   **Caso de Uso:** Um formulário de múltiplos passos, onde o estado do formulário precisa ser compartilhado entre os passos, mas não faz sentido ser um estado global. Outro caso é o gerenciamento de filtros complexos em uma tabela.

3.  **Utilizar Server Actions para Mutações:**
    *   **Problema:** A lógica de mutação de dados (criar, atualizar, deletar) pode estar sendo feita através de chamadas de API manuais no cliente, exigindo gerenciamento manual de estado de loading, erro e atualização da UI.
    *   **Sugestão:** Adotar **Server Actions** para todas as mutações de dados.
        *   **Benefícios:** Elas rodam no servidor, são seguras e podem ser chamadas diretamente de componentes de cliente. Com `revalidatePath` ou `revalidateTag`, elas podem invalidar o cache do Next.js, que automaticamente busca os novos dados e re-renderiza os Server Components, atualizando a UI de forma reativa e com muito menos código no cliente. Isso simplifica drasticamente o gerenciamento de estado após uma mutação.

### Plano de Ação Sugerido

1.  **Revisar `useEffect`:** Auditar o uso de `useEffect` com data fetching e refatorá-lo para que os dados sejam buscados em Server Components.
2.  **Introduzir Zustand (se necessário):** Avaliar se existe algum estado de cliente complexo e compartilhado que justificaria a adição do Zustand. Se sim, criar uma store para gerenciar esse estado específico.
3.  **Implementar Server Actions:** Refatorar os formulários (`LoginForm`, `RegisterForm`, `TransactionForm`) para usar Server Actions em vez de handlers que chamam a API via `fetch`. Utilizar o hook `useFormState` para gerenciar o estado do formulário de maneira reativa.

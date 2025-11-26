# Análise de Arquitetura: State Management Patterns

Este documento analisa as estratégias de gerenciamento de estado no projeto Bytebank e propõe melhorias para otimizar a reatividade e a manutenibilidade da aplicação.

## Visão Geral

O projeto atualmente utiliza uma combinação inteligente de estado local do React (`useState`) e Context API para gerenciar o estado do cliente. A maior oportunidade de melhoria está em reforçar a distinção entre o estado que pertence ao servidor e o que pertence ao cliente.

---

### Pontos Fortes (O que já está bom)

1.  **Gerenciamento de Estado do Servidor via Next.js:** O uso de Server Components para buscar dados e passá-los como props é a melhor abordagem possível para o "estado do servidor". Isso reduz a complexidade no cliente, melhora o desempenho e diminui a necessidade de bibliotecas de state management para dados que vêm da API.

2.  **Context API para Estado Global do Cliente:** O uso da Context API para o estado de autenticação (`NextAuthContext`) e para funcionalidades de UI globais (`ToastContext`) é adequado. São estados que realmente precisam ser acessíveis em toda a árvore de componentes.

3.  **Estado Local Encapsulado:** A preferência pelo `useState` para controlar o estado de componentes individuais (como a abertura de um modal ou o valor de um input) é uma excelente prática, pois mantém o estado o mais próximo possível de onde ele é usado.

---

### Pontos de Melhoria (Oportunidades de Refatoração)

1.  **Priorizar o Gerenciamento de Estado no Servidor:**
    *   **Problema:** O uso de `useEffect` para buscar dados no cliente trata o estado do servidor como se fosse do cliente, o que é um anti-padrão no Next.js App Router.
    *   **Sugestão:** Reforçar a prática de que dados da API são "estado do servidor". Eles devem ser buscados em Server Components e passados via props. O estado do cliente (`useState`) deve ser reservado para interações de UI.

2.  **Adotar um Padrão Avançado para Estado de Cliente Complexo:**
    *   **Problema:** Para estados de cliente que precisam ser compartilhados por múltiplos componentes não relacionados, a Context API pode causar re-renderizações desnecessárias.
    *   **Sugestão:** Introduzir uma biblioteca de estado minimalista como o **Zustand**. Ela permite que componentes se inscrevam apenas nas partes do estado que lhes interessam, sendo mais performática e simples para casos de uso como o gerenciamento de filtros complexos em uma tabela.

3.  **Utilizar Server Actions para Mutações (Programação Reativa):**
    *   **Problema:** Mutações de dados feitas no cliente exigem gerenciamento manual de estados de `loading` e `error`.
    *   **Sugestão:** Adotar **Server Actions**. Elas simplificam o gerenciamento de estado, pois o hook `useFormStatus` pode ser usado para feedback reativo (`pending`). Após a execução, a Server Action pode usar `revalidatePath` para instruir o Next.js a buscar novamente os dados do servidor, atualizando a UI automaticamente.

### Plano de Ação Sugerido

1.  **Revisar `useEffect`:** Auditar o uso de `useEffect` com data fetching e refatorá-lo para Server Components.
2.  **Introduzir Zustand (se necessário):** Avaliar se existe estado de cliente complexo que justifique a adição do Zustand.
3.  **Implementar Server Actions:** Refatorar os formulários para usar Server Actions e `useFormState`/`useFormStatus` para um gerenciamento de estado reativo e simplificado.

# Análise de Arquitetura: Segurança

Este documento foca nas práticas de segurança implementadas no projeto Bytebank, avaliando a robustez da autenticação, validação de dados e proteção contra vulnerabilidades comuns.

## Visão Geral

O projeto já incorpora ferramentas modernas e essenciais para a segurança de uma aplicação web, como `next-auth` para autenticação e `zod` para validação de schemas. A base de segurança é forte, e as melhorias se concentram em garantir a aplicação consistente dessas ferramentas em todos os pontos de entrada da aplicação.

---

### Pontos Fortes (O que já está bom)

1.  **Autenticação Robusta com NextAuth.js:**
    *   A utilização do `next-auth` é um dos maiores pontos fortes de segurança do projeto. Ele abstrai a complexidade do gerenciamento de sessões, tokens (JWT), e provedores de autenticação (Credentials, OAuth).
    *   A proteção de rotas via middleware (`middleware.ts`) é a forma correta de garantir que apenas usuários autenticados acessem áreas restritas da aplicação.

2.  **Validação de Dados com Zod:**
    *   O uso de `zod` nos diretórios `schemas` para definir a estrutura esperada dos dados de entrada (formulários, API) é uma prática de segurança fundamental. Isso protege a aplicação contra dados malformados ou maliciosos antes que eles cheguem à lógica de negócio ou ao banco de dados.

3.  **Proteção contra CSRF (Cross-Site Request Forgery):**
    *   O `next-auth` fornece proteção CSRF por padrão para as rotas de autenticação e para o uso de Server Actions quando configurado corretamente.

4.  **Variáveis de Ambiente:**
    *   O Next.js, por padrão, só expõe ao cliente as variáveis de ambiente prefixadas com `NEXT_PUBLIC_`. Isso ajuda a prevenir o vazamento de chaves de API e outras credenciais secretas.

---

### Pontos de Melhoria (Oportunidades de Refatoração)

1.  **Validação de Sessão em Server Actions e API Routes:**
    *   **Problema:** É possível que uma Server Action ou uma API Route seja criada sem verificar explicitamente se o usuário que a invoca tem uma sessão ativa e as permissões necessárias.
    *   **Sugestão:** Padronizar que **toda Server Action e API Route** que lida com dados sensíveis ou realiza uma ação em nome de um usuário deve, como primeira etapa, obter a sessão do usuário (usando a função `auth()` do `next-auth`). Se a sessão não existir ou for inválida, a operação deve ser interrompida imediatamente.

2.  **Validação de Input em Todas as Entradas:**
    *   **Problema:** Assim como a validação de sessão, a validação de input com Zod pode ser esquecida em algum endpoint.
    *   **Sugestão:** Criar um padrão (talvez uma função de ordem superior ou um wrapper) para as Server Actions que combine a validação da sessão e a validação do input (payload) com Zod. Isso garante que nenhuma ação seja executada sem que a sessão e os dados de entrada sejam verificados.

3.  **Segurança de Dados Sensíveis (Criptografia):**
    *   **Problema:** O requisito do Tech Challenge menciona "criptografia de dados sensíveis". Atualmente, os dados podem estar sendo salvos no banco de dados em texto plano (ex: CPF, endereço).
    *   **Sugestão:**
        *   **Criptografia em Repouso (At Rest):** A senha do usuário já é hasheada pelo `next-auth` (via provider de Credentials), o que é ótimo. Para outros dados sensíveis, a criptografia deve ser aplicada na camada de serviço (`services`) antes de salvar no banco de dados. Pode-se usar a biblioteca `crypto` nativa do Node.js para isso.
        *   **Atenção:** É crucial gerenciar corretamente as chaves de criptografia e descriptografia, armazenando-as de forma segura (em variáveis de ambiente) e nunca expondo-as no cliente. A descriptografia só deve ocorrer no servidor quando o dado precisar ser exibido para o usuário autorizado.

### Plano de Ação Sugerido

1.  **Auditar Endpoints:** Revisar todas as Server Actions e API Routes (`src/app/api`) para garantir que a validação de sessão e de input com Zod esteja presente em todas elas.
2.  **Criar Wrappers de Segurança:** Desenvolver uma função `safeAction` que receba um schema Zod e uma função de ação. Essa função wrapper cuidaria internamente da validação da sessão e do input antes de executar a lógica principal, reduzindo código repetido e o risco de erro humano.
3.  **Implementar Criptografia de Dados:**
    *   Identificar quais campos nos `models` (`User.ts`, `Transaction.ts`) são considerados sensíveis.
    *   Atualizar os `services` (`user.service.ts`, `transaction.service.ts`) para criptografar esses campos antes de salvar (`create`, `update`) e descriptografá-los ao ler, garantindo que a lógica de descriptografia só seja acessível a usuários autorizados.

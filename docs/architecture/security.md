# Análise de Arquitetura: Segurança

Este documento foca nas práticas de segurança implementadas no projeto Bytebank, avaliando a robustez da aplicação e identificando pontos de melhoria.

## Visão Geral

O projeto já incorpora ferramentas modernas e essenciais para a segurança de uma aplicação web, como `next-auth` para autenticação e `zod` para validação de schemas. A base de segurança é forte, e as melhorias se concentram em garantir a aplicação consistente dessas ferramentas em todos os pontos de entrada da aplicação, seguindo uma estratégia de "defesa em profundidade".

---

### Pontos Fortes (O que já está bom)

1.  **Autenticação Robusta com NextAuth.js:** A utilização do `next-auth` é um dos maiores pontos fortes de segurança do projeto. Ele abstrai a complexidade do gerenciamento de sessões e tokens. A proteção de rotas via `middleware.ts` é uma excelente primeira camada de defesa.

2.  **Validação de Dados com Zod:** O uso de `zod` para definir schemas de dados de entrada é uma prática de segurança fundamental. Isso garante a integridade dos dados e protege a aplicação contra payloads maliciosos antes que eles cheguem à lógica de negócio.

3.  **Proteção contra CSRF (Cross-Site Request Forgery):** O `next-auth` fornece proteção CSRF por padrão para as rotas de autenticação e para o uso de Server Actions, prevenindo que um usuário autenticado execute ações indesejadas sem saber.

4.  **Gerenciamento de Variáveis de Ambiente:** O Next.js, por padrão, só expõe ao cliente as variáveis de ambiente prefixadas com `NEXT_PUBLIC_`, ajudando a prevenir o vazamento de chaves de API e outras credenciais secretas.

---

### Pontos de Melhoria (Oportunidades de Refatoração)

1.  **Validação de Sessão em Todas as Server Actions e API Routes:**
    *   **Problema:** É possível que um endpoint seja criado sem verificar explicitamente se o usuário que o invoca tem uma sessão ativa.
    *   **Sugestão:** Padronizar que **toda Server Action e API Route** que lida com dados ou ações de um usuário deve, como primeira etapa, obter e validar a sessão no servidor (usando a função `auth()` do `next-auth`). Se a sessão for inválida, a operação deve ser interrompida.

2.  **Validação de Input em Todas as Entradas:**
    *   **Problema:** Assim como a validação de sessão, a validação do payload com Zod pode ser esquecida em algum endpoint.
    *   **Sugestão:** Criar um padrão (como uma função de ordem superior ou um wrapper `safeAction`) que combine a validação da sessão e a validação do input (payload) com Zod. Isso garante que nenhuma ação seja executada sem que as camadas de segurança sejam aplicadas.

3.  **Criptografia de Dados Sensíveis em Repouso:**
    *   **Problema:** Dados sensíveis (ex: CPF, endereço) podem estar sendo salvos em texto plano no banco de dados.
    *   **Sugestão:** Aplicar criptografia na camada de serviço antes de salvar os dados. A senha do usuário já é hasheada pelo `next-auth`, e a mesma prática deve ser considerada para outros dados sensíveis, usando a biblioteca `crypto` nativa do Node.js. A chave de criptografia deve ser mantida segura em variáveis de ambiente.

### Plano de Ação Sugerido

1.  **Auditar Endpoints:** Revisar todas as Server Actions e API Routes (`src/app/api`) para garantir que a validação de sessão e de input com Zod esteja presente em todas elas.
2.  **Criar Wrappers de Segurança:** Desenvolver uma função `safeAction` para padronizar a aplicação das camadas de segurança nos endpoints, reduzindo código repetido.
3.  **Implementar Criptografia de Dados:** Identificar campos sensíveis nos `models` e atualizar os `services` para criptografar esses campos antes de salvar e descriptografá-los ao ler.

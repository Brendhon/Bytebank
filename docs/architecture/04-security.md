# Análise de Arquitetura: Segurança

Este documento foca nas práticas de segurança implementadas no projeto Bytebank, detalha os conceitos de segurança web e avalia a robustez da aplicação contra vulnerabilidades comuns.

## Conceitos Fundamentais

### O Objetivo da Segurança Web
O principal objetivo da segurança em aplicações web é proteger os dados e os usuários contra acessos não autorizados e atividades maliciosas. Isso é geralmente resumido pela **Tríade CIA**:

*   **Confidencialidade (Confidentiality):** Garantir que a informação só seja acessível por pessoas autorizadas. (Ex: Criptografia).
*   **Integridade (Integrity):** Garantir que a informação seja precisa e confiável, não podendo ser modificada sem autorização. (Ex: Hashes, validação de dados).
*   **Disponibilidade (Availability):** Garantir que o sistema e os dados estejam disponíveis para usuários autorizados quando eles precisarem.

### O que é Defesa em Profundidade?
**Defesa em Profundidade** é uma estratégia de segurança que consiste em aplicar **múltiplas camadas de controles de segurança**. A ideia é que, se uma camada falhar, outra camada subsequente possa impedir ou detectar o ataque. Em vez de confiar em uma única medida de segurança, você cria uma barreira robusta e redundante.

*   **Exemplo no Bytebank:** Um usuário tenta enviar um formulário. As camadas de defesa são:
    1.  **Middleware:** Verifica se o usuário está autenticado.
    2.  **Proteção CSRF:** Valida o token da requisição.
    3.  **Validação de Sessão:** A Server Action verifica novamente a sessão no servidor.
    4.  **Validação de Input (Zod):** Verifica se os dados enviados são válidos.
    5.  **ORM/Banco de Dados:** Previne SQL Injection.

### O que é CSRF (Cross-Site Request Forgery)?
**CSRF** é um tipo de ataque onde um ator malicioso engana um usuário autenticado a executar uma ação indesejada na aplicação. Por exemplo, um usuário clica em um link em um e-mail malicioso que, sem que ele saiba, envia uma requisição para o site do banco para transferir dinheiro.

*   **Como `next-auth` protege:** Ele gera um token secreto e único para a sessão do usuário. Toda requisição que modifica o estado (como em uma Server Action) deve incluir esse token. Como o site malicioso não tem acesso a esse token, a requisição falha.

---

## Análise do Projeto Bytebank

### Visão Geral

O projeto já aplica o princípio de **Defesa em Profundidade** ao incorporar ferramentas modernas como `next-auth` e `zod`. A base de segurança é forte.

### Pontos Fortes (O que já está bom)

1.  **Autenticação Robusta com NextAuth.js:** Garante a **Confidencialidade** ao controlar quem acessa os dados. A proteção de rotas via middleware é a primeira camada de defesa.

2.  **Validação de Dados com Zod:** Garante a **Integridade** dos dados, protegendo a aplicação contra entradas malformadas antes que cheguem à lógica de negócio.

3.  **Proteção contra CSRF:** O `next-auth` fornece proteção CSRF por padrão, prevenindo o ataque descrito acima.

4.  **Variáveis de Ambiente Seguras:** O Next.js previne o vazamento de segredos, reforçando a **Confidencialidade**.

---

### Pontos de Melhoria (Oportunidades de Refatoração)

1.  **Garantir a Validação de Sessão em Todos os Endpoints:**
    *   **Problema:** Uma Server Action pode ser criada sem verificar a sessão do usuário, quebrando uma camada da "defesa em profundidade".
    *   **Sugestão:** Padronizar que **toda Server Action e API Route** que modifica dados deve, como primeira etapa, validar a sessão do usuário no servidor com `auth()`. A ausência de uma sessão válida deve interromper a operação.

2.  **Aplicar Validação de Input Rigorosamente:**
    *   **Problema:** Assim como a validação de sessão, a validação de input com Zod pode ser esquecida.
    *   **Sugestão:** Criar um padrão (como uma função wrapper `safeAction`) que combine a validação da sessão e a validação do input (payload) com Zod. Isso torna a aplicação das camadas de segurança mais consistente e menos propensa a erro humano.

3.  **Criptografia de Dados Sensíveis (Confidencialidade em Repouso):**
    *   **Problema:** Dados sensíveis (ex: CPF) podem estar sendo salvos em texto plano no banco de dados. Se o banco de dados for comprometido, os dados estarão expostos.
    *   **Sugestão:**
        *   **Criptografia em Repouso (At Rest):** A senha já é hasheada (uma forma de criptografia one-way). Para outros dados, aplicar criptografia simétrica (usando a biblioteca `crypto` do Node.js) na camada de serviço antes de salvar no banco.
        *   **Atenção:** A chave de criptografia deve ser armazenada de forma segura (variável de ambiente) e nunca exposta no cliente.

### Plano de Ação Sugerido

1.  **Auditar Endpoints:** Revisar todas as Server Actions e API Routes para garantir a presença das validações de sessão e input.
2.  **Criar Wrappers de Segurança:** Desenvolver uma função `safeAction` para padronizar a aplicação das camadas de segurança.
3.  **Implementar Criptografia de Dados:** Identificar campos sensíveis nos models e aplicar criptografia na camada de serviço antes de persistir os dados.

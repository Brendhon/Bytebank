# Análise de Arquitetura: Modularidade e Clean Architecture

Este documento analisa a estrutura atual do projeto Bytebank em relação aos princípios de arquitetura modular e Clean Architecture, conforme os requisitos do Tech Challenge.

## Visão Geral

O projeto já adota uma estrutura de diretórios que favorece a modularidade e a separação de responsabilidades, servindo como uma excelente base para a implementação de uma arquitetura mais robusta.

---

### Pontos Fortes (O que já está bom)

1.  **Separação por Funcionalidade:** A organização de arquivos em `components`, `services`, `lib`, `hooks`, `schemas` e `app` demonstra uma clara intenção de separar o código por seu propósito técnico.
    *   `app/`: Camada de Apresentação e Roteamento (padrão do Next.js).
    *   `components/`: Camada de Apresentação (UI).
    *   `services/`: Início de uma Camada de Aplicação/Domínio, responsável pela lógica de negócio e orquestração de chamadas de dados.
    *   `lib/`: Camada de Infraestrutura, contendo configurações de bibliotecas externas como Mongoose e NextAuth.
    *   `schemas/`: Definições de validação (Zod), atuando como uma barreira de proteção para a entrada de dados.
    *   `types/` e `models/`: Definições claras dos modelos de dados do domínio.

2.  **Componentes Reutilizáveis:** A pasta `components/ui` indica a criação de componentes de UI genéricos e reutilizáveis, o que é uma prática fundamental para a manutenibilidade.

3.  **Uso de Server Components:** A estrutura do `app` router incentiva o uso de Server Components por padrão, o que naturalmente move o processamento de dados para o servidor, alinhando-se ao princípio de separar a UI da lógica de dados.

---

### Pontos de Melhoria (Oportunidades de Refatoração)

1.  **Formalizar a Camada de Domínio:**
    *   **Problema:** Atualmente, a lógica de negócio pode estar distribuída entre os `services` e, potencialmente, dentro de componentes ou Server Actions. A camada de domínio não é explícita.
    *   **Sugestão:** Criar um diretório `@/domain` ou `@/core` para abrigar a lógica de negócio pura, que não depende de frameworks (React, Next.js). Por exemplo, regras de validação de uma transação que vão além da estrutura dos dados (schema) poderiam residir aqui. Os `services` atuariam como a Camada de Aplicação, orquestrando o fluxo: recebem uma chamada da UI, usam o `domain` para executar a lógica e interagem com a `lib` (infra) para buscar ou salvar dados.

2.  **Reforçar os Limites entre Camadas:**
    *   **Problema:** Não há uma regra que impeça um componente da Camada de Apresentação (`components`) de importar diretamente um módulo da Camada de Infraestrutura (`lib`), como o `mongoose`.
    *   **Sugestão:** Implementar regras de linting (ESLint) para proibir importações diretas entre camadas. Por exemplo, a `presentation` (components, app) só pode importar de `hooks` e `services`. A `services` pode importar de `domain` e `lib`. A `domain` não pode importar de nenhuma outra camada. Isso garante o desacoplamento.

3.  **Centralizar o Acesso a Dados:**
    *   **Problema:** Embora exista uma camada de `services`, componentes (especialmente Server Components) podem estar realizando chamadas de dados diretamente.
    *   **Sugestão:** Padronizar que toda e qualquer operação de dados (leitura ou escrita) deve, obrigatoriamente, passar pela camada de `services`. Isso centraliza a lógica, facilita o cache, o tratamento de erros e a manutenção. Os Server Components na pasta `app` devem chamar os `services` para buscar os dados que precisam.

### Plano de Ação Sugerido

1.  **Mover Lógica de Negócio:** Identificar regras de negócio dentro de componentes e serviços e movê-las para uma nova camada de `domain`.
2.  **Configurar Regras de Linting:** Adicionar `eslint-plugin-import` com regras `no-restricted-imports` para policiar os limites da arquitetura.
3.  **Refatorar Acesso a Dados:** Revisar as páginas (`app/**/page.tsx`) e componentes para garantir que todas as chamadas de dados sejam delegadas aos `services`.

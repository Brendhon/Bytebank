# Prompt de Análise Arquitetural de Componentes

## Objetivo

Analisar componentes React/TypeScript do projeto Bytebank verificando conformidade com requisitos arquiteturais definidos em `@docs/architecture/*` e `@docs/guidelines/global.md`.

---

## Diretrizes de Análise

### Documentos de Referência

Avalie o componente comparando-o com os seguintes documentos:

1. **`@docs/guidelines/global.md`** - Diretrizes globais de código (TypeScript, Next.js, Tailwind, documentação)
2. **`@docs/architecture/modular-architecture.md`** - Princípios de modularidade e Clean Architecture
3. **`@docs/architecture/performance-optimization.md`** - Práticas de performance e otimização
4. **`@docs/architecture/security.md`** - Práticas de segurança
5. **`@docs/architecture/state-management.md`** - Gerenciamento de estado

### Critérios de Avaliação

> **⚠️ Importante:** Esta análise **NÃO** deve se preocupar com:
> - **Testes**: Não avaliar cobertura de testes, testes unitários, testes de integração, etc.
> - **Internacionalização (i18n)**: Não avaliar suporte a múltiplos idiomas, textos hardcoded, ou configurações de i18n.

Avalie os seguintes aspectos:

#### 1. **Nomenclatura e Estrutura**
- Componente tem nome explícito na exportação? (`export default function ComponentName()` vs `export default () => {}`)
- Interfaces/tipos têm nomes descritivos e estão exportados?
- Segue convenções: PascalCase para componentes, camelCase para funções/variáveis?

#### 2. **TypeScript**
- Tipagem forte sem uso de `any`?
- Interfaces bem definidas e exportadas para reutilização?
- Uso adequado de genéricos quando aplicável?

#### 3. **Acessibilidade (WCAG)**
- Atributos ARIA apropriados (`role`, `aria-label`, `aria-live`, `aria-current`, etc.)?
- Atributos semânticos HTML (`scope`, `caption` em tabelas, `alt` em imagens)?
- Componentes navegáveis por teclado e screen readers?

#### 4. **Estilos e UI**
- Usa Tailwind CSS conforme diretrizes?
- Estilos isolados em objeto `styles` no final do arquivo? (Template literals com `as const`)
- Usa função `cn` para composição condicional de classes?
- Responsividade implementada?
- Usa `next/image` para imagens, `lucide-react` para ícones, Headless UI quando apropriado?

#### 5. **Performance**
- Uso adequado de `useMemo` e `useCallback` (apenas quando necessário)?
- Componente marcado como `'use client'` apenas se necessário?
- Evita `useEffect` desnecessários?

#### 6. **Documentação**
- JSDoc completo na interface e componente?
- Documentado em Storybook (para componentes reutilizáveis)?
- Stories incluem `tags: ['autodocs']` e `argTypes`?
- Comentários agregam valor (não são redundantes)?

#### 7. **Boas Práticas React**
- Keys de lista usam IDs únicos (não `index`)?
- Props opcionais tratadas com optional chaining?
- Separação adequada de responsabilidades?

---

## Estrutura do Documento de Análise

Crie um arquivo `analysis.md` no **mesmo diretório do componente** com a seguinte estrutura:

### 1. **Título e Resumo Executivo**

```markdown
# Análise Arquitetural: Componente [NomeDoComponente]

## 📋 Resumo Executivo

**Status Geral:** [✅ Excelente / ✅ Bom / ⚠️ Requer Atenção / 🔴 Crítico]

[Parágrafo descritivo resumindo o estado geral do componente, principais pontos fortes e fracos, e se há violações críticas]

**Conformidade com Requisitos Técnicos:** [X%]
```

**Critérios de Status:**
- **✅ Excelente (95-100%)**: Todas melhorias implementadas, segue todos os padrões
- **✅ Bom (70-94%)**: Bem estruturado, apenas melhorias não-críticas pendentes
- **⚠️ Requer Atenção (50-69%)**: Violações importantes ou múltiplas melhorias necessárias
- **🔴 Crítico (<50%)**: Bugs críticos ou violações severas de arquitetura

---

### 2. **Requisitos Técnicos Infringidos**

```markdown
## 🚨 Requisitos Técnicos Infringidos

> **Nota:** Se não houver infrações, escrever: "Nenhum requisito técnico infringido. O componente está em conformidade com as diretrizes."

### [Número]. **[Nome da Infração]** (Prioridade: [Crítica/Alta/Média/Baixa])
- **Requisito:** [Descrição do que é esperado]
- **Documento:** `@docs/[caminho]` - Seção "[nome da seção]"
- **Infração:** [Descrição específica do que está errado]
- **Impacto:** [Consequências da infração]
```

**Prioridades:**
- **Crítica**: Bugs que impedem funcionalidade ou violam WCAG/segurança
- **Alta**: Dificulta manutenção, debugging ou experiência do desenvolvedor
- **Média**: Não segue padrões estabelecidos mas não afeta funcionalidade
- **Baixa**: Melhorias opcionais de qualidade

---

### 3. **Pontos em Conformidade**

```markdown
## Pontos em Conformidade

1. **[Categoria]:**
   - [Descrição do que está correto]
   - [Detalhes adicionais se relevante]

2. **[Categoria]:**
   - ...
```

**Categorias Comuns:**
- Modularidade e Estrutura de Diretórios
- TypeScript e Tipagem
- Componentização e Reutilização
- Performance
- Padrões de Estilo
- Documentação em Storybook
- Naming Conventions
- Client/Server Components
- Hooks e Estado

---

### 4. **Pontos de Melhoria**

```markdown
## Pontos de Melhoria

1. **[Nome da Melhoria]:**
   - [Descrição do problema]
   - [Por que é um problema]

2. **[Nome da Melhoria]:**
   - ...
```

---

### 5. **Plano de Ação**

```markdown
## Plano de Ação

### 1. [Nome da Ação]
**Prioridade: [Crítica/Alta/Média/Baixa]**

- [Descrição da ação necessária]
- Código exemplo (se aplicável):
  ```typescript
  // Exemplo de implementação
  ```

### 2. [Próxima Ação]

**Ordenação**: Listar do mais crítico para o menos crítico.

---

## Instruções de Execução

1. **Leia o Componente**: Analise o código do componente alvo incluindo:
   - Arquivo principal (`.tsx`)
   - Stories do Storybook (`.stories.tsx`)
   - Tipos relacionados

2. **Consulte os Documentos**: Leia os documentos de referência em `@docs/architecture/*` e `@docs/guidelines/global.md`

3. **Avalie Cada Critério**: Para cada critério de avaliação, identifique:
   - ✅ O que está em conformidade
   - ❌ O que está infringindo requisitos
   - 💡 O que pode ser melhorado

4. **Calcule Conformidade**: 
   - Conte o número total de critérios avaliados
   - Conte quantos estão em conformidade
   - Percentual = (conformes / total) × 100

5. **Crie o Documento**: 
   - Conteúdo em **português brasileiro**
   - Seja claro, objetivo e específico
   - Inclua exemplos de código apenas em "Plano de Ação"

6. **Mantenha Consistência**:
   - Use emojis padrão: 📋 ✅ ⚠️ 🔴 🚨
   - Mantenha formatação consistente
   - Prioridades claras e justificadas

---

## Exemplo de Uso

Para analisar o componente `Button`:

1. Leia `/src/components/ui/Button/Button.tsx`
2. Leia `/src/components/ui/Button/Button.stories.tsx`
3. Compare com documentos de arquitetura
4. Identifique infrações (ex: exportação sem nome, falta ARIA)
5. Crie `/src/components/ui/Button/analysis.md`

---

## Observações Importantes

- **Seja Específico**: Cite linhas de código quando relevante
- **Seja Prático**: Foque em melhorias acionáveis
- **Seja Claro e Objetivo**: Evite julgamentos vagos; aponte problemas concretos e específicos de forma objetiva.
- **Contextualize**: Sempre cite o documento de referência e a seção específica
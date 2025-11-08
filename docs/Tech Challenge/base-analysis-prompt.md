# Prompt Base para Análise Arquitetural

## Objetivo

Analisar artefatos de código (componentes, hooks, serviços, etc.) verificando conformidade com os requisitos arquiteturais definidos nos documentos de referência e criar o arquivo `analysis.md` com o resultado da análise.

---

## Documentos de Referência

1. `@docs/guidelines/global.md` - Diretrizes globais (TypeScript, Next.js, Tailwind, documentação)
2. `@docs/architecture/modular-architecture.md` - Modularidade e Clean Architecture
3. `@docs/architecture/performance-optimization.md` - Performance e otimização
4. `@docs/architecture/security.md` - Segurança
5. `@docs/architecture/state-management.md` - Gerenciamento de estado

> **⚠️ Não avaliar:** Testes e Internacionalização (i18n)

---

## Estrutura do Documento `analysis.md`

O arquivo `analysis.md` deve ser criado no **mesmo diretório do artefato analisado** seguindo a estrutura definida abaixo:

```markdown
# Análise Arquitetural: [Tipo do Artefato]: [Nome]

## 📋 Resumo Executivo
**Status:** [✅ Excelente (95-100%) / ✅ Bom (70-94%) / ⚠️ Requer Atenção (50-69%) / 🔴 Crítico (<50%)]
[Parágrafo resumindo estado geral, pontos fortes/fracos, violações críticas]
**Conformidade:** [X%]

## 🚨 Requisitos Técnicos Infringidos
> Se não houver: "Nenhum requisito técnico infringido."

### [Número]. [Nome] (Prioridade: Crítica/Alta/Média/Baixa)
- **Requisito:** [O que é esperado]
- **Documento:** `@docs/[caminho]` - Seção "[seção]"
- **Infração:** [O que está errado]
- **Impacto:** [Consequências]

## Pontos em Conformidade
1. **[Categoria]:** [Descrição]

## Pontos de Melhoria
1. **[Nome]:** [Descrição e por que é problema]

## Plano de Ação
### 1. [Nome] (Prioridade: Crítica/Alta/Média/Baixa)
- [Descrição]
- Código exemplo (se aplicável)

## 📊 Mapeamento
**Arquivo:** `[caminho relativo a src]`  
**Status:** [✅ Criado / ⚠️ Pendente / ❌ Não criado]  
**Link:** `@docs/Tech Challenge/analysis-mapping.md`
```

---

## Definição de Prioridades

- **Crítica**: Bugs que impedem a funcionalidade principal, violações graves de segurança (e.g., exposição de dados sensíveis), ou falhas críticas de acessibilidade (WCAG).
- **Alta**: Código que dificulta significativamente a manutenção, o debugging ou a extensibilidade. Violações de padrões arquiteturais centrais.
- **Média**: Desvios de padrões de código que não afetam a funcionalidade, mas geram inconsistência ou débito técnico leve.
- **Baixa**: Melhorias opcionais, como otimizações de performance micro ou sugestões de estilo de código.

---

## Instruções de Execução

1. **Leia o código-fonte**: Analise o arquivo principal (`.tsx`, `.ts`) e quaisquer arquivos relacionados (tipos, hooks, etc.).
2. **Consulte os documentos de referência**: Verifique a conformidade com `@docs/architecture/*` e `@docs/guidelines/global.md`.
3. **Avalie os critérios**: Identifique pontos em conformidade (✅), infrações (❌) e oportunidades de melhoria (💡).
4. **Calcule a conformidade**: (Pontos em conformidade / Total de critérios aplicáveis) × 100.
5. **Crie o arquivo `analysis.md`**: Siga a estrutura definida, escrevendo em português brasileiro de forma clara e objetiva.
6. **Atualize o `analysis-mapping.md`**: Marque o status da análise como "Criado" (✅) e o da implementação como "Pendente" (⚠️) ou "Concluído" (✅) em `@docs/Tech Challenge/analysis-mapping.md`.

---

## Observações Gerais

- Ao citar código, inclua o número da linha para facilitar a localização.
- Foque em fornecer melhorias acionáveis e claras.
- Sempre cite o documento de referência e a seção específica ao apontar uma infração.
- Mantenha o `analysis-mapping.md` sempre atualizado para refletir o progresso.

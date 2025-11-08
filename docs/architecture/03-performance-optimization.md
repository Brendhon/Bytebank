# Análise de Arquitetura: Performance e Otimização

Este documento avalia as práticas de performance do projeto Bytebank e identifica oportunidades de otimização para melhorar o tempo de carregamento e a responsividade da aplicação.

## Visão Geral

O Next.js App Router já fornece uma base sólida para a performance, com renderização no servidor, code-splitting por rota e caching automático. No entanto, existem técnicas adicionais que podem ser aplicadas para levar a experiência do usuário a um nível superior.

---

### Pontos Fortes (O que já está bom)

1.  **Renderização no Servidor (RSC):** O uso de Server Components por padrão é o maior ganho de performance do projeto. Isso reduz a quantidade de JavaScript enviado ao cliente, melhora o tempo de carregamento inicial (FCP) e o SEO.

2.  **Code Splitting Automático:** O Next.js divide o código JavaScript por rotas. Isso significa que o usuário só baixa o código necessário para a página que está visitando, o que já é uma forma de "lazy loading" no nível da página.

3.  **Caching de Dados (Fetch API):** O Next.js estende a `fetch` API para cachear automaticamente as requisições de dados em Server Components. Isso significa que, por padrão, chamadas de API idênticas não serão refeitas a cada navegação, otimizando a busca de dados.

---

### Pontos de Melhoria (Oportunidades de Refatoração)

1.  **Lazy Loading de Componentes Pesados:**
    *   **Problema:** Componentes que não são imediatamente visíveis ou que são pesados (ex: gráficos, modais complexos, editores de texto) podem estar sendo carregados junto com o restante da página, aumentando o bundle inicial.
    *   **Sugestão:** Utilizar `next/dynamic` para importar componentes de forma dinâmica (lazy loading). Isso cria um "chunk" de JavaScript separado para o componente, que só é baixado e renderizado quando ele é necessário (ex: quando um modal é aberto).
    *   **Candidatos para Lazy Loading:** `Modal`, `TransactionForm`, `AccountForm`, e qualquer outra seção ou componente que não seja crítico para a primeira renderização da página.

2.  **Otimização de Imagens:**
    *   **Problema:** O projeto pode estar usando a tag `<img>` padrão do HTML, o que não otimiza as imagens para a web (tamanho, formato, carregamento). As imagens em `public/illustrations` são um bom exemplo.
    *   **Sugestão:** Substituir todas as tags `<img>` pelo componente `<Image>` de `next/image`.
        *   **Benefícios:** Otimização automática de tamanho, conversão para formatos modernos (como WebP), e "lazy loading" por padrão para imagens que estão fora da viewport. É crucial definir as propriedades `width` e `height` para evitar Cumulative Layout Shift (CLS).

3.  **Estratégias de Pré-carregamento (Prefetching):**
    *   **Problema:** A navegação entre páginas pode ter um pequeno atraso enquanto o código da próxima página é carregado.
    *   **Sugestão:** O componente `<Link>` do Next.js já faz o prefetching do código de uma página quando o link entra na viewport do usuário. A melhoria aqui é garantir que **toda a navegação interna** seja feita exclusivamente com o componente `<Link>` e não com `<a>` ou `router.push()` programático, a menos que seja estritamente necessário. Para dados, o Next.js não tem um prefetch nativo fácil, mas garantir que as chamadas de dados no servidor sejam extremamente rápidas (com bom caching) tem um efeito similar.

4.  **Programação Reativa com Server Actions:**
    *   **Problema:** A interface pode não parecer "reativa" o suficiente durante as mutações de dados, dependendo de estados de `loading` manuais no cliente.
    *   **Sugestão:** Conforme mencionado no documento de State Management, o uso de Server Actions com o hook `useFormStatus` (para obter o estado de `pending`) torna a UI reativa de forma declarativa. O feedback para o usuário (desabilitar um botão, mostrar um spinner) é derivado diretamente do status da ação no servidor, simplificando o código e melhorando a experiência.

### Plano de Ação Sugerido

1.  **Implementar `next/dynamic`:** Identificar os componentes mais pesados e que não são visíveis no carregamento inicial. Envolvê-los com `dynamic()` para carregá-los sob demanda.
2.  **Refatorar Imagens:** Substituir todas as ocorrências de `<img>` por `<Image>` de `next/image`, fornecendo as dimensões corretas.
3.  **Auditar Navegação:** Garantir que todos os links de navegação interna utilizem o componente `<Link>` do Next.js.
4.  **Adotar `useFormStatus`:** Ao refatorar formulários para Server Actions, usar o hook `useFormStatus` para fornecer feedback visual imediato ao usuário durante a submissão.

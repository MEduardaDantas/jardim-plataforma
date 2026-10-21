---
title: "Laboratórios: problemas e prática"
description: "Práticas com problemas, entregas verificáveis e registros de aprendizado. Proposta de trilhas para Git, colaboração, Docker e entrega."
type: guia
stage: aprender
status: em-estudo
created: 2026-10-16
updated: 2026-10-21
tags: [estudo, pratica]
relations:
  - target: mapa
    kind: documenta
  - target: conceitos/index
    kind: documenta
---

## Objetivo

Resolver problemas em ambientes de estudo, produzir evidências e explicar o resultado. Cada laboratório é uma demanda de prática, não uma página de definições nem uma lista de comandos para copiar.

Esta página é o catálogo. As trilhas abaixo são propostas: os laboratórios executáveis ainda serão escritos e ajustados às demandas de trabalho. Não há obrigação de concluir tudo em uma sessão.

## Passo a passo

### Trilhas propostas

| Trilha | Problemas que podemos praticar | Evidência esperada |
|---|---|---|
| Git | Separar alterações em commits; integrar branches; resolver um conflito; desfazer uma mudança | Histórico e diff explicados |
| Colaboração | Abrir PR/MR; responder revisão; configurar CODEOWNERS; distinguir indicação de revisor e aprovação obrigatória | PR/MR e verificação do comportamento da regra |
| Acesso e automação | Distinguir papéis, credenciais de CI e credenciais da aplicação | Matriz simples de acesso e logs sem segredos |
| Docker | Construir uma imagem; iniciar containers; diagnosticar uma configuração ausente; persistir dados | Referência da imagem, logs e comportamento observado |
| Registry | Publicar no Docker Hub; baixar em outro ambiente; compreender tag e digest | Evidência de publicação e consumo; ECR em etapa posterior |
| Entrega | Comparar implantação direta e GitOps com Argo CD | Mudança declarada, resultado observado e recuperação |

CI/CD e YAML entram no mínimo necessário para cada exercício. O aprofundamento fica junto da introdução a manifestos Kubernetes. Antes do laboratório de Argo CD, será necessário um preparo curto sobre cluster, namespace, Deployment e configuração de acesso.

### Como cada laboratório será apresentado

Cada página terá: problema, objetivo, pré-requisitos, ponto de partida, tarefas, resultado esperado, falha para investigar, evidências, registro do aprendizado e limpeza. Ajuda ficará separada da solução comentada, para permitir uma tentativa própria.

O progresso terá nomes claros: não iniciado, em andamento, bloqueado e concluído com evidência. Esses estados descrevem uma tentativa, não substituem a maturidade da nota. A interface de acompanhamento ainda não foi implementada.

### Simulador: um apoio opcional

O [simulador de entrega](../ciclo.html) representa consequências de construir, publicar, alterar o Git e sincronizar. Ele não executa Docker, não conecta ao GitHub/GitLab e não cria recursos Kubernetes. Serve para comparar previsão e resultado simulado, não comprova habilidade prática.

O histórico mostrado pertence à experiência na tela e não vira automaticamente uma nota. Para guardar uma reflexão, use [o Studio](../studio.html), selecione o tipo Laboratório, revise o texto e salve pelo fluxo do editor. O Studio cria a nota; não executa o laboratório.

## Como verificar

Um laboratório só deve ser marcado como concluído quando houver uma entrega verificável e uma explicação do resultado. Executar comandos sem compreender a saída não é evidência suficiente. Registre tentativas que falharam e o que permitiu investigar.

Antes de publicar evidências, retire credenciais, dados pessoais e identificadores internos. As práticas públicas usarão dados de estudo. Recursos com custo, como ECR, terão pré-requisitos e limpeza explícitos antes de qualquer execução.

## Conexões

[[mapa]] ajuda a localizar o problema. [[conceitos/index]] reúne explicações para consultar durante a prática.

## Referências

Cada laboratório terá referências específicas do problema. Para práticas de colaboração, os pontos de partida são [pull requests no GitHub](https://docs.github.com/en/pull-requests) e [merge requests no GitLab](https://docs.gitlab.com/user/project/merge_requests/). A antiga referência genérica de Python foi removida porque não sustentava este catálogo.

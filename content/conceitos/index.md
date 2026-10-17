---
title: Conceitos para explorar
description: Um catálogo de ferramentas e conceitos, com explicações, relações e
  espaço para exemplos visuais.
type: guia
stage: aprender
status: em-estudo
created: 2026-10-16
updated: 2026-10-17
tags:
  - estudo
  - guia
relations:
  - target: mapa
    kind: depende-de
  - target: laboratorios/index
    kind: depende-de
  - target: guias/como-contribuir
    kind: depende-de
---

## Objetivo

Entender cada peça do fluxo com calma. Cada nota explica o problema que resolve, como funciona e como se conecta às outras. Você pode acrescentar imagens e diagramas em qualquer seção pelo Studio ou pela edição no GitHub.

## Passo a passo

- [[conceitos/application|Application]] — Indicar ao Argo CD a origem e o destino. Entenda sua participação no ciclo de entrega.
- [[conceitos/applicationset|ApplicationSet]] — Reduzir definições repetidas de Applications. Entenda sua participação no ciclo de entrega.
- [[conceitos/argo-cd|Argo CD]] — Reconciliar configurações de aplicações com Kubernetes. Entenda sua participação no ciclo de entrega.
- [[conceitos/ecr|ECR e versões]] — Disponibilizar imagens para consumidores autorizados. Entenda sua participação no ciclo de entrega.
- [[conceitos/git|Git]] — Registrar mudanças e recuperar decisões. Entenda sua participação no ciclo de entrega.
- [[conceitos/gitops|GitOps]] — Reduzir divergências entre configuração desejada e ambiente. Entenda sua participação no ciclo de entrega.
- [[conceitos/helm|Helm]] — Reutilizar modelos de recursos. Entenda sua participação no ciclo de entrega.
- [[conceitos/iac|Terraform e Terragrunt]] — Provisionar infraestrutura de forma revisável. Entenda sua participação no ciclo de entrega.
- [[conceitos/imagens|Imagem e container]] — Distribuir a aplicação com seu ambiente de execução. Entenda sua participação no ciclo de entrega.
- [[conceitos/kubernetes|Kubernetes]] — Manter aplicações distribuídas entre máquinas. Entenda sua participação no ciclo de entrega.
- [[conceitos/kustomize|Kustomize]] — Reutilizar manifestos base com ajustes por ambiente. Entenda sua participação no ciclo de entrega.
- [[conceitos/multiarch|AMD64 e ARM64]] — Executar em máquinas com conjuntos de instruções diferentes. Entenda sua participação no ciclo de entrega.
- [[conceitos/observabilidade|Observabilidade]] — Investigar comportamento e orientar melhorias. Entenda sua participação no ciclo de entrega.
- [[conceitos/pipeline|Pipeline de CI]] — Repetir verificações de cada alteração. Entenda sua participação no ciclo de entrega.
- [[conceitos/s3|S3 e bucket]] — Armazenar objetos como documentação estática. Entenda sua participação no ciclo de entrega.
- [[conceitos/seguranca|Cadeia de confiança]] — Entender origem, composição e riscos da entrega. Entenda sua participação no ciclo de entrega.
- [[conceitos/techdocs|Backstage e TechDocs]] — Trazer a documentação para o cotidiano de desenvolvimento. Entenda sua participação no ciclo de entrega.
- [[conceitos/yaml|YAML]] — Representar configurações legíveis. Entenda sua participação no ciclo de entrega.

## Como verificar

Depois da leitura, tente explicar a ferramenta sem usar apenas seu nome. O que ela recebe? O que entrega? O que ela não faz sozinha? Volte ao mapa para conferir a ligação.

## Conexões

[[mapa]] conecta os assuntos. [[laboratorios/index]] oferece prática. [[guias/como-contribuir]] explica como ampliar as notas.

## Referências

- [Kubernetes: conceitos](https://kubernetes.io/docs/concepts/)

---
{
  "title": "A empresa que cresce com você",
  "description": "Demandas fictícias progressivas para aprender DevOps e engenharia de plataforma com contexto.",
  "type": "guia",
  "stage": "aprender",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-16",
  "tags": [
    "aprender",
    "guia"
  ],
  "relations": [
    {
      "target": "demandas/primeira-entrega",
      "kind": "documenta"
    },
    {
      "target": "mapa",
      "kind": "depende-de"
    }
  ]
}
---

## Objetivo

A Aurora precisa disponibilizar um portal. Evoluímos a mesma aplicação. A sequência é didática; cloud e Kubernetes entram quando uma necessidade justificar.

## Passo a passo

| Capítulo | Necessidade | Conceitos | Disponível agora |
|---|---|---|---|
| 1 | Executar o software | Processo, porta, HTTP | [[laboratorios/primeiro-software|Laboratório pronto]] |
| 2 | Detectar regressões | Testes e [[conceitos/pipeline|CI]] | Teste no laboratório; evolução futura |
| 3 | Repetir instalação | [[conceitos/imagens|Containers]] | Dockerfile opcional no lab |
| 4 | Distribuir versões | [[conceitos/ecr|Registry]] | Conceito; laboratório futuro |
| 5 | Criar ambiente | VM, rede, [[conceitos/iac|IaC]] | Conceito; laboratório futuro |
| 6 | Entregar e voltar | Promoção e rollback | Simulador no mapa |
| 7 | Operar réplicas | [[conceitos/kubernetes|Kubernetes]] | Conceito; laboratório futuro |
| 8 | Controlar diferenças | [[conceitos/gitops|GitOps]], [[conceitos/helm|Helm]], [[conceitos/kustomize|Kustomize]] | Conceitos e simulador |
| 9 | Repetir padrões | [[conceitos/applicationset|ApplicationSet]] | Conceito; laboratório futuro |
| 10 | Operar com confiança | [[conceitos/observabilidade|Observabilidade]], [[conceitos/seguranca|segurança]] | Conceitos; laboratório futuro |

## Como verificar

Uma demanda só está concluída com evidências de seus critérios de aceite. A árvore pode crescer em paralelo: não precisamos dominar tudo antes de descobrir uma relação.

## Conexões

[[demandas/primeira-entrega]] inicia a história. [[mapa]] mostra onde cada capítulo entra.

## Referências

- [Docker: primeiros passos](https://docs.docker.com/get-started/)

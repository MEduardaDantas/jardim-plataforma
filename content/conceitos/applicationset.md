---
{
  "title": "ApplicationSet",
  "description": "Reduzir definições repetidas de Applications. Entenda sua participação no ciclo de entrega.",
  "type": "conceito",
  "stage": "implantar",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-16",
  "tags": [
    "implantar",
    "conceito"
  ],
  "relations": [
    {
      "target": "conceitos/application",
      "kind": "produz"
    },
    {
      "target": "mapa",
      "kind": "documenta"
    }
  ]
}
---

## O problema que resolve

Reduzir definições repetidas de Applications.

## Como funciona

Geradores fornecem parâmetros; um template gera e mantém Applications. É um componente do ecossistema Argo CD.

## No fluxo de entrega

Só gera o conjunto abrangido pelos geradores. Applications individuais também podem ser criadas por código.

## Exemplo

Trecho didático; não é um arquivo completo.

```text
kind: ApplicationSet
# Modelo + parâmetros → Applications
```

## Como verificar

Inspecione Applications geradas e destinos; o modelo pode afetar várias.

## Conexões

[[conceitos/application]] — relação: **produz**. [[mapa]] localiza esta peça no ciclo.

## Referências

- [Documentação oficial](https://argo-cd.readthedocs.io/en/stable/user-guide/application-set/)

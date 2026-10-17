---
{
  "title": "Application",
  "description": "Indicar ao Argo CD a origem e o destino. Entenda sua participação no ciclo de entrega.",
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
      "target": "conceitos/argo-cd",
      "kind": "configura"
    },
    {
      "target": "mapa",
      "kind": "documenta"
    }
  ]
}
---

## O problema que resolve

Indicar ao Argo CD a origem e o destino.

## Como funciona

Recurso declarativo com repositório, revisão, caminho ou chart, destino e políticas. Pode gerenciar vários recursos.

## No fluxo de entrega

Conecta a configuração ao cluster. Não representa um Pod individual.

## Exemplo

Trecho didático; não é um arquivo completo.

```text
kind: Application
# Trecho parcial; origem e destino são necessários.
```

## Como verificar

Confira source e destination antes de sincronizar.

## Conexões

[[conceitos/argo-cd]] — relação: **configura**. [[mapa]] localiza esta peça no ciclo.

## Referências

- [Documentação oficial](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/)

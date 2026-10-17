---
{
  "title": "Pipeline de CI",
  "description": "Repetir verificações de cada alteração. Entenda sua participação no ciclo de entrega.",
  "type": "conceito",
  "stage": "verificar",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-16",
  "tags": [
    "verificar",
    "conceito"
  ],
  "relations": [
    {
      "target": "conceitos/imagens",
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

Repetir verificações de cada alteração.

## Como funciona

Jobs executam em runners. Checkout traz código; comandos testam, constroem e podem publicar artefatos.

## No fluxo de entrega

Build, push e atualização da configuração de implantação são etapas distintas. A automação precisa declarar cada uma.

## Exemplo

Trecho didático; não é um arquivo completo.

```text
npm ci
npm test
npm run build
```

## Como verificar

Associe o resultado dos jobs e artefatos ao commit testado.

## Conexões

[[conceitos/imagens]] — relação: **produz**. [[mapa]] localiza esta peça no ciclo.

## Referências

- [Documentação oficial](https://docs.github.com/pt/actions)

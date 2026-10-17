---
{
  "title": "Git",
  "description": "Registrar mudanças e recuperar decisões. Entenda sua participação no ciclo de entrega.",
  "type": "conceito",
  "stage": "planejar",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-16",
  "tags": [
    "planejar",
    "conceito"
  ],
  "relations": [
    {
      "target": "conceitos/pipeline",
      "kind": "depende-de"
    },
    {
      "target": "mapa",
      "kind": "documenta"
    }
  ]
}
---

## O problema que resolve

Registrar mudanças e recuperar decisões.

## Como funciona

Versiona arquivos em commits. Uma branch organiza uma linha de trabalho; um pull request propõe integrar alterações.

## No fluxo de entrega

Código e configuração de implantação podem viver em repositórios diferentes.

## Exemplo

Trecho didático; não é um arquivo completo.

```text
git diff
git log --oneline -5
```

## Como verificar

Confira o diff e o commit correspondente antes de revisar uma entrega.

## Conexões

[[conceitos/pipeline]] — ajuda a compreender a próxima responsabilidade. [[mapa]] localiza esta peça no ciclo.

## Referências

- [Documentação oficial](https://git-scm.com/doc)

---
{
  "title": "YAML",
  "description": "Representar configurações legíveis. Entenda sua participação no ciclo de entrega.",
  "type": "conceito",
  "stage": "construir",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-16",
  "tags": [
    "construir",
    "conceito"
  ],
  "relations": [
    {
      "target": "conceitos/helm",
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

Representar configurações legíveis.

## Como funciona

Mapas associam chaves a valores; listas usam hífen. Indentação determina a estrutura. Cada ferramenta define o significado das chaves.

## No fluxo de entrega

Aparece na pipeline, nos manifestos e nos valores de Helm.

## Exemplo

Trecho didático; não é um arquivo completo.

```text
image:
  repository: exemplo/portal
  tag: v2
```

## Como verificar

Valide sintaxe e o contrato da ferramenta que vai ler o arquivo.

## Conexões

[[conceitos/helm]] — ajuda a compreender a próxima responsabilidade. [[mapa]] localiza esta peça no ciclo.

## Referências

- [Documentação oficial](https://yaml.org/spec/1.2.2/)

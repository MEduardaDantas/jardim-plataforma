---
{
  "title": "Backstage e TechDocs",
  "description": "Trazer a documentação para o cotidiano de desenvolvimento. Entenda sua participação no ciclo de entrega.",
  "type": "conceito",
  "stage": "publicar",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-16",
  "tags": [
    "publicar",
    "conceito"
  ],
  "relations": [
    {
      "target": "conceitos/s3",
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

Trazer a documentação para o cotidiano de desenvolvimento.

## Como funciona

Geração produz site estático; publisher envia arquivos ao armazenamento; Backstage apresenta a documentação.

## No fluxo de entrega

Build bem-sucedido e publish falho significam que a atualização pode não aparecer no portal.

## Exemplo

Trecho didático; não é um arquivo completo.

```text
Markdown → MkDocs → site → S3 → Backstage
```

## Como verificar

Altere uma frase e confirme sua presença após geração, publicação e consulta.

## Conexões

[[conceitos/s3]] — relação: **depende-de**. [[mapa]] localiza esta peça no ciclo.

## Referências

- [Documentação oficial](https://backstage.io/docs/features/techdocs/)

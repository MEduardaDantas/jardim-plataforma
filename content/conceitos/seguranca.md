---
{
  "title": "Cadeia de confiança",
  "description": "Entender origem, composição e riscos da entrega. Entenda sua participação no ciclo de entrega.",
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
      "kind": "valida"
    },
    {
      "target": "mapa",
      "kind": "documenta"
    }
  ]
}
---

## O problema que resolve

Entender origem, composição e riscos da entrega.

## Como funciona

SBOM descreve componentes; provenance registra origem/processo; assinatura permite verificar autenticidade e integridade sob uma política de confiança. Scan procura vulnerabilidades.

## No fluxo de entrega

Assinatura não prova ausência de vulnerabilidades. Kyverno pode auditar ou bloquear conforme a política configurada.

## Exemplo

Trecho didático; não é um arquivo completo.

```text
Build → scan + SBOM + provenance → assinatura → verificação
```

## Como verificar

Confira identidade, digest e política. Teste um caso que deve ser rejeitado.

## Conexões

[[conceitos/imagens]] — relação: **valida**. [[mapa]] localiza esta peça no ciclo.

## Referências

- [Documentação oficial](https://docs.sigstore.dev/)

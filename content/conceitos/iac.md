---
{
  "title": "Terraform e Terragrunt",
  "description": "Provisionar infraestrutura de forma revisável. Entenda sua participação no ciclo de entrega.",
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
    {"target": "conceitos/kubernetes", "kind": "configura"},
    {
      "target": "conceitos/s3",
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

Provisionar infraestrutura de forma revisável.

## Como funciona

Terraform descreve recursos e calcula mudanças. Terragrunt ajuda a organizar configurações e execução de unidades Terraform.

## No fluxo de entrega

Criar cluster ou bucket é diferente de implantar a aplicação dentro do cluster. Padrões de pastas dependem do projeto.

## Exemplo

Trecho didático; não é um arquivo completo.

```text
terraform plan
# Revise conta, região e alterações antes de apply.
```

## Como verificar

Inspecione plan e recursos resultantes; entenda o destino.

## Conexões

[[conceitos/s3]] — relação: **produz**. [[mapa]] localiza esta peça no ciclo.

[[conceitos/kubernetes]] — a infraestrutura do cluster pode ser provisionada por IaC.

## Referências

- [Documentação oficial](https://developer.hashicorp.com/terraform/docs)

---
{
  "title": "Kustomize",
  "description": "Reutilizar manifestos base com ajustes por ambiente. Entenda sua participação no ciclo de entrega.",
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
      "target": "conceitos/kubernetes",
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

Reutilizar manifestos base com ajustes por ambiente.

## Como funciona

Aplica transformações e patches a recursos existentes. Não usa a mesma substituição de variáveis do Helm.

## No fluxo de entrega

O overlay pode selecionar uma tag sem copiar o Deployment inteiro. Argo CD pode renderizar o resultado.

## Exemplo

Trecho didático; não é um arquivo completo.

```text
images:
  - name: registry.example/portal
    newTag: v2
```

## Como verificar

Execute kubectl kustomize no overlay e confira a imagem final.

## Conexões

[[conceitos/kubernetes]] — relação: **configura**. [[mapa]] localiza esta peça no ciclo.

## Referências

- [Documentação oficial](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/)

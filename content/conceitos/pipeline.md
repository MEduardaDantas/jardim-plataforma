---
{
  "title": "Pipeline de CI/CD",
  "description": "Automatizar verificações, construção de imagens e entrega, distinguindo CI de CD e integração de dependência.",
  "type": "conceito",
  "stage": "verificar",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-21",
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
      "target": "conceitos/argo-cd",
      "kind": "pode-atualizar-fonte-de"
    },
    {
      "target": "conceitos/kubernetes",
      "kind": "pode-implantar-em"
    }
  ]
}
---


## O problema que resolve

Repetir verificações de cada alteração.

## Como funciona

Jobs executam em runners. Checkout traz código; comandos testam, constroem e podem publicar artefatos. CI integra e verifica mudanças. CD cuida da entrega e pode incluir implantação. Nem toda pipeline executa todas essas etapas.

Argo CD é uma ferramenta de CD para Kubernetes, não um executor geral de jobs de CI. Uma pipeline não depende dele para existir.

## No fluxo de entrega

Build, push e atualização da configuração de implantação são etapas distintas. A automação precisa declarar cada uma.

Há dois caminhos possíveis de entrega, não duas etapas obrigatórias:

- Com Argo CD: a pipeline pode atualizar a referência da imagem na configuração versionada. Argo CD acompanha essa fonte e aplica a alteração conforme sua política de sincronização. A integração passa pelo Git; publicar uma imagem no registry não basta.
- Com implantação direta: uma etapa de CD pode aplicar manifestos ao Kubernetes usando credenciais autorizadas, sem Argo CD.

GitHub Actions e GitLab CI/CD são serviços que podem executar pipelines com runners. GitOps é uma abordagem de operação; Argo CD é uma implementação dela. Para manter o mapa focado, as ligações desta nota mostram o artefato produzido e os dois caminhos de implantação, sem acrescentar todas as plataformas possíveis.

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

- [[conceitos/imagens]] — uma pipeline pode construir imagens.
- [[conceitos/argo-cd]] — pode atualizar a fonte versionada acompanhada pelo Argo CD; não é dependência obrigatória.
- [[conceitos/kubernetes]] — uma etapa de CD pode implantar diretamente no cluster; é alternativa ao caminho com Argo CD.

## Referências

- [Documentação oficial](https://docs.github.com/pt/actions)

- [Automação a partir de pipelines de CI no Argo CD](https://argo-cd.readthedocs.io/en/stable/user-guide/ci_automation/)

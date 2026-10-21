---
{
  "title": "Gitlab",
  "description": "Hospedar repositórios Git, revisar alterações e organizar pipelines. Entenda a relação entre GitLab, colaboração e automação da entrega.",
  "type": "conceito",
  "stage": "planejar",
  "status": "em-estudo",
  "created": "2026-10-18",
  "updated": "2026-10-21",
  "tags": [
    "git",
    "colaboracao",
    "versionamento",
    "automacao"
  ],
  "relations": [
    {
      "target": "conceitos/git",
      "kind": "depende-de"
    },
    {
      "target": "conceitos/gitops",
      "kind": "pode-fornecer-fonte-para"
    },
    {
      "target": "conceitos/pipeline",
      "kind": "executa-via-gitlab-ci"
    }
  ]
}
---


## O problema que resolve

Um projeto compartilhado precisa de hospedagem para seu repositório, organização das contribuições e acompanhamento das verificações.

O GitLab reúne esses recursos em uma plataforma baseada em repositórios Git. Além de disponibilizar o código, permite revisar mudanças e organizar automações de integração e entrega.

## Como funciona

Um projeto no GitLab pode reunir o repositório Git, issues, merge requests e configurações de CI/CD.

Um merge request, ou MR, propõe integrar alterações de uma branch em outra. Seu papel é semelhante ao de um pull request no GitHub: apresentar mudanças, permitir discussão e acompanhar a revisão antes da integração.

O GitLab também permite editar arquivos pelo navegador. O Web IDE oferece edição de múltiplos arquivos e criação de commits. Workspaces oferecem ambientes de desenvolvimento remoto quando disponíveis e configurados.

O versionamento continua sendo responsabilidade do Git. O GitLab acrescenta hospedagem, colaboração e serviços ao redor desse histórico.

## No fluxo de entrega

Depois de enviar uma branch ao GitLab, posso abrir um merge request e acompanhar as verificações configuradas para a mudança.

No GitLab CI/CD, uma pipeline reúne jobs. Os stages permitem organizar esses jobs em etapas, como teste, construção e publicação. Os runners executam os jobs.

A ordem depende da configuração: stages organizam uma sequência, mas também é possível definir dependências específicas entre jobs.

Uma pipeline pode verificar código, gerar artefatos e publicar entregas. Essas tarefas precisam estar configuradas; hospedar o repositório não faz tudo isso acontecer automaticamente.

## Exemplo

Em um projeto de documentação, uma pipeline pode ter etapas de validação, construção e publicação.

Primeiro, uma alteração é enviada e apresentada em um merge request. As verificações configuradas ajudam a avaliar a proposta.

Depois da integração, uma pipeline pode construir o site e publicá-lo no destino definido pelo projeto.

Se a construção terminar, mas a publicação falhar, o conteúdo gerado pode existir como artefato da execução sem que a atualização esteja disponível no destino. Preciso investigar o job de publicação e seus logs.

## Como verificar

Antes de integrar uma alteração:

- Conferir as branches de origem e destino do merge request.
- Revisar os arquivos e as linhas modificadas.
- Ler os comentários e verificar as aprovações exigidas.
- Identificar a pipeline associada à alteração.
- Conferir quais jobs executaram, falharam ou foram ignorados.
- Consultar os logs do job que apresentou problema.

Uma etapa concluída não garante que todo o fluxo terminou. Construir, testar e publicar são responsabilidades diferentes e precisam ser verificadas conforme o objetivo da entrega.

## Conexões

[[conceitos/gitops]] — esta plataforma pode hospedar o repositório usado como fonte versionada. É uma opção de hospedagem, não uma dependência obrigatória da abordagem.

- [[conceitos/git|Git]] — depende-de.

[[conceitos/pipeline]] — GitLab CI/CD organiza a execução de workflows/pipelines, cujos jobs são executados por runners. Esta funcionalidade fica nesta nota, sem exigir um artigo separado agora.

## Referências

- [Documentação do GitLab](https://docs.gitlab.com/)
- [Pipelines do GitLab CI/CD](https://docs.gitlab.com/ci/pipelines/)
- [Web IDE](https://docs.gitlab.com/user/project/web_ide/)
- [Desenvolvimento remoto](https://docs.gitlab.com/user/project/remote_development/)

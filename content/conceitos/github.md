---
{
  "title": "Github",
  "description": "Hospedar repositórios Git, revisar alterações e automatizar tarefas. Entenda onde o GitHub participa do desenvolvimento e da entrega.",
  "type": "conceito",
  "stage": "planejar",
  "status": "em-estudo",
  "created": "2026-10-18",
  "updated": "2026-10-18",
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
    }
  ]
}
---

## O problema que resolve

Quando várias pessoas trabalham em um projeto versionado com Git, precisam de um lugar compartilhado para disponibilizar o repositório, discutir mudanças e organizar revisões.

O GitHub oferece essa hospedagem e acrescenta recursos de colaboração, controle de acesso e automação. Ele não substitui o Git: utiliza seus repositórios e seu histórico como base.

## Como funciona

O projeto fica em um repositório hospedado no GitHub. Pessoas com as permissões necessárias podem consultar arquivos, trabalhar com branches e enviar commits.

Um pull request, ou PR, propõe integrar alterações de uma branch em outra. Nele, podemos comparar mudanças, discutir o código e acompanhar revisões e verificações.

Também é possível editar arquivos pelo navegador. Para desenvolver com terminal e executar código em um ambiente remoto, existe o GitHub Codespaces.

Git, GitHub e Codespaces têm responsabilidades diferentes: Git faz o versionamento; GitHub hospeda e organiza a colaboração; Codespaces fornece um ambiente de desenvolvimento.

## No fluxo de entrega

Depois de registrar alterações com Git, posso enviar minha branch ao GitHub e abrir um pull request.

Se houver automações configuradas, o GitHub Actions pode executar verificações e outras tarefas em resposta a eventos do repositório.

Um workflow organiza jobs, que executam em runners. Dentro de um job, os steps definem as ações e os comandos executados.

A integração deve considerar as regras do projeto, os resultados das verificações e a revisão. Um PR sem conflitos não garante que a alteração funciona.

## Exemplo

No Jardim de Plataforma, posso alterar uma nota Markdown e propor sua integração por um pull request.

Na revisão, confiro o texto, os links e os arquivos modificados. A automação verifica o conteúdo e constrói o site.

Após a integração, o fluxo de publicação configurado atualiza o GitHub Pages. Salvar uma alteração no repositório e publicar o site são etapas diferentes: preciso acompanhar a execução para confirmar a publicação.

## Como verificar

Antes de integrar uma alteração:

- Conferir o repositório, a branch de origem e a branch de destino.
- Revisar os arquivos e as linhas modificadas no PR.
- Ler comentários e solicitações de revisão.
- Conferir as verificações executadas.
- Se uma execução falhar, abrir os logs do job correspondente.

Depois de uma publicação, verificar tanto o resultado da automação quanto a página publicada. A existência do commit, sozinha, não comprova que o site foi atualizado.

## Conexões

- [[conceitos/git|Git]] — depende-de.

## Referências

- [Documentação do GitHub](https://docs.github.com/pt)
- [GitHub Actions](https://docs.github.com/en/actions/get-started/understanding-github-actions)
- [GitHub Codespaces](https://docs.github.com/en/codespaces)

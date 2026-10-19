---
{
  "title": "Git",
  "description": "Entender como registrar alterações, trabalhar com branches e compartilhar versões de um projeto.",
  "type": "conceito",
  "stage": "planejar",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-19",
  "tags": [
    "planejar",
    "conceito",
    "git",
    "versionamento"
  ],
  "relations": [
    {
      "target": "mapa",
      "kind": "documenta"
    }
  ]
}
---

## O problema que resolve

Durante o desenvolvimento de um projeto, arquivos são criados, modificados e excluídos. Quando várias pessoas trabalham juntas, precisamos entender o que mudou, comparar versões e integrar contribuições.

O Git é um sistema de controle de versão distribuído. Ele permite registrar estados do projeto, consultar o histórico e recuperar conteúdo de versões anteriores.

Esse histórico ajuda a investigar quando uma mudança foi introduzida. As mensagens dos commits também ajudam a explicar sua intenção, desde que sejam escritas com clareza.

O Git não registra automaticamente cada edição: as mudanças entram no histórico quando criamos commits.

## Como funciona

### Repositório e histórico

Um repositório Git reúne os dados necessários para versionar um projeto. Normalmente, trabalhamos em uma pasta com arquivos e subpastas, e o Git acompanha os arquivos incluídos no versionamento.

Nem todo arquivo da pasta precisa ser versionado. Arquivos temporários e dependências geradas, por exemplo, podem ser ignorados.

Um commit registra um estado do projeto, com informações como autoria, data e mensagem. Ele não significa que o código foi compilado, testado ou publicado.

### Salvar, preparar, registrar e enviar

Essas ações têm responsabilidades diferentes:

| Ação | O que faz |
| --- | --- |
| Salvar no editor | Grava o conteúdo no arquivo do computador. |
| `git add` | Prepara o conteúdo selecionado para o próximo commit. |
| `git commit` | Registra o conteúdo preparado no histórico local. |
| `git push` | Envia commits para um repositório remoto. |

O Git consegue detectar alterações em arquivos rastreados antes do `git add`. A função do `add` é selecionar o conteúdo que entrará no próximo commit.

A área de preparação também é chamada de *staging area* ou índice.

Se eu fizer `git add`, editar o arquivo novamente e salvá-lo, essa nova edição não entrará no commit até que eu a prepare também.

### Local, remoto e distribuído

O Git já é distribuído, mesmo sem GitHub ou GitLab.

Em um clone comum, cada pessoa tem um repositório local com o histórico e pode criar commits, consultar versões e trabalhar sem internet. Existem opções de clonagem que limitam o histórico recebido.

Um remoto é outro repositório, acessado por um endereço. Ele pode estar no GitHub, no GitLab ou em um servidor próprio.

O repositório local não deixa de existir quando enviamos alterações: local e remoto coexistem.

| Comando | Responsabilidade |
| --- | --- |
| `git clone` | Cria uma cópia local de um repositório. |
| `git fetch` | Busca atualizações do remoto sem integrá-las automaticamente à branch de trabalho. |
| `git pull` | Busca atualizações e tenta integrá-las à branch atual. |
| `git push` | Envia commits e solicita a atualização das referências no remoto. |

Essa troca não é uma sincronização automática de pastas. Precisamos decidir quando buscar, integrar e enviar alterações.

### Branches e integração

Uma branch representa uma linha de desenvolvimento. Posso criar uma branch para trabalhar em uma funcionalidade sem colocar meus novos commits diretamente na branch principal.

Enquanto trabalho, a branch principal pode receber alterações de outras pessoas. Depois, preciso integrar os trabalhos.

O merge é uma operação do Git que integra históricos. Ele não apaga automaticamente a branch de origem.

Um conflito acontece quando o Git não consegue combinar determinadas alterações sozinho. Nesse caso, precisamos analisar o conteúdo e resolver a combinação.

Branch e ambiente são conceitos diferentes: a branch organiza versões do código; o ambiente é onde uma versão é executada. O projeto pode estabelecer uma relação entre eles, mas essa relação não é obrigatória no Git.

### Onde entram GitHub e GitLab?

GitHub e GitLab são plataformas que hospedam repositórios Git e acrescentam recursos de colaboração e automação.

| Git | GitHub e GitLab |
| --- | --- |
| Registra commits e mantém o histórico. | Hospedam repositórios e oferecem interfaces para consultá-los. |
| Trabalha com branches e integração de alterações. | Organizam propostas de integração e revisões. |
| Troca dados com repositórios remotos. | Gerenciam o acesso aos repositórios hospedados. |
| Permite comparar versões. | Acrescentam issues, discussões e sistemas de CI/CD. |

No GitHub, uma proposta de integração é chamada de pull request, ou PR. No GitLab, é chamada de merge request, ou MR.

Um PR não é uma solicitação de push. No fluxo habitual, primeiro enviamos os commits da nossa branch e depois abrimos a proposta para integrá-los em outra branch.

O Git pode fazer merge pelo terminal sem um PR. O PR acrescenta um processo de colaboração ao redor dessa integração.

Um repositório remoto pode ser público ou privado. Estar disponível pela rede não significa que qualquer pessoa tem permissão para acessá-lo.

## No fluxo de entrega

O Git registra as versões que servem de entrada para o restante do fluxo.

Um caminho possível é:

1. Alterar e salvar os arquivos.
2. Conferir as mudanças.
3. Preparar o conteúdo desejado.
4. Criar um commit.
5. Enviar a branch ao remoto.
6. Abrir um PR ou MR.
7. Acompanhar as verificações e a revisão.
8. Integrar a alteração quando os critérios do projeto forem atendidos.

Uma [[conceitos/pipeline]] pode ser acionada por eventos como push ou abertura de PR, conforme sua configuração. Ela pode testar, compilar e publicar artefatos.

Os commits pertencem ao histórico do Git. Os logs e resultados das execuções pertencem ao sistema de CI/CD.

Código da aplicação e configurações de implantação podem estar no mesmo repositório ou em repositórios diferentes. Essa organização depende do projeto.

## Exemplo

Exemplo didático para um repositório local já existente. Os comandos pressupõem uma alteração no arquivo `README.md`.

```bash
# Conferir a branch atual e a situação dos arquivos
git status

# Criar uma branch e mudar para ela
git switch -c docs/explicar-versionamento

# Agora, editar e salvar o README.md no editor.

# Conferir as mudanças ainda não preparadas
git diff -- README.md

# Preparar apenas esse arquivo
git add README.md

# Revisar o que entrará no próximo commit
git diff --staged

# Registrar no histórico local
git commit -m "docs: explica o versionamento com Git"

# Consultar os últimos cinco commits
git log --oneline -5
```

Até esse ponto, o commit existe localmente.

Se houver um remoto chamado `origin` configurado e eu tiver permissão de escrita, posso enviar a branch:

```bash
git push -u origin docs/explicar-versionamento
```

Depois, posso abrir um PR ou MR pela plataforma para propor a integração na branch de destino.

## Como verificar

Antes de criar um commit:

- Usar `git status` para conferir a branch e os arquivos envolvidos.
- Usar `git diff` para revisar mudanças ainda não preparadas em arquivos rastreados.
- Usar `git diff --staged` para revisar o conteúdo preparado.
- Conferir se arquivos novos deveriam realmente entrar no projeto.
- Verificar se não estou incluindo credenciais, arquivos temporários ou alterações sem relação com o objetivo.

Depois do commit, posso consultar o histórico com `git log` e inspecionar o commit mais recente com `git show`.

Antes de integrar uma alteração, preciso distinguir três verificações:

| Verificação | Pergunta |
| --- | --- |
| Conflitos | O Git consegue combinar as alterações? |
| Testes | O comportamento atende aos casos verificados? |
| Revisão | A mudança faz sentido e atende ao objetivo? |

Ausência de conflito não garante que o código funciona.

Se um teste falhar, preciso consultar os logs e investigar a causa. A falha pode estar na alteração, no teste ou no ambiente de execução.

Verificações obrigatórias podem bloquear a integração. Mesmo quando a plataforma permite o merge, isso não comprova que a alteração está pronta.

## Conexões

- [[conceitos/pipeline]] — utiliza versões do repositório para executar verificações e outras etapas automatizadas.
- [[mapa]] — apresenta as relações entre versionamento e as demais responsabilidades do ciclo de entrega.

[[conceitos/github|GitHub]] e [[conceitos/gitlab|GitLab]] hospedam repositórios Git. [[conceitos/gitops|GitOps]] utiliza Git como referência versionada do estado desejado.

Versionar configurações de uma ferramenta não significa depender dela. Git pode versionar Dockerfiles, manifests e arquivos de infraestrutura; imagens de container são artefatos armazenados em registries e containers em execução não são versões guardadas no Git.

## Referências

- [Documentação oficial do Git](https://git-scm.com/doc)
- [Livro Pro Git em português](https://git-scm.com/book/pt-br/v2)

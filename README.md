# 🌿 Jardim de Plataforma

Meu espaço pessoal para aprender **DevOps e engenharia de plataforma**. O conteúdo é um estudo pessoal, não documentação oficial.


## Uso cotidiano

- **Nova nota**: selecione o tipo, preencha campos e relações, revise Markdown e abra o GitHub.
- **Editar esta página**: abre o arquivo exato no GitHub.
- **Configurar**: abre `site.settings.json` para título, autora e configurações.
- **Textos longos**: o editor oferece download do `.md`; envie-o para a pasta indicada.
- **Aparência**: `quartz.config.yaml` e `quartz/styles/custom.scss`.
- **Novos modelos**: `policies/content-schema.json` e `templates/`. O formulário lê o schema publicado, então novos campos de seção aparecem após o build.
- **Conexões**: `relations` registra `target` e `kind`; o texto deve conter o wikilink do mesmo destino. O grafo padrão representa os links, não rotula cada aresta com kind. O simulador explica responsabilidades.

Uma Issue usa um formulário de proposta. Ela não publica uma nota automaticamente.

## Políticas e aprovação

A publicação depende de `Qualidade`. Um push inválido não substitui a versão publicada. Para também bloquear integração inválida:

1. Settings → Rules → Rulesets → New branch ruleset.
2. Aplique à branch `main`, com enforcement ativo.
3. Exija pull request e o status check `Qualidade` (aparece após a primeira execução).
4. Bloqueie force push e exclusão da branch. Revise bypasses conforme sua preferência.

Com essa regra, edite em uma branch e integre pelo PR. O validador confere formato, não prova a correção técnica. O filtro de credenciais cobre padrões conhecidos e não é uma auditoria completa. As notas iniciais estão `em-estudo`, sem atribuir à estudante práticas que ela ainda não executou.

## Estrutura

| Caminho | Finalidade |
|---|---|
| `content/` | Notas Markdown que formam o jardim |
| `templates/` | Modelos para edição manual |
| `policies/` | Contrato editorial compartilhado com o formulário |
| `web/` | Formulário e simulador estáticos |
| `scripts/` | Validação, preparação e pós-processamento |
| `tests/` | Testes negativos de políticas e interações DOM |
| `labs/` | Práticas executáveis |
| `quartz/` | Motor Quartz preservado |
| `.github/workflows/publish.yml` | Qualidade e publicação |

`public`, `node_modules`, caches e rascunhos locais não entram no Git. Atualizações de dependências abrem PRs pelo Dependabot; não há auto-merge. O commit do Quartz usado como base está em `UPSTREAM_COMMIT`.


## Licença

O Quartz mantém sua licença MIT em `LICENSE.txt`. As adições deste projeto também são disponibilizadas sob MIT. Ícones do simulador são desenhos vetoriais próprios de funções, não logotipos oficiais. Referências técnicas estão nas notas.
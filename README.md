# 🌿 Jardim de Plataforma

Meu espaço pessoal para aprender **DevOps e engenharia de plataforma**. O conteúdo é um estudo pessoal, não documentação oficial.


## Uso cotidiano

- **Nova nota**: selecione o tipo, preencha campos e relações, revise Markdown e abra o GitHub.
- **Editar esta página**: abre o arquivo exato no GitHub.
- **Configurar**: abre `site.settings.json` para título, autora e configurações.
- **Textos longos**: o editor oferece download do `.md`; envie-o para a pasta indicada.
- **Aparência**: `quartz.config.yaml` e `quartz/styles/custom.scss`.
- **Novos modelos**: `policies/content-schema.json` e `templates/`. O formulário lê o schema publicado, então novos campos de seção aparecem após o build.
- **Conexões**: `relations` registra `target` e `kind`; o texto deve conter o wikilink do mesmo destino. O mapa amplo destaca o significado das relações ao selecionar um conceito. O grafo lateral do Quartz continua disponível nas notas.

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

O Quartz mantém sua licença MIT em `LICENSE.txt`. As adições deste projeto também são disponibilizadas sob MIT. Ícones de ferramentas vêm do projeto Devicon; créditos em `web/icons/ATTRIBUTION.txt`. Marcas pertencem a seus respectivos titulares. Referências técnicas estão nas notas.

## Organização do estudo

- **Conceitos**: explicações com exemplos, imagens e diagramas.
- **Mapa**: rede ampla com ícones, busca, filtros, seleção, zoom e cartões arrastáveis.
- **Laboratórios**: as demandas de prática, com desafio, observações e registro pessoal.
- **Studio**: três modelos (conceito, laboratório, guia) e inserção de imagens/diagramas.

Não há seção separada de decisões ou demandas. URLs antigas são redirecionadas para preservar favoritos. O simulador aceita ações em qualquer ordem, mostra erros e permite recuperação e rollback. Ele não executa infraestrutura real.

## Verificar localmente

```sh
npm ci
npm run install-plugins
npm run test:policies
npm run test:web
npm run test:lab
npm run build:site
node scripts/check-output.mjs
```

O check de saída verifica títulos reais no HTML, ausência de metadados no texto, navegação, mapa e catálogo publicado. O parser `note-properties` precisa permanecer ativo; `hidePropertiesView: true` oculta a exibição dos campos sem desativar sua leitura.

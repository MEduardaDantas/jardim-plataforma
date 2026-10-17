---
{
  "title": "Escrever, conectar e publicar",
  "description": "Como criar notas pelo formulário web, editar no GitHub e publicar após validações automáticas.",
  "type": "guia",
  "stage": "aprender",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-16",
  "tags": [
    "aprender",
    "guia"
  ],
  "relations": [
    {
      "target": "guias/politicas",
      "kind": "depende-de"
    },
    {
      "target": "conceitos/git",
      "kind": "depende-de"
    },
    {
      "target": "conceitos/pipeline",
      "kind": "depende-de"
    }
  ]
}
---

## Objetivo

Adicionar conhecimento com consistência. O GitHub controla quem grava; o site público não guarda tokens.

## Passo a passo

1. Abra **Nova nota**. Escolha conceito, laboratório ou guia.
2. Preencha título, descrição e seções do modelo.
3. Escolha as notas relacionadas e o significado das relações.
4. Gere o Markdown e revise. **Criar no GitHub** abre o editor autenticado; conclua o commit ou PR lá. Para textos longos, baixe o Markdown e use Upload files.
5. Para corrigir uma página, use **Editar esta página**.
6. **Configurar** abre `site.settings.json`. Aparência avançada fica em `quartz.config.yaml`.
7. A pipeline valida, testa e constrói. Só publica em main se os passos passarem.

O rascunho do formulário fica neste navegador. Só fica disponível entre máquinas depois de salvar no GitHub. Não há salvamento silencioso no servidor.

Use caminhos completos, como `[[conceitos/ecr|ECR]]`. Registre target e kind nas relações do frontmatter. O grafo representa links; o tipo da relação explica o significado no texto.

### Imagens e diagramas nas notas

No Studio, a área **Adicionar imagem ou diagrama** insere o trecho na seção escolhida. Para uma imagem, forneça uma URL HTTPS e um texto alternativo. Para arquivos próprios, envie a imagem para `content/assets` no GitHub e use o caminho absoluto do site. O upload da imagem continua sendo concluído no GitHub; o formulário não envia arquivos sozinho.

Diagramas usam Mermaid. Escolha **Diagrama**, edite o exemplo e insira o bloco na seção. A publicação transforma o código em um diagrama visual. Para editar uma nota existente, o mesmo Markdown pode ser colado no arquivo aberto por **Editar esta página**.

## Como verificar

Confira Actions, a página publicada e o grafo. Conteúdo inválido não atualiza o site; a última versão válida permanece.

## Conexões

[[guias/politicas]] define contratos. [[conceitos/git]] registra histórico. [[conceitos/pipeline]] aplica verificações.

## Referências

- [Editor web do GitHub](https://docs.github.com/pt/codespaces/the-githubdev-web-based-editor)

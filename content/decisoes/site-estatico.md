---
{
  "title": "ADR 001 — um jardim estático com edição pelo GitHub",
  "description": "Decisão de usar Quartz e Pages com formulário de modelos e gravação autenticada pelo GitHub.",
  "type": "decisao",
  "stage": "planejar",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-16",
  "tags": [
    "planejar",
    "decisao"
  ],
  "relations": [
    {
      "target": "guias/como-contribuir",
      "kind": "configura"
    },
    {
      "target": "guias/politicas",
      "kind": "depende-de"
    }
  ]
}
---

## Contexto

Precisamos de um espaço público, gratuito e editável entre computadores, com histórico e conexões.

## Alternativas

CMS com backend e autenticação; notas locais sincronizadas; site estático com conteúdo no Git.

## Decisão

Usar Quartz e GitHub Pages. O formulário produz Markdown e encaminha ao GitHub. A edição é concluída com autenticação e permissões do repositório. Sem tokens no navegador do site.

## Consequências

Leitura pública rápida e histórico no Git. Publicação aguarda pipeline. O formulário não é um CMS com salvamento direto. Laboratórios reais rodam fora do Pages.

## Como revisar

Reavaliar quando houver muitos autores, necessidade de rascunhos compartilhados em tempo real ou edição visual rica.

## Conexões

[[guias/como-contribuir]] operacionaliza a decisão. [[guias/politicas]] valida o conteúdo.

## Referências

- [GitHub Pages](https://docs.github.com/pt/pages/getting-started-with-github-pages/what-is-github-pages)

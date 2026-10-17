---
{
  "title": "Políticas de conteúdo e publicação",
  "description": "Contratos de modelos, campos, datas e relações para um jardim de conhecimento consistente.",
  "type": "guia",
  "stage": "verificar",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-16",
  "tags": [
    "verificar",
    "guia"
  ],
  "relations": [
    {
      "target": "guias/como-contribuir",
      "kind": "documenta"
    },
    {
      "target": "conceitos/pipeline",
      "kind": "depende-de"
    }
  ]
}
---

## Objetivo

Garantir estrutura e navegação. Automação valida formato; correção conceitual exige leitura e experimentação.

## Passo a passo

- Toda nota tem título, descrição, tipo, etapa, status, datas, tags e relações.
- Cada tipo tem seções obrigatórias definidas em `policies/content-schema.json`.
- Caminhos usam minúsculas e hífens. Títulos aceitam acentos.
- Toda relação aponta para nota existente e aparece como wikilink no corpo.
- Links entre notas usam wikilinks de caminho completo. HTML bruto não é aceito em novas notas; a apresentação da home é mantida no código.
- Datas são reais no formato AAAA-MM-DD. Atualização não precede criação.
- Referências incluem URLs HTTP(S); a fonte deve ser revisada por uma pessoa.
- Status: rascunho, em-estudo ou validado. Nenhum deles dispensa as validações.
- Scripts embutidos e padrões reconhecíveis de credenciais são rejeitados. Essa detecção é parcial.

A pipeline impede publicação inválida. Para impedir merge inválido, configure a regra de branch do README exigindo o check **Qualidade**. Permissões de bypass são controladas pelo GitHub.

## Como verificar

Execute `npm run validate:content` e `npm run test:policies`. Testes negativos verificam campos ausentes e conexões quebradas.

## Conexões

[[guias/como-contribuir]] mostra o uso diário. [[conceitos/pipeline]] executa as regras.

## Referências

- [Branches protegidas](https://docs.github.com/pt/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)

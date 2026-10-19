---
{
  "title": "Trunk-Based Development",
  "description": "Integração de mudanças pequenas e frequentes numa linha principal compartilhada, evitando branches isoladas por longos períodos.",
  "type": "conceito",
  "stage": "planejar",
  "status": "em-estudo",
  "created": "2026-10-19",
  "updated": "2026-10-19",
  "tags": [
    "conceito",
    "planejar",
    "trunk-based"
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

Quando pessoas trabalham por muito tempo em branches isoladas, a integração pode acumular diferenças e problemas. Trunk-Based Development busca reduzir esse isolamento por meio de integrações frequentes.

## Como funciona

O trunk é a linha principal compartilhada, frequentemente chamada `main`. O trabalho é dividido em mudanças pequenas que retornam rapidamente a ela.

O time pode usar commits diretos com controles apropriados ou branches muito curtas com revisão. PRs são compatíveis com a abordagem. Feature flags podem permitir integrar trabalho sem disponibilizar imediatamente a funcionalidade aos usuários.

Fazer commits frequentes numa branch isolada não equivale a integrar frequentemente na principal.

## No fluxo de entrega

Verificações automatizadas e revisão ágil ajudam a manter a principal utilizável. Integrar com frequência não significa dispensar qualidade nem necessariamente publicar cada commit em produção.

GitHub Flow e Trunk-Based podem se sobrepor. Um fluxo de PRs rápidos e mudanças pequenas pode atender aos dois; manter uma feature isolada por semanas contraria a intenção de Trunk-Based.

## Exemplo

Para construir uma busca no portal, posso dividir o trabalho em mudanças verificáveis: preparar uma função interna, acrescentar seus testes e depois integrar a interface.

Cada mudança deve preservar o funcionamento esperado. Se a funcionalidade incompleta não puder aparecer ao usuário, preciso planejar como ocultá-la, em vez de simplesmente integrar código quebrado.

## Como verificar

- Há integração frequente na principal ou apenas commits frequentes em branches separadas?
- As mudanças são pequenas o suficiente para revisar e testar?
- Uma branch está ficando isolada por tempo excessivo?
- A principal continua funcionando após as integrações?

Não há valor em fechar branches rapidamente se os testes falham e ninguém trata o problema.

## Conexões

- [[conceitos/git]] — fornece o versionamento usado neste exemplo; a prática também pode existir com outros sistemas de controle de versão.
- [[conceitos/githubflow|GitHub Flow]] — pode ser combinado com integração frequente.
- [[conceitos/gitflow|Git Flow]] — mantém mais linhas duradouras com papéis distintos.
- [[conceitos/gitops]] — complementa o desenvolvimento com uma abordagem de operação.

## Referências

- [Trunk-Based Development: introdução](https://trunkbaseddevelopment.com/)
- [Branches de vida curta, em português](https://pt.trunkbaseddevelopment.com/short-lived-feature-branches/)

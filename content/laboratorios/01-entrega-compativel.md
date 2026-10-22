---
title: "01 · Entregar uma mudança compatível sem interromper os consumidores"
description: "Aprenda a evoluir uma API sem quebrar consumidores existentes, integrar uma correção concorrente e verificar a entrega com branches, pull requests e testes."
type: laboratorio
stage: aprender
status: em-estudo
created: "2026-10-21"
updated: "2026-10-22"
tags:
  - git
  - github-flow
  - api
  - compatibilidade
  - testes
  - integracao
---

# 01 · Entregar uma mudança compatível sem interromper os consumidores

[Organização Jardim de Plataforma](https://github.com/jardim-plataforma) · [Repositório do laboratório](https://github.com/jardim-plataforma/lab-01-entrega-compativel)

## Contexto

Imagine que uma empresa tenha um serviço de catálogo usado por sistemas diferentes. Um deles é um portal de operações; outro é uma integração antiga que não pode ser modificada agora.

Os dois consultam a mesma API. Ela devolve três campos para cada recurso: `id`, `nome` e `status`.

Surge uma nova necessidade: outro consumidor precisa receber também `unidade` e `responsavel`. Ao mesmo tempo, uma pessoa da equipe está corrigindo um defeito: quando um recurso não existe, a API deve responder com um erro HTTP 404, em vez de retornar um objeto vazio como se a consulta tivesse sido bem-sucedida.

Essas mudanças precisam coexistir. A nova funcionalidade não pode quebrar o consumidor antigo, e a correção do erro não pode desaparecer durante a integração.

Este laboratório usa uma aplicação pequena para praticar um problema comum no desenvolvimento de software: **como entregar uma mudança sem perder compatibilidade com quem já depende do sistema**.

## Objetivo da entrega

Ao concluir o laboratório, você deverá conseguir:

- Separar mudanças independentes em branches.
- Evoluir o contrato de uma API sem obrigar todos os consumidores a mudar ao mesmo tempo.
- Integrar uma correção concorrente e verificar se ela foi preservada.
- Usar pull requests (PRs) para registrar mudanças, decisões e verificações.
- Testar o comportamento dos consumidores antes e depois da integração.
- Consultar o histórico do Git para entender como as mudanças chegaram à branch final.
- Distinguir integração de código, recuperação de uma regressão e implantação de um serviço.

O fluxo praticado é o **GitHub Flow**: criar uma branch para uma mudança, registrar commits, abrir um pull request, revisar, integrar e verificar o resultado.

O foco não é apenas fazer o código funcionar. É conseguir explicar o que mudou, por que a mudança é compatível e quais evidências sustentam essa conclusão.

## Ponto de partida

O projeto contém uma API HTTP, um portal, consumidores executados pelo terminal, dados fictícios e testes automatizados.

### Os três consumidores

| Consumidor | Necessidade | Contrato |
|---|---|---|
| Portal A | Exibir os dados do recurso | API v1 inicialmente; atualizado para v2 na resolução |
| Integração B | Processar a resposta usando exatamente três campos | API v1 |
| Novo consumidor C | Receber os cinco campos | API v2 |

A integração B é deliberadamente rigorosa: ela espera `id`, `nome` e `status`. A solução não deve esconder uma quebra alterando essa validação para aceitar qualquer resposta.

### Os dados e os contratos

A API trabalha com registros fictícios, como `svc-001`, `svc-002` e `svc-003`. Cada registro possui os cinco campos necessários.

A API v1 expõe somente:

```json
{
  "id": "svc-001",
  "nome": "Serviço de catálogo",
  "status": "ativo"
}
```

A API v2 expõe os mesmos campos e acrescenta `unidade` e `responsavel`.

Os valores acima ilustram a estrutura da resposta; consulte os dados efetivos do projeto para verificar os valores retornados.

### O defeito concorrente

Na situação inicial do exercício, a consulta de um identificador inexistente tem um comportamento incorreto. A correção esperada é responder com HTTP 404 e um erro estruturado:

```json
{
  "erro": {
    "codigo": "RECURSO_INEXISTENTE",
    "id": "id-solicitado"
  }
}
```

O mesmo princípio deve valer nas duas versões da API.

## Desenvolvimento da demanda

### 1. Entenda antes de modificar

Execute a aplicação e os testes conforme as instruções do README. Observe como cada consumidor chama a API e como valida a resposta.

Verifique três situações:

1. Um recurso existente consultado pela API v1.
2. Um recurso inexistente consultado pela API.
3. A necessidade de obter os cinco campos sem quebrar o consumidor legado.

Antes de implementar, identifique qual comportamento pertence ao contrato e qual pertence à implementação interna.

### 2. Separe as mudanças em branches

A evolução do contrato e a correção de recursos inexistentes têm objetivos diferentes. Por isso, devem poder ser desenvolvidas e analisadas separadamente.

Uma organização possível é:

- `fix/recurso-inexistente`: corrigir a resposta de erro.
- `feat/consulta-ampliada`: implementar o contrato ampliado.
- `main-resolução`: integrar e verificar o resultado final deste exercício.

O nome da branch de integração depende da organização do repositório. Nesta resolução, foi usada `main-resolução`, mantendo a branch original `main` separada.

### 3. Evolua o contrato sem quebrar o legado

Há mais de uma estratégia possível para evoluir uma API. Neste exercício, a solução escolhida é disponibilizar uma versão nova.

- A v1 continua entregando os três campos esperados pelo legado.
- A v2 entrega os cinco campos necessários ao novo consumidor.
- Cada consumidor utiliza explicitamente a versão de que precisa.

Isso evita que o novo requisito force uma alteração imediata na integração antiga.

### 4. Integre a correção concorrente

A correção de recursos inexistentes deve continuar presente depois da integração da funcionalidade.

Ao atualizar a branch de trabalho, examine o diff e os testes. Mesmo quando o Git não apresenta conflito textual, as mudanças podem ser incompatíveis do ponto de vista do comportamento.

### 5. Registre a revisão em um pull request

Um PR deve permitir que outra pessoa entenda:

- Qual era o comportamento anterior.
- Qual contrato foi escolhido e por quê.
- O que foi alterado.
- Quais testes foram executados.
- Quais riscos ou limitações permanecem.

Em um exercício individual, não apresente a própria revisão como se fosse uma aprovação independente de outra pessoa.

### 6. Verifique a versão integrada

Depois dos merges, atualize a branch final e execute a suíte de testes novamente.

Confira se os consumidores continuam recebendo os contratos esperados, se o erro 404 permanece correto e se o histórico deixa claro quais mudanças foram integradas.

A integração na branch não comprova que o serviço foi implantado em produção. Essa comprovação exigiria um ambiente de implantação e verificações próprias.

## Incidente para investigar

Imagine que uma nova implementação faça o consumidor C funcionar, mas passe a devolver cinco campos também para o consumidor B, que exige exatamente três.

O portal ou o novo consumidor pode continuar funcionando enquanto a integração antiga falha. Esse é o tipo de regressão que uma simples verificação visual não necessariamente detecta.

Investigue:

- Qual consumidor foi afetado?
- Qual contrato deixou de ser respeitado?
- Em qual mudança o comportamento foi introduzido?
- Como os testes poderiam detectar a regressão?
- Como recuperar a compatibilidade sem perder a correção de recursos inexistentes?

Uma recuperação demonstrada exige evidências da regressão, da ação tomada e da verificação posterior. Apenas possuir commits e merges no histórico não comprova que esse ensaio foi executado.

## Critérios de conclusão

A entrega deve demonstrar:

- [ ] A API v1 continua retornando `id`, `nome` e `status`.
- [ ] A API v2 retorna os cinco campos, incluindo `unidade` e `responsavel`.
- [ ] A integração legada continua funcionando sem flexibilizar artificialmente sua validação.
- [ ] Recursos inexistentes retornam HTTP 404 com `erro.codigo` e `erro.id` corretos.
- [ ] A correção concorrente permanece integrada.
- [ ] O PR registra a decisão de contrato e os resultados das verificações.
- [ ] A branch final contém as mudanças integradas e os testes foram executados nela.
- [ ] O histórico e as evidências permitem reconstruir o que foi feito.
- [ ] Qualquer ensaio de recuperação é documentado com resultados reais, sem confundi-lo com a integração normal.
- [ ] As limitações que permaneceram são registradas.

## Referências

- [GitHub Flow — documentação oficial](https://docs.github.com/en/get-started/using-github/github-flow)
- [GitLab Merge Requests — documentação oficial](https://docs.gitlab.com/user/project/merge_requests/)
- [Repositório do laboratório](https://github.com/jardim-plataforma/lab-01-entrega-compativel)

## Resolução e resultados

A solução evolui o catálogo sem exigir que todos os consumidores mudem ao mesmo tempo. O contrato v1 permanece disponível para a integração legada, enquanto a v2 oferece os campos adicionais `unidade` e `responsavel`.

### 1. Comportamento do consumidor legado

O Portal legado consulta a API v1 e recebe os três campos originais: `id`, `nome` e `status`.

![Portal legado usando o contrato v1](/assets/labs/01/portal-legado-v1.png)

### 2. Investigação do recurso inexistente

A consulta de um identificador inexistente, como `svc-004`, permite verificar como a aplicação trata uma resposta de ausência de recurso.

![Comportamento observado durante a investigação do recurso inexistente](/assets/labs/01/sem-recurso-inexistente.png)

### 3. Correção do recurso inexistente

A API responde com HTTP 404 e um erro estruturado contendo o código `RECURSO_INEXISTENTE` e o identificador consultado.

![Resposta de recurso inexistente na API v2](/assets/labs/01/recurso-inexistente-v2.png)

### 4. Contrato v2 ampliado

A API v2 mantém os campos originais e acrescenta `unidade` e `responsavel`. O consumidor que precisa dos dados adicionais pode utilizar a v2, enquanto a integração legada continua usando a v1.

![Portal usando o contrato v2 ampliado](/assets/labs/01/portal-contrato-v2.png)

### Verificação final

- Os 13 testes automatizados passaram na execução registrada de `python -m unittest discover -s tests -v`.
- A integração legada foi verificada com `python -m consumidores.verificar`.
- A API v1 mantém o contrato de três campos e a v2 oferece cinco campos.
- A correção para recurso inexistente foi integrada à branch `main-resolução`.
- A implementação e os testes foram verificados localmente.

**Limites da evidência:** os resultados documentam a integração e a verificação local. Não comprovam implantação em produção nem a execução de um exercício de rollback.
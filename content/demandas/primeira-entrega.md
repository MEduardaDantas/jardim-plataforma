---
{
  "title": "Aurora 01 — nosso primeiro software",
  "description": "Uma demanda com critérios verificáveis para executar e observar o primeiro software da Aurora.",
  "type": "demanda",
  "stage": "planejar",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-16",
  "tags": [
    "planejar",
    "demanda"
  ],
  "relations": [
    {
      "target": "laboratorios/primeiro-software",
      "kind": "depende-de"
    },
    {
      "target": "conceitos/pipeline",
      "kind": "depende-de"
    },
    {
      "target": "conceitos/imagens",
      "kind": "depende-de"
    }
  ]
}
---

## Contexto

A Aurora criou uma página e precisa disponibilizá-la. Antes de contratar infraestrutura, quer comprovar a execução local.

## Objetivo

Executar a aplicação e explicar a relação entre código, processo e porta.

## Critérios de aceite

- A página responde HTTP 200.
- `/health` responde status e versão.
- Uma rota inexistente retorna HTTP 404.
- Testes automatizados verificam esses comportamentos.
- O registro explica por que localhost não publica na internet.

## Plano

Execute [[laboratorios/primeiro-software]]. Registre comandos, saídas e uma dúvida.

## Evidências

Ainda não executado pela estudante. Registre aqui resultados e data depois da prática.

## Aprendizados

Se o processo parar, o código continua no disco. A aplicação continua respondendo? Experimente e explique.

## Conexões

[[conceitos/git]] registra mudanças. [[conceitos/pipeline]] automatiza verificações. [[conceitos/imagens]] distribui a execução.

## Referências

- [Python HTTP server](https://docs.python.org/3/library/http.server.html)

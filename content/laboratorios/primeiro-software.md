---
title: O código está aqui. Por que o site não responde?
description: Uma investigação opcional sobre código, processo, porta e respostas
  HTTP, com passos pequenos e reversíveis.
type: laboratorio
stage: aprender
status: em-estudo
created: 2026-10-16
updated: 2026-10-17
tags:
  - estudo
  - laboratorio
relations:
  - target: conceitos/imagens
    kind: depende-de
  - target: conceitos/pipeline
    kind: depende-de
  - target: conceitos/kubernetes
    kind: depende-de
---

## O desafio

Um arquivo de aplicação está salvo no computador, mas o navegador não consegue acessá-lo. O que precisa acontecer entre ter o código e receber uma resposta? Vamos investigar isso em um serviço local mínimo.

Este é um laboratório opcional. Se sua dúvida atual for o fluxo de implantação, você pode começar pelo [simulador](../ciclo.html) e voltar aqui depois.

## O que vamos aprender

Distinguir arquivo e processo, identificar a porta de escuta e diferenciar conexão recusada de uma resposta HTTP 404.

## Antes de começar

Você precisa de Python 3.11+ e de uma cópia deste repositório. Os arquivos estão em `labs/primeiro-software`. Não é necessário ter conta cloud ou Kubernetes. Abra o terminal na raiz do repositório. O servidor é apenas didático, para execução local.

## Experimente

1. Antes de iniciar, tente abrir `http://localhost:8000`. Se algo responder, já existe outro serviço nessa porta: use 8001 nos comandos e no navegador.
2. Inicie o processo:

```sh
python labs/primeiro-software/app.py
```

3. Abra `http://localhost:8000` e `http://localhost:8000/health`.
4. Acesse `http://localhost:8000/nao-existe`.
5. Pare com Ctrl+C e tente novamente.
6. Reinicie com outra porta:

```sh
python labs/primeiro-software/app.py --port 8001
```

7. Execute os testes em outro terminal:

```sh
python -m unittest discover -s labs/primeiro-software -p 'test_*.py' -v
```

## O que observar

O arquivo continua no disco depois que você para o processo, mas as respostas param. Uma porta diferente exige outro endereço. Um 404 é uma resposta do servidor; conexão recusada ocorre antes de receber uma resposta HTTP. O endpoint de saúde informa a versão v1.

## Se algo der errado

| Sintoma | Próxima pergunta |
|---|---|
| Python não encontrado | O Python está instalado e disponível no terminal? |
| Porta ocupada | Outro processo está usando a porta? Tente 8001. |
| Conexão recusada | O processo está ativo? Endereço e porta estão corretos? |
| 404 | A rota digitada existe no código? |

## Meu registro

Ainda não realizado por mim. Depois da tentativa, substitua este texto por: o que eu esperava; o que aconteceu; o que agora entendo; o que ainda quero perguntar. Não é necessário acertar tudo na primeira vez.

## Limpeza

Encerre o servidor com Ctrl+C. Não há recursos cloud nem banco para remover. O serviço escuta apenas em localhost por padrão.

## Conexões

[[conceitos/imagens]] ajuda a empacotar essa execução. [[conceitos/pipeline]] pode automatizar os testes. [[conceitos/kubernetes]] amplia a discussão sobre manter processos executando.

## Referências

- [HTTP server do Python](https://docs.python.org/3/library/http.server.html)

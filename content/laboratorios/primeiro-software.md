---
{
  "title": "Laboratório 01 — código, processo e porta",
  "description": "Execute uma aplicação Python, investigue portas e valide respostas HTTP com testes reais.",
  "type": "laboratorio",
  "stage": "construir",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-16",
  "tags": [
    "construir",
    "laboratorio"
  ],
  "relations": [
    {
      "target": "demandas/primeira-entrega",
      "kind": "valida"
    },
    {
      "target": "conceitos/imagens",
      "kind": "depende-de"
    },
    {
      "target": "conceitos/pipeline",
      "kind": "depende-de"
    }
  ]
}
---

## Cenário

O portal da Aurora tem uma página e um endpoint de saúde. Aqui você executa um processo real, separado do simulador visual.

## Pré-requisitos

Python 3.11 ou superior e uma cópia deste repositório. Sem bibliotecas externas. Execute os comandos a partir da raiz do projeto.

## Passo a passo

1. Execute os testes:

```sh
python -m unittest discover -s labs/primeiro-software -p 'test_*.py' -v
```

2. Inicie a aplicação:

```sh
python labs/primeiro-software/app.py
```

3. Abra `http://localhost:8000` e `/health`.
4. Acesse `/nao-existe` e observe o 404.
5. Pare com Ctrl+C e tente acessar de novo.
6. Reinicie em outra porta:

```sh
python labs/primeiro-software/app.py --port 8001
```

7. Opcional, com Docker instalado:

```sh
docker build -t aurora:lab01 labs/primeiro-software
docker run --rm -p 127.0.0.1:8080:8000 aurora:lab01
```

Abra `http://localhost:8080`: 8080 é a porta do host e 8000 a interna.

## Resultado esperado

Três testes passam. `/health` retorna status ok e versão v1. Parar o processo interrompe respostas. Alterar a porta muda o endereço. Por padrão, o servidor usa a interface local: ele não publica sozinho na internet.

## Diagnóstico

| Sintoma | Investigue |
|---|---|
| Porta ocupada | Outro processo usa 8000? Tente 8001. |
| Conexão recusada | Processo ativo? Porta correta? |
| 404 | Servidor respondeu, mas a rota não existe. |
| Container inacessível | Mapeamento de portas e interface de escuta. |

Desafio: altere a versão para v2 e ajuste a expectativa do teste. Explique a diferença entre modificar um arquivo e reiniciar o processo.

## Limpeza

Ctrl+C encerra o servidor. O container usa `--rm` e é removido ao terminar. Opcional: `docker image rm aurora:lab01`.

## Conexões

[[demandas/primeira-entrega]] define o aceite. [[conceitos/imagens]] explica o empacotamento. [[conceitos/pipeline]] automatiza testes.

## Referências

- [Python HTTP server](https://docs.python.org/3/library/http.server.html)

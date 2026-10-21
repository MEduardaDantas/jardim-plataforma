---
{
  "title": "Dockerfile",
  "description": "Instruções para construir uma imagem: imagem base, arquivos, dependências, diretórios e comando padrão de inicialização.",
  "type": "conceito",
  "stage": "construir",
  "status": "em-estudo",
  "created": "2026-10-21",
  "updated": "2026-10-21",
  "tags": [
    "construir",
    "conceito",
    "containers"
  ],
  "relations": [
    {
      "target": "conceitos/imagens",
      "kind": "configura"
    }
  ]
}
---


## O problema que resolve

Transformar a preparação do pacote em instruções registradas e revisáveis, em vez de depender da memória de quem instalou cada componente.

## Como funciona

Dockerfile é um arquivo de texto lido pela ferramenta de construção. Ele descreve como preparar arquivos e configurações da imagem.

| Instrução | Responsabilidade |
|---|---|
| `FROM` | Escolher uma imagem base para começar |
| `WORKDIR` | Definir o diretório de trabalho das instruções seguintes |
| `COPY` | Copiar arquivos disponíveis para a construção |
| `RUN` | Executar um comando durante a construção |
| `CMD` | Registrar o comando padrão para a execução do container |
| `EXPOSE` | Documentar uma porta esperada, sem publicá-la na máquina |

Uma imagem base pode conter um interpretador já instalado. Usá-la não modifica a base original: a construção acrescenta o conteúdo da nova imagem. Imagem não significa automaticamente uma versão mínima de uma ferramenta.

## No fluxo de entrega

O Dockerfile costuma ficar no repositório junto do código. Não precisa ser copiado para a imagem: depois de construída, ela já contém o resultado e os metadados necessários à execução.

Credenciais de execução, escolha da máquina e quantidade de containers não são responsabilidades desse arquivo. Segredos usados excepcionalmente durante o build exigem mecanismos próprios, sem serem gravados no resultado.

## Exemplo

Trecho de leitura, não um projeto executável: pressupõe que `src/` e `requirements.txt` existam e que o programa possa iniciar por `main.py`.

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY src/ .
CMD ["python", "main.py"]
```

O destino `.` significa `/app` após o `WORKDIR`. `COPY src/ .` copia o conteúdo da pasta, preservando suas subpastas. Não exige uma instrução por arquivo.

`requirements.txt` é uma lista; `pip install` instala as bibliotecas listadas. `CMD` representa um comando com argumento: `python main.py`. Ele não inicia o programa durante o build.

Uma cópia ampla, como `COPY . .`, exige atenção ao que está disponível. `.dockerignore` permite excluir arquivos do contexto de construção, inclusive arquivos locais de credenciais.

## Como verificar

Ao ler o arquivo, localize a base, os arquivos copiados, as instalações e o comando de início. Confira se cada caminho é relativo ao contexto de construção ou ao diretório interno. Essa revisão ainda não substitui executar e testar uma construção.

## Conexões

- [[conceitos/docker]] — utiliza este arquivo na construção.
- [[conceitos/imagens]] — resultado cuja construção é descrita pelo Dockerfile.

## Referências

- [Referência do Dockerfile](https://docs.docker.com/reference/dockerfile/)
- [Contexto de construção e dockerignore](https://docs.docker.com/build/concepts/context/)

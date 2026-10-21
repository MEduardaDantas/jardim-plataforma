---
{
  "title": "Imagens de container",
  "description": "O pacote construído com arquivos e metadados da aplicação: imagem base, tags e a diferença entre publicar e executar.",
  "type": "conceito",
  "stage": "construir",
  "status": "em-estudo",
  "created": "2026-10-16",
  "updated": "2026-10-21",
  "tags": [
    "construir",
    "conceito",
    "containers"
  ],
  "relations": [
    {
      "target": "conceitos/containers",
      "kind": "configura"
    }
  ]
}
---

## O problema que resolve

Distribuir uma versão preparada da aplicação e de suas dependências, reduzindo a necessidade de reinstalar tudo manualmente em cada destino.

## Como funciona

Uma imagem contém arquivos reais e metadados. Não é apenas uma lista de instruções: pode conter o programa, bibliotecas, interpretador ou runtime e um comando padrão de inicialização.

Ela não está executando a aplicação enquanto permanece armazenada. Também não contém necessariamente todo o ambiente: máquina, kernel compatível, rede, banco externo e credenciais de execução são fornecidos no destino.

### Imagem base e imagem da aplicação

Uma imagem pode ser construída a partir de outra. A base fornece conteúdo já preparado; a construção acrescenta as necessidades da aplicação. Atualizar a base no registry não altera imagens consumidoras já construídas: elas precisam de nova construção usando a base atualizada.

### Tag e digest

Tag é um nome atribuído a uma referência, como `1.0`. Dependendo da política do registry, pode apontar para outro conteúdo depois. Digest identifica um conteúdo específico. `latest` é uma tag, não uma garantia de versão mais recente.

## No fluxo de entrega

Editar o código não modifica uma imagem existente. É necessário construir outra imagem e, para distribuí-la, publicá-la. Publicar também não troca automaticamente containers já criados.

O Dockerfile é um caminho comum de construção, mas existem outras ferramentas que produzem imagens sem ele.

## Exemplo

Uma imagem de uma aplicação Python pode conter o interpretador, as bibliotecas e os arquivos de código. A mesma imagem pode ser usada em testes e produção, recebendo endereços de banco e credenciais diferentes na execução.

O código pode estar na imagem, mas colaboração e histórico de desenvolvimento continuam sendo responsabilidades do repositório Git.

## Como verificar

Consigo identificar o conteúdo empacotado, a referência da imagem e quais configurações vêm de fora? Sei explicar por que baixar a imagem ainda não significa ter a aplicação funcionando? Essas perguntas registram compreensão; a execução será validada depois.

## Conexões

- [[conceitos/dockerfile]] — caminho de construção adotado neste estudo.
- [[conceitos/docker]] — ferramentas para construir e usar imagens.
- [[conceitos/containers]] — instâncias criadas a partir desse pacote.
- [[conceitos/registry]] — armazena e distribui imagens.
- [[conceitos/ecr]] — serviço que pode armazená-las, sem ser obrigatório.

## Referências

- [O que é uma imagem](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/)
- [Tags de imagens](https://docs.docker.com/reference/cli/docker/image/tag/)

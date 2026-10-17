# Verificação da revisão — 17/10/2026

- Quartz processou 25 notas, incluindo 18 conceitos e as novas páginas de entrada.
- 10 testes de políticas aprovados.
- 5 testes de interface/modelo aprovados: geração dos três modelos, inserção de mídia, mapa com filtro/seleção, fluxo livre, falhas e rollback.
- 3 testes HTTP do laboratório aprovados.
- Títulos da aba e do artigo comparados com os metadados de todas as notas.
- Ausência de JSON de metadados no conteúdo verificada.
- Mapa amplo, imagens, links locais, recursos, editor e SEO verificados na saída.
- Seções de decisões e demandas removidas; URLs antigas redirecionadas.

A primeira entrega validava o build sem conferir o título efetivamente renderizado. Isso deixou passar o defeito do parser de metadados. Esta revisão adiciona essa verificação ao job de qualidade.

Limites: testes DOM e HTML não substituem inspeção visual em navegador. Não houve publicação remota nesta revisão; a conexão atual tem apenas leitura. O Dockerfile não foi executado nesta revisão. O simulador executa um modelo didático no navegador, não infraestrutura real.

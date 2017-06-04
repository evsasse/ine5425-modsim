# Drunk Simulator

O trabalho foi feito utilizando Javascript e React.
As bibliotecas [JSXGraph](http://jsxgraph.uni-bayreuth.de/wp/index.html) e [Chart.js](http://www.chartjs.org/)
foram usadas para o desenho dos gráficos.

O programa pode ser rodado apenas rodando o arquivo "index.html", todas as dependências necessárias já estão inseridas no arquivo.

Para gerar o arquivo novamente ou usar o modo de desenvolvimento, se necessário, é necessário instalar e rodar alguns comandos:

1. Instale a última versão do `nodejs`.
2. Instale a última versão do `yarn`, através do comando `npm install -g yarn`.
3. Baixe as dependências do projeto utilizado o `yarn`, com `yarn install`.
4. Construa o novo `index.html` com `yarn build`, ou acesse `localhost:8080` após rodar `yarn dev`.

## Documentação

### `Index.jsx`

É o arquivo principal do projeto. Ele mantêm as váriaveis de estado atual do programa que são:
o número de passos a ser simulados em cada repetição(`steps`),
o número de de repetições que serão feitas(`reps`),
se deve ou não mostrar o gráfico de dos caminhos(`drawPaths`),
se deve ou não mostrar o gráfico das distâncias(`drawDistances`),
os caminhos calculados(`paths`).
E coloca cada um dos elementos visuais na tela, o formulário, os gráficos, etc, passando à eles as váriaveis de estado atuais.

Mostrar ou não alguns gráficos é opcional pois apesar de não ser muito computacionalmente caro gerar muitos caminhos,
e caminhos muito longos, é demorado desenhá-los. Os caminhos e distâncias desenhados também são limitados a 10,
além de serem demorados, os gráficos ficam ilegíveis caso desenhamos muitos.

A função `process` é responsável por colocar novos caminhos nas váriaveis de estado do programa, logo após a inicialização,
e quando o formulário é submetido. Ela garante que as váriaveis `steps` e `reps` possuam valores válidos e chama a função
`createPath` do arquivo `utils/pathGenerator.js`.

### `DrunkForm.jsx`

![alt text](http://i.imgur.com/UoNKWGF.png "Imagem do formulário")

Contém o formulário para editar as váriaveis de estado `steps`, `reps`, `drawPaths` e `drawDistances`.
Também confirma a decisão do usuário de gerar o gráficos do caminhos no caso de haver mais de 100 passos,
e de gerar o gráfico de distâncias no caso de haver mais de 500 passos, por motivos de performance.

### `utils/pathGenerator.js`

Disponibiliza função `createPath`, usada no método `process` de `Index.jsx`. Essa função gera um novo caminho com `n` passos,
de acordo com a descrição do trabalho, onde um ângulo é sorteado a cada passo pela função `randomDelta`.

### `DiffHistogram.jsx`

![alt text](http://i.imgur.com/YXFeYWO.png "Imagem do histograma")

Mostra gráfico de histograma, conforme a descrição do trabalho, usando a biblioteca Chart.js.
Recebe as variáveis de estado, `paths` e `steps`, onde `paths` contém cada um dos caminhos calculados.
Pelo número de caminhos calculados obtemos o número de classes que o histograma deve conter.
E utilizando o teorema de pitágoras obtemos a distância da posição final, de cada caminho, até a origem,
e então a diferença para o valor esperado(`sqrt(steps)`).
O tamanho de cada classe é calculado usando as menores e maiores diferenças obtidas.

Cada um dos caminhos é então colocado em uma das classes. E o número de caminhos que foi colocado em cada classe,
assim como os valores mínimo e máximo de cada classe são utilizados para desenhar o gráfico.
Esse gráfico só é mostrado caso haja mais de uma classe, ou seja, o número de repetições seja pelo menos 4.

### `PathGraph.jsx`

![alt text](http://i.imgur.com/fMo8Mp9.png "Imagem dos caminhos")

Mostra o gráfico com os caminhos gerados. Apenas os 10 últimos caminhos são mostrados por questão de performance e legibilidade.
Utiliza a biblioteca JSXGraph. Possui problemas de performance no caso de caminhos com mais de 100 passos.
Também faz todo o seu trabalho apenas recebendo as váriveis de estado `steps` e `paths`. Os `steps` são usados para saber qual deve ser
"zoom" dado no gráfico. Cria um novo gráfico na tela e utiliza a função `drawPath` de `utils/graphDrawer.js` para cada caminho no gráfico.

Esse gráfico pode ser escondido mudando a váriavel `drawPaths` para falso. Permitindo o uso de valores maiores para o número de passos
com menos problemas de performance.

### `utils/graphDrawer.js`

Disponibiliza a função `drawPath` utilizanda por `PathGraph.jsx`, essa função chama as funções internas da biblioteca JSXGraph para
desenhar os pontos de cada passo e uma linha entre eles.

### `DistanceChart.jsx`

![alt text](http://i.imgur.com/2K0GpfY.png "Imagem das distâncias")

Mostra a comparação da distância em cada ponto de cada caminho e o esperado(`sqrt(n)`), utilizando a biblioteca Chart.js. Também mostra apenas os últimos 10 caminhos por questões de performance e legibilidade. Sofre de problemas de performance a partir de 500 passos. Para cada ponto de cada caminho é desenhado a distância da origem calculada pelo teorema de pitágoras.

### `DiffTable.jsx`

Mostra um tabela com as distâncias finais e a diferença para o valor esperado, para as últimas 100 repetições. A distância final de cada caminho é calculada pelo teorema de pitágoras.

const form = document.getElementById('novoItem')
const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem("itens")) || [] // meu array recebe Json parseado com os meus itens , uso o localStorage para pegar meus itens com o .getItem 

itens.forEach((elemento) => {
  criarElemento(elemento)
})


form.addEventListener('submit', (evento) => {
  evento.preventDefault() //prevenindo o comportamento padrão do formulario

  const nome = evento.target.elements['nome']
  const quantidade = evento.target.elements['quantidade']


  // saber se existe um item dentro da minha lista 

  const existe = itens.find(elemento => elemento.nome === nome.value) // essa linha estou verificando se existe um item na minha lista

  // criando objeto itemAtual em um objeto para inserir no locastorage
  const itemAtual = {
    "nome": nome.value,
    "quantidade": quantidade.value,
  }

  if (existe) {
    itemAtual.id = existe.id
    atualizaElemento(itemAtual)

    itens[existe.id] = itemAtual // sobreescrevendo o local storage 
  } else {
    itemAtual.id = itens.length
    //chamando a função cria elemento com os dados nome e quantidade
    criarElemento(itemAtual)
    //colocando os objetos(itemAtual) dentro do array itens // empurrando para o array
    itens.push(itemAtual)
  }
  //localstorage só lê string
  //converter o elemento objeto itemAtual em string "chave",valor
  localStorage.setItem("itens", JSON.stringify(itens))

  nome.value = ""
  quantidade.value = ""


})


//>>>>>>>>capturar as informações no input nome e quantidade

/* 1- dentro do meu evento.target[0].value pego o valor do input nome
   2- e dentro do meu evento.target[1].value
   pego o valor do input quantidade.*/
// esta FORMA NÃO É A MELHOR OPÇÃO DE SE FAZER

/*
a melhor forma é utilizar a busca dos inputs pelo nome em vez da posição fixa 

....
desta forma 

 console.log(evento.target.elements['quantidade'].value)

 uso dentro de target o element que é um objeto contendo essa estrutura 

 elements
[input#nome , input#quantidade ,input.cadastrar ]

*/

//>>>>>>criar elemento 
function criarElemento(item) {
  // cria nova tag (li)
  const novoItem = document.createElement('li')
  novoItem.classList.add('item') // adiciono a classe (.item) dentro da tag li


  //crio a tag (strong)   // que vai receber o valor quantidade
  const numeroItem = document.createElement('strong')
  numeroItem.innerHTML = item.quantidade
  numeroItem.dataset.id = item.id

  // a tag (li) criada vai receber o filho.appendChild (strong) com o seu valor
  novoItem.appendChild(numeroItem)
  novoItem.innerHTML += item.nome // e a tag (li) vai receber o valor nome

  novoItem.appendChild(botaoDeleta(item.id)) // novo item vai receber a função botaodeleta com o item id


  //lista 
  lista.appendChild(novoItem)







}

function atualizaElemento(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade
  //document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade

}

function botaoDeleta(id) {
  const elementobotao = document.createElement("button")
  elementobotao.innerText = 'X'


  elementobotao.addEventListener("click", function () {
    deletaElemento(this.parentNode, id)//deletando o filho da tag 
  })
  return elementobotao
}
function deletaElemento(tag, id) {
  tag.remove()
  itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

  localStorage.setItem("itens", JSON.stringify(itens))
}
// Essa lógica feita pelo Keppe e por mim faz com que o usuário que faça uma query apareça tanto na URL como também o remeta para a página de perfil.

const searchTerm = document.querySelector('#txtBusca')
const searchButton = document.querySelector('#btnBusca');
const originUrl = window.location.origin;

const performSearch = () => {
  // alterar usuario pela rota de pesquisa!
  const searchUrl = `${originUrl}/usuario?name=${searchTerm.value}`;
  window.location.replace(searchUrl);
}
// criação de evento para o botão de busca
searchButton.onclick = performSearch;
searchTerm.addEventListener('keypress', (e) => {
  if (e.key !== 'Enter') return;
  performSearch();
});
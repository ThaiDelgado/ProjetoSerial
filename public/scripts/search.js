const searchTerm = document.querySelector('#txtBusca')
const searchButton = document.querySelector('#btnBusca');
const originUrl = window.location.origin;

const performSearch = () => {
  // alterar usuario pela rota de pesquisa!
  const searchUrl = `${originUrl}/usuario?name=${searchTerm.value}`;
  window.location.replace(searchUrl);
}

searchButton.onclick = performSearch;
searchTerm.addEventListener('keypress', (e) => {
  if (e.key !== 'Enter') return;
  performSearch();
});
const API = "https://sistema-loja-api.onrender.com";

// Função padrão para todas requisições
async function apiFetch(url, options = {}) {

  // adiciona token automaticamente se existir
  const token = localStorage.getItem("token");

  options.headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(token && { Authorization: "Bearer " + token })
  };

  const res = await fetch(API + url, options);

  if (res.status === 401) {
    alert("Sessão inválida. Faça login novamente.");
    localStorage.removeItem("token");
    window.location.href = "login.html";
    return null;
  }

  return res.json();
}
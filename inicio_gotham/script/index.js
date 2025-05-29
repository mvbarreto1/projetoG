
function limparCamposLogin() {
  document.getElementById("user").value = "";
  document.getElementById("senha").value = "";
}

document.getElementById("forms").addEventListener("submit", async function enviar_dados(event) {
  event.preventDefault();
  console.log("Formulário enviado e preventDefault acionado.");

  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("senha").value.trim();


  const tipoRadio = document.querySelector('input[name="tipo"]:checked');
  if (!tipoRadio) {
      alert("Por favor, selecione o tipo de usuário.");
      return;
  }
  const tipo = tipoRadio.value;

  if (!user || !pass) {
      alert("Preencha todos os campos.");
      return;
  }

  const baseUrl = window.location.hostname.includes("localhost")
      ? "http://localhost:3000"
      : "https://api-restful-batman.onrender.com";

  const rota = tipo === "admin" ? `${baseUrl}/adm/login` : `${baseUrl}/users/login`;

  try {
      console.log("Enviando dados para:", rota);
      let msg = await consumo_api(user, pass, rota);

      console.log("Mensagem retornada:", msg);

      if (msg === "Acesso permitido") {
          window.location.href = tipo === "admin" ? "painel_adm.html" : "visualizacao_user.html";
      } else {
          alert(msg);
      }

      
      limparCamposLogin();

  } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      alert("Erro inesperado ao tentar fazer login.");
      limparCamposLogin(); 
  }
});

async function consumo_api(user, pass, rota) {
  try {
      console.log("Iniciando requisição...");
      const resposta = await fetch(rota, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuario: user, senha: pass }),
      });

      console.log("Status da resposta:", resposta.status);

      const textoResposta = await resposta.text();
      console.log("Resposta completa:", textoResposta);

      try {
          const dados = JSON.parse(textoResposta);
          return dados.message || "Erro: Resposta inesperada da API.";
      } catch (error) {
          console.error("Erro ao analisar resposta JSON:", error);
          return `Erro ao tentar fazer login. Resposta da API: ${textoResposta}`;
      }
  } catch (e) {
      console.error("Erro na requisição:", e);
      return "Erro ao tentar fazer login.";
  }
}

function limparCamposCadastro() {
  document.getElementById("novoUsuario").value = "";
  document.getElementById("novaSenha").value = "";
}

document.getElementById("cadastroForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const novoUsuario = document.getElementById("novoUsuario").value.trim();
  const novaSenha = document.getElementById("novaSenha").value.trim();
  const mensagem = document.getElementById("mensagem");

  if (!novoUsuario || !novaSenha) {
      mensagem.textContent = "Preencha todos os campos!";
      return;
  }

  const baseUrl = window.location.hostname.includes("localhost")
      ? "http://localhost:3000"
      : "https://api-restful-batman.onrender.com";

  const rotaCadastro = `${baseUrl}/users`;

  try {
      
      const cadastrar = await fetch(rotaCadastro, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuario: novoUsuario, senha: novaSenha })
      });

      const respostaCadastro = await cadastrar.json();

      if (cadastrar.ok) {
          mensagem.textContent = "Usuário cadastrado com sucesso!";
          mensagem.style.color = "green";

          
          limparCamposCadastro();
      } else {
          mensagem.textContent = `Erro ao cadastrar: ${respostaCadastro.message}`;
          mensagem.style.color = "red";
      }

  } catch (error) {
      mensagem.textContent = "Erro ao conectar-se ao servidor.";
      mensagem.style.color = "red";
      console.error("Erro:", error);

      limparCamposCadastro(); 
  }
});
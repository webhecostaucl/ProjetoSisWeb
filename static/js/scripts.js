class Pessoa {
  usuario;
  senha;
  perfil;

  constructor(usuario, senha, perfil) {
    this.usuario = usuario;
    this.senha = senha;
    this.perfil = perfil;
  }
}

showHello = () => {
  $(".formLogin").hide();
  $(".formCad").hide();

  $(".formHello").show();
};

showCad = () => {
  $(".formHello").hide();
  $(".formLogin").hide();
  
  $(".formCad").show();
};

showLogin = () => {
  $(".formCad").hide();
  $(".formHello").hide();

  $(".formLogin").show();

  document.getElementById("usuarioCad").value = "";
  document.getElementById("senhaCad").value = "";
  document.getElementById("perfilCad").value = "";
};

verificaCampos = (campo) => {
  if (campo.value) {
    return true;
  } else {
    campo.style.border = "1px solid red";
    campo.focus();
    alert(`O campo ${campo.attributes.name.value} não foi preenchido!`);
    return false;
  }
};

verificaDatalist = (campo) => {
  let datalist = document.getElementById(campo.attributes.list.value);

  for (let i = 0; i < datalist.children.length; i++) {
    if (datalist.children[i].value == campo.value && campo.value) {
      return true;
    }
  }

  campo.style.border = "1px solid red";
  campo.focus();
  alert(
    `O campo ${campo.attributes.name.value} não foi preenchid ou está em branco!`
  );
  return false;
};

validaLogin = (login, hash) => {
  let users = JSON.parse(localStorage.getItem("armazenado"));

  for (let i = 0; i < users.length; i++) {
    if (users[i].senha == hash && users[i].usuario == login) {
      return [users[i].usuario, users[i].perfil];
    }
  }

  return false;
};

login = () => {
  const login = document.getElementById("usuarioLogin");
  const senha = document.getElementById("senhaLogin");

  if (verificaCampos(login)) {
    if (verificaCampos(senha)) {
      //let result = validaLogin(login.value, md5(senha.value));
      const pack = {
        "usuario":login.value,
        "senha":md5(senha.value)
      }
      verifyLogin(JSON.stringify(pack));
    }
  }
};

cadPessoa = () => {
  const usuario = document.getElementById("usuarioCad");
  const senha = document.getElementById("senhaCad");
  const perfil = document.getElementById("perfilCad");

  if (verificaCampos(usuario)) {
    if (verificaCampos(senha)) {
      if (verificaDatalist(perfil)) {
        const pessoa = JSON.stringify(new Pessoa(
          usuario.value,
          md5(senha.value),
          perfil.value
        ));

        envioCad(pessoa);
      }
    }
  }
};

$(".forms").submit((e) => {
  e.preventDefault();
});

$(document).ready(() => {
  if (!localStorage.getItem("armazenado")) {
    localStorage.setItem("armazenado", JSON.stringify([]));
  }
});

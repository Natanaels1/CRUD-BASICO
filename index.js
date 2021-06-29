let dados = [];

function EditaRegistro(ID){
  $('#modalRegistro').modal('show');

  dados.forEach(function(item) {
    if(item.ID === ID) {
      $('#hdID').val(item.ID);
      $('#txtNome').val(item.Nome);
      $('#txtSobrenome').val(item.Sobrenome);
      $('#txtDtNascimento').val(item.DtNascimento.substr(6, 4) + "-" + 
      item.DtNascimento.substr(3, 2) + "-" + 
      item.DtNascimento.substr(0, 2));
      $('#txtCargo').val(item.Cargo);
    }
  })
};

//Executa ao carregar na tela
function carregar() {
  
  if(JSON.parse(localStorage.getItem("__dados__")) === null) {
   localStorage.setItem("__dados__", JSON.stringify(dados));
  }

  dados = JSON.parse(localStorage.getItem("__dados__"));

  if (dados) {
    PopulaTabela();
  }

    document.querySelector("#btnSalvar").addEventListener("click", function salvar() {
      //CAPTURANDO VALORES DOS CAMPOS DO MODAL DE CADASTRO
      let _id = $('#hdID').val();

      let nome = document.querySelector("#txtNome").value;
      let sobrenome = document.querySelector("#txtSobrenome").value;
      let dtNascimento = new Date($("#txtDtNascimento").val()).toLocaleDateString("pt-BR", { timeZone: "UTC" });
      let cargo = document.querySelector("#txtCargo").value;
      
      //ARMAZENANDO NA VARIAVEL PRINCIPAL

      if(!_id || _id == "0") {
        let registro = {};

        registro.Nome = nome;
        registro.Sobrenome = sobrenome;
        registro.DtNascimento = dtNascimento;
        registro.Cargo = cargo;

        registro.ID = dados.length + 1;
        dados.push(registro)

      } else {
        dados.forEach(function(item) {
           if(item.ID == _id ) {
             item.Nome = nome;
             item.Sobrenome = sobrenome;
             item.DtNascimento = dtNascimento;
             item.Cargo = cargo;
           }
        });
      };

      $("#modalRegistro").modal("hide");
      
      //LIMPAR CAMPOS DO MODAL
      $('#hdID').val('0');
      document.querySelector("#txtNome").value = "";
      document.querySelector("#txtSobrenome").value = "";
      document.querySelector("#txtDtNascimento").value = "";
      document.querySelector("#txtCargo").value = "";

      PopulaTabela();
    });
}

function PopulaTabela() {
  if (Array.isArray(dados)) {
    localStorage.setItem("__dados__", JSON.stringify(dados));

    document.querySelector("#tblDados tbody").innerHTML = '';

    dados.forEach(function (item) {
      $("#tblDados tbody").append(`
            <tr>
                <td>${item.ID}</td>
                <td>${item.Nome}</td>
                <td>${item.Sobrenome}</td>
                <td>${item.DtNascimento}</td>
                <td>${item.Cargo}</td>
                <td><button type="button" class="btn btn-secondary" onclick="javascript: EditaRegistro(${item.ID})"><i class="fas fa-edit"></i></button></td>
                <td><button type="button" class="btn btn-danger" onclick="javascript: ApagaRegistro(${item.ID})"><i class="fas fa-trash"></i></button></td>
            </tr>
      `);
    });
  }
}

function ApagaRegistro(ID) {
  let _confirm = confirm('Tem certeza que deseja excluir este funcionario?');

  if(_confirm) {
    for(let i = 0; i < dados.length; i++){
      if(dados[i].ID === ID) {
        dados.splice(i, 1);
      };
    };

    PopulaTabela()
  };
};
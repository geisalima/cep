$(document).ready(function(){

	// BUSCA CEP AO PERDER O FOCO DO CAMPO
	$("#cep").blur(function() {
		if ( $("#cep").val() != '' ) {
			buscarCep();
		}
	});

	// BUSCA CEP AO TENTAR ENVIAR
	$(".enviar").click(function() {
		if ( $("#cep").val() != '' ) {
			buscarCep();
		}
	});

	// LIMPA CAMPOS DO FORM
	$(".limpar").click(function(){
		$(".form-cep input").val("");
	});

	// VALIDANDO FORM
	var validator = $('#formCep').validate({
		rules: {
			cep: {
				required: true,
				minlength: 8,
			},
		},
		messages:{
			cep:{
				required: "Por favor, preencha o cep",
				minlength: "O CEP deve conter 8 caracteres"
			}
		}
	});

	$.validator.addMethod("cRequired", $.validator.methods.required, "Campo obrigatório");
	$.validator.addClassRules("form-control", { cRequired: true });

	// FUNCAO PARA BUSCAR CEP
	function buscarCep() {
		var cep = $('#cep').val();
		axios.get(`http://api.postmon.com.br/v1/cep/${cep}`)
		.then(response => {
			$("#estado").val(response.data.estado)
			$("#cidade").val(response.data.cidade)
			$("#bairro").val(response.data.bairro)
			$("#rua").val(response.data.logradouro)
			$(".alert.alert-danger").hide();
			validator.destroy();
		})
		.catch(error => {
			$(".alert.alert-danger").show().text('CEP não encontrado');
			console.log(error);
		})
	}

});
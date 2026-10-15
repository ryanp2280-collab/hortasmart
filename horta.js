// HortaSmart
var limite_padrao = 40, canteiros = [];
const el = id => document.getElementById(id);

function carregarCanteiros() {
  canteiros = JSON.parse(localStorage.getItem("canteiros") || "[]");
}

function salvarNoNavegador() {
  localStorage.setItem("canteiros", JSON.stringify(canteiros));
}

function listarCanteiros() {
  var tabela = el("tabela-canteiros"), select = el("canteiro"), escolhido = select.value;
  tabela.innerHTML = canteiros.length ? "" : '<tr><td colspan="4" class="vazio">Nenhum canteiro cadastrado.</td></tr>';
  select.innerHTML = '<option value="">Padrão (mínimo 40%)</option>';

  canteiros.forEach(c => {
    tabela.innerHTML += `<tr><td>${c.nome}</td><td>${c.planta}</td><td>${c.limite}%</td><td class="acoes"><button type="button" class="mini editar" onclick="editarCanteiro(${c.id})">Editar</button><button type="button" class="mini excluir" onclick="excluirCanteiro(${c.id})">Excluir</button></td></tr>`;
    select.innerHTML += `<option value="${c.id}">${c.nome} (${c.planta})</option>`;
  });

  select.value = escolhido;
  if (select.value !== escolhido) select.value = "";
  atualizarLimite();
}

function salvarCanteiro() {
  var id = el("canteiro-id").value, nome = el("c-nome").value.trim(), planta = el("c-planta").value.trim(), limite = parseInt(el("c-limite").value);
  el("erro-canteiro").innerHTML = (!nome || !planta) ? "Preencha nome e planta." : (isNaN(limite) || limite < 0 || limite > 100) ? "Umidade inválida (0-100)." : "";
  if (el("erro-canteiro").innerHTML) return;

  if (!id) canteiros.push({ id: Date.now(), nome, planta, limite });
  else canteiros = canteiros.map(c => c.id == id ? { id: c.id, nome, planta, limite } : c);

  salvarNoNavegador(); cancelarEdicao(); listarCanteiros();
}

function editarCanteiro(id) {
  var c = canteiros.find(item => item.id == id);
  if (!c) return;
  el("canteiro-id").value = c.id;
  el("c-nome").value = c.nome;
  el("c-planta").value = c.planta;
  el("c-limite").value = c.limite;
  el("botao-salvar").innerHTML = "Salvar alterações";
  el("botao-cancelar").style.display = "block";
  el("c-nome").focus();
}

function cancelarEdicao() {
  el("canteiro-id").value = "";
  el("c-nome").value = "";
  el("c-planta").value = "";
  el("c-limite").value = 40;
  el("erro-canteiro").innerHTML = "";
  el("botao-salvar").innerHTML = "Cadastrar canteiro";
  el("botao-cancelar").style.display = "none";
}

function excluirCanteiro(id) {
  if (!confirm("Excluir canteiro?")) return;
  canteiros = canteiros.filter(c => c.id != id);
  if (el("canteiro-id").value == id) cancelarEdicao();
  salvarNoNavegador(); listarCanteiros();
}

const canteiroAtual = () => canteiros.find(c => c.id == el("canteiro").value) || null;
const limiteAtual = () => (canteiroAtual() || {}).limite ?? limite_padrao;

function atualizarLimite() {
  var l = limiteAtual();
  el("linha-solo").style.bottom = l + "%";
  el("legenda-solo").innerHTML = `mínimo ${l}%`;
}

function trocarCanteiro() { atualizarLimite(); }

function valorParaBarra(id) {
  var v = parseInt(el(id).value);
  return isNaN(v) ? 0 : Math.max(0, Math.min(100, v));
}

function atualizarBarras() {
  var solo = valorParaBarra("umidade"), agua = valorParaBarra("agua");
  el("barra-solo").style.height = solo + "%";
  el("texto-solo").innerHTML = solo + "%";
  el("barra-agua").style.height = agua + "%";
  el("texto-agua").innerHTML = agua + "%";
  el("barra-agua").className = `enchimento agua ${agua < 20 ? "baixo" : ""}`;
}

function mostrarValvula(aberta) {
  el("valvula").className = `valvula ${aberta ? "aberta" : ""}`;
  el("texto-valvula").innerHTML = aberta ? "Aberta" : "Fechada";
}

function registrar(texto, umidade, nivel_agua) {
  var lista = el("historico"), vazio = lista.querySelector(".vazio");
  if (vazio) lista.removeChild(vazio);
  var nome = (canteiroAtual() || {}).nome || "Padrão";
  var hora = new Date().toLocaleTimeString("pt-BR");
  lista.insertAdjacentHTML("afterbegin", `<li><b>${hora}</b> - <span>${texto}</span><br><small>${nome} | Solo: ${umidade}% | Reservatório: ${nivel_agua}%</small></li>`);
}

function limparHistorico() {
  el("historico").innerHTML = '<li class="vazio">Nenhuma verificação ainda.</li>';
}

function reabastecer() {
  el("agua").value = 100;
  atualizarBarras();
  el("alerta").innerHTML = "";
  el("resultado").className = "";
  el("resultado").innerHTML = "Reservatório reabastecido: 100%.";
}

function verificar() {
  var umidade = parseInt(el("umidade").value), nivel_agua = parseInt(el("agua").value), limite = limiteAtual();
  el("alerta").innerHTML = "";

  if (isNaN(umidade) || isNaN(nivel_agua)) {
    el("resultado").className = "erro";
    el("resultado").innerHTML = "Erro: digite apenas números.";
    return;
  }
  if (umidade < 0 || umidade > 100 || nivel_agua < 0 || nivel_agua > 100) {
    el("resultado").className = "erro";
    el("resultado").innerHTML = "Digite valores entre 0 e 100.";
    return;
  }

  if (nivel_agua < 20) el("alerta").innerHTML = "ALERTA: Reservatório com pouca água!";

  if (umidade < limite && nivel_agua >= 20) 
    el("resultado").className = "irrigando";
    el("resultado").innerHTML = "Solo seco! Irrigação ligada...";
    mostrarValvula(true);
    el("botao").disabled = true;

    setTimeout(() => 
      nivel_agua = Math.max)}
    
    ;

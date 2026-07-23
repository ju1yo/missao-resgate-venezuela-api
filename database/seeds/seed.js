/**
 * Script de seed - insere dados 100% FICTÍCIOS no banco de dados
 * para fins acadêmicos. Nenhum nome, foto, telefone ou endereço aqui
 * corresponde a pessoas reais.
 */
require('dotenv').config();
const db = require('../../src/config/database');

function limparTabelas() {
  db.exec('DELETE FROM avistamentos; DELETE FROM locais_apoio; DELETE FROM pessoas;');
  db.exec("DELETE FROM sqlite_sequence WHERE name IN ('avistamentos', 'locais_apoio', 'pessoas');");
}

const nomesFicticios = [
  'Carlos Fictício Mendoza', 'Maria Exemplo Rodríguez', 'João Teste Pérez', 'Ana Simulada García',
  'Pedro Fictício López', 'Luisa Exemplo Fernández', 'Miguel Teste Torres', 'Camila Simulada Ramírez',
  'Rafael Fictício Herrera', 'Valentina Exemplo Castro', 'Diego Teste Morales', 'Sofía Simulada Ortiz',
  'Andrés Fictício Silva', 'Isabela Exemplo Rojas', 'Fernando Teste Gómez', 'Gabriela Simulada Vargas',
  'Ricardo Fictício Cruz', 'Daniela Exemplo Reyes', 'Eduardo Teste Molina', 'Paula Simulada Aguilar',
];

const locaisFicticios = [
  'Setor Fictício Norte', 'Bairro Exemplo Central', 'Zona Teste Sul', 'Distrito Simulado Leste',
  'Vila Fictícia Alta', 'Setor Exemplo Rio', 'Zona Teste Vale', 'Comunidade Simulada Verde',
];

const statusPossiveis = ['desaparecido', 'encontrado_vivo', 'encontrado_falecido', 'em_verificacao'];

function dataAleatoria(diasAtras) {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * diasAtras));
  return d.toISOString().slice(0, 10);
}

function seedPessoas() {
  const stmt = db.prepare(`
    INSERT INTO pessoas (
      nome, idade, sexo, data_desaparecimento, local_desaparecimento,
      descricao_fisica, foto_url, status, nome_contato_familiar, telefone_contato_familiar
    ) VALUES (@nome, @idade, @sexo, @data_desaparecimento, @local_desaparecimento,
      @descricao_fisica, @foto_url, @status, @nome_contato_familiar, @telefone_contato_familiar)
  `);

  const ids = [];
  for (let i = 0; i < 20; i += 1) {
    const info = stmt.run({
      nome: nomesFicticios[i],
      idade: 5 + Math.floor(Math.random() * 80),
      sexo: i % 2 === 0 ? 'feminino' : 'masculino',
      data_desaparecimento: dataAleatoria(60),
      local_desaparecimento: locaisFicticios[i % locaisFicticios.length],
      descricao_fisica: 'Descrição física fictícia gerada para fins acadêmicos.',
      foto_url: 'https://via.placeholder.com/150?text=Foto+Ficticia',
      status: statusPossiveis[i % statusPossiveis.length],
      nome_contato_familiar: 'Familiar Fictício ' + (i + 1),
      telefone_contato_familiar: '0000-000' + String(i).padStart(2, '0'),
    });
    ids.push(info.lastInsertRowid);
  }
  return ids;
}

function seedAvistamentos(idsPessoas) {
  const stmt = db.prepare(`
    INSERT INTO avistamentos (pessoa_id, data_avistamento, local_avistamento, descricao, nome_testemunha, contato_testemunha)
    VALUES (@pessoa_id, @data_avistamento, @local_avistamento, @descricao, @nome_testemunha, @contato_testemunha)
  `);

  for (let i = 0; i < 15; i += 1) {
    stmt.run({
      pessoa_id: idsPessoas[i % idsPessoas.length],
      data_avistamento: dataAleatoria(30),
      local_avistamento: locaisFicticios[(i + 2) % locaisFicticios.length],
      descricao: 'Relato de avistamento fictício para fins acadêmicos.',
      nome_testemunha: 'Testemunha Fictícia ' + (i + 1),
      contato_testemunha: '0000-111' + String(i).padStart(2, '0'),
    });
  }
}

function seedLocaisApoio() {
  const tipos = ['abrigo', 'hospital', 'centro_atendimento', 'ponto_distribuicao'];
  const stmt = db.prepare(`
    INSERT INTO locais_apoio (nome, tipo, endereco, capacidade, contato)
    VALUES (@nome, @tipo, @endereco, @capacidade, @contato)
  `);

  for (let i = 0; i < 10; i += 1) {
    stmt.run({
      nome: `Local de Apoio Fictício ${i + 1}`,
      tipo: tipos[i % tipos.length],
      endereco: `Endereço Fictício, ${i + 1} - ${locaisFicticios[i % locaisFicticios.length]}`,
      capacidade: 20 + i * 5,
      contato: '0000-222' + String(i).padStart(2, '0'),
    });
  }
}

function run() {
  limparTabelas();
  const idsPessoas = seedPessoas();
  seedAvistamentos(idsPessoas);
  seedLocaisApoio();
  console.log('Seed concluído: 20 pessoas, 15 avistamentos e 10 locais de apoio (todos fictícios).');
}

run();

// Testes das datas móveis do devocional Fala, Alma.  Rodar: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pascoa, semanaSanta, leiturasEspeciais, nesimoDomingo } from '../src/data/falaAlma/datasMoveis.ts';

const fmt = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Datas oficiais da Páscoa (calendário gregoriano, igrejas ocidentais)
const PASCOAS = {
  2027: '2027-03-28', 2028: '2028-04-16', 2029: '2029-04-01', 2030: '2030-04-21', 2031: '2031-04-13',
  2032: '2032-03-28', 2033: '2033-04-17', 2034: '2034-04-09', 2035: '2035-03-25',
};

test('Páscoa de 2027 a 2035', () => {
  for (const [ano, esperado] of Object.entries(PASCOAS)) assert.equal(fmt(pascoa(Number(ano))), esperado, `Páscoa ${ano}`);
});

test('Semana Santa vai do Domingo de Ramos à Páscoa', () => {
  for (const ano of Object.keys(PASCOAS).map(Number)) {
    const dias = semanaSanta(ano);
    assert.equal(dias.length, 8);
    assert.equal(dias[0].getDay(), 0, 'Ramos é domingo');
    assert.equal(fmt(dias[7]), PASCOAS[ano]);
    assert.equal(leiturasEspeciais(dias[5])[0].leitura, 'Sl 22', 'Sexta-feira da Paixão = Sl 22');
    assert.equal(leiturasEspeciais(dias[7])[0].leitura, 'Sl 16', 'Páscoa = Sl 16');
  }
});

test('Banner só aparece na Semana Santa', () => {
  const ramos = semanaSanta(2028)[0];
  const vespera = new Date(ramos.getFullYear(), ramos.getMonth(), ramos.getDate() - 1);
  const depois = new Date(ramos.getFullYear(), ramos.getMonth(), ramos.getDate() + 8);
  assert.equal(leiturasEspeciais(vespera).filter(l => l.id.startsWith('semana-santa')).length, 0);
  assert.equal(leiturasEspeciais(depois).filter(l => l.id.startsWith('semana-santa')).length, 0);
});

test('Dia das Mães e Dia dos Pais (2º domingo de maio e de agosto)', () => {
  assert.equal(fmt(nesimoDomingo(2027, 4, 2)), '2027-05-09');
  assert.equal(fmt(nesimoDomingo(2027, 7, 2)), '2027-08-08');
  assert.equal(leiturasEspeciais(new Date(2027, 4, 9))[0].leitura, 'Sl 127');
  assert.equal(leiturasEspeciais(new Date(2027, 7, 8))[0].leitura, 'Sl 103.13');
});

test('Plano anual: datas-chave e totais', () => {
  const plano = JSON.parse(readFileSync(new URL('../src/data/falaAlma/plano-anual-salmos.json', import.meta.url), 'utf-8'));
  const por = Object.fromEntries(plano.map(e => [e.data, e]));
  assert.equal(por['01-01'].leitura, 'Sl 1');
  assert.equal(por['10-31'].leitura, 'Sl 119.169-176');
  assert.equal(por['12-25'].leitura, 'Sl 110');
  assert.equal(por['12-31'].leitura, 'Sl 150');
  assert.equal(por['02-29'].tipo, 'selah_bonus');
  assert.equal(por['02-29'].dia_do_ano, null);
  for (const e of plano) {
    const dia = Number(e.data.slice(3));
    const mes = Number(e.data.slice(0, 2));
    if (e.tipo === 'selah_bonus') continue;
    if ([7, 14, 21, 28].includes(dia)) assert.equal(e.tipo, 'selah', e.data);
    else if (dia >= 29) assert.equal(e.tipo, mes === 10 || mes === 12 ? 'devocional' : 'colheita', e.data);
    else assert.equal(e.tipo, 'devocional', e.data);
  }
  const total = t => plano.filter(e => e.tipo === t).length;
  assert.deepEqual([total('devocional'), total('selah'), total('colheita'), total('selah_bonus')], [294, 48, 23, 1]);
});

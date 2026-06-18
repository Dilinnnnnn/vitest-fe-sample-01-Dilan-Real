import { describe, expect, it } from 'vitest';
import { formatearTexto, validarTexto } from '../../src/js/utils/texto.js';

// ============================================================
// Pruebas unitarias para validarTexto
// ============================================================
describe('validarTexto', () => {
  // --- Casos válidos ---
  it('debe retornar válido para un texto con 3 o más caracteres', () => {
    const resultado = validarTexto('Comprar pan');
    expect(resultado.valido).toBe(true);
    expect(resultado.error).toBe('');
  });

  it('debe retornar válido para un texto con exactamente 3 caracteres', () => {
    const resultado = validarTexto('ABC');
    expect(resultado.valido).toBe(true);
  });

  it('debe retornar válido para un texto con 200 caracteres (límite)', () => {
    const texto = 'A'.repeat(200);
    const resultado = validarTexto(texto);
    expect(resultado.valido).toBe(true);
  });


});

// ============================================================
// Pruebas unitarias para formatearTexto
// ============================================================
describe('formatearTexto', () => {
  it('debe convertir la primera letra a mayúscula y el resto a minúscula', () => {
    const resultado = formatearTexto('hOLA MUNDO');
    expect(resultado).toBe('Hola mundo');
  });

  it('debe retornar un string vacío si se ingresa un string vacío', () => {
    const resultado = formatearTexto('');
    expect(resultado).toBe('');
  });

  //--Validar los casos invalidos --

  it('debe retornar invalido cuando el texto esta vacio', () => {
    const resultado = validarTexto('');
    expect(resultado.valido).toBe(false);
    expect(resultado.error).toBe('vacío.');
});

it ('debe retornar invalido cuando el texto es menor a 3 caracteres', () => {
  const resultado = validarTexto('Hi');
  expect(resultado.valido).toBe(false);
  expect(resultado.error).toBe('menos 3');
});

it('debe retornar un string vacio si solo hay espacios', () => {
  const resultado = formatearTexto('   ');
  expect(resultado).toBe('');
});


// ============================================================
// Pruebas adicionales — Tarea 1
// ============================================================
describe('Pruebas adicionales — Tarea 1', () => {
  // validarTexto: texto con caracteres especiales (emojis, tildes, eñes).
  it('validarTexto debe retornar válido para texto con caracteres especiales (tildes, ñ)', () => {
    const resultado = validarTexto('Comprár pán ñandú');
    expect(resultado.valido).toBe(true);
    expect(resultado.error).toBe('');
  });

  it('validarTexto debe retornar válido para texto con emojis', () => {
    const resultado = validarTexto('😊 Hola Mundo');
    expect(resultado.valido).toBe(true);
    expect(resultado.error).toBe('');
  });

  // validarTexto: texto que contiene exactamente 3 espacios y luego una letra (ej. "   A").
  it('validarTexto debe retornar válido para texto con 3 espacios iniciales y una letra', () => {
    const resultado = validarTexto('   A');
    expect(resultado.valido).toBe(true);
    expect(resultado.error).toBe('');
  });

  // formatearTexto: texto con caracteres especiales como "árbol" (debe resultar en "Árbol").
  it('formatearTexto debe formatear correctamente texto con tildes', () => {
    const resultado = formatearTexto('árbol');
    expect(resultado).toBe('Árbol');
  });

  it('formatearTexto debe formatear correctamente texto con eñes', () => {
    const resultado = formatearTexto('ñandú');
    expect(resultado).toBe('Ñandú');
  });

  // formatearTexto: texto que ya está correctamente formateado (no debe alterarse).
  it('formatearTexto no debe alterar texto ya correctamente formateado', () => {
    const resultado = formatearTexto('Hola mundo');
    expect(resultado).toBe('Hola mundo');
  });
});
});

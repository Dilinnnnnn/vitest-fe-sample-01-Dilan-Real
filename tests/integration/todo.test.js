import { beforeEach, describe, expect, it } from 'vitest';
import {
  actualizarContador,
  agregarTarea,
  alternarTarea,
  crearTareaElemento,
  eliminarTarea,
  limpiarCompletadas,
  mostrarError,
} from '../../src/js/dom/todo.js';

// Helper: crea una lista <ul> fresca para cada prueba
function crearLista() {
  return document.createElement('ul');
}

// ============================================================
// Pruebas de integración — manipulación del DOM
// ============================================================
describe('crearTareaElemento', () => {
  it('debe crear un elemento <li> con la clase "tarea-item"', () => {
    const li = crearTareaElemento('Test');
    expect(li.tagName).toBe('LI');
    expect(li.classList.contains('tarea-item')).toBe(true);
  });

  
});

describe('agregarTarea', () => {
  let lista;

  beforeEach(() => {
    lista = crearLista();
  });

  it('debe agregar un <li> a la lista cuando el texto es válido', () => {
    const resultado = agregarTarea('Aprender vitest', lista);
    expect(resultado.exito).toBe(true);
    expect(lista.children.length).toBe(1);
    expect(lista.querySelector('.tarea-texto').textContent).toBe('Aprender vitest');
  });

  
});

describe('eliminarTarea', () => {
  it('debe eliminar el elemento <li> del DOM', () => {
    const lista = crearLista();
    agregarTarea('Tarea a eliminar', lista);
    const li = lista.querySelector('.tarea-item');

    eliminarTarea(li);
    expect(lista.children.length).toBe(0);
  });
});

describe('alternarTarea', () => {
  it('debe agregar la clase "completada" cuando el checkbox está marcado', () => {
    const li = crearTareaElemento('Tarea test');
    const checkbox = li.querySelector('.tarea-checkbox');
    checkbox.checked = true;

    alternarTarea(li, checkbox);
    expect(li.classList.contains('completada')).toBe(true);
  });

  
});

describe('limpiarCompletadas', () => {
  it('debe eliminar solo las tareas completadas', () => {
    const lista = crearLista();
    agregarTarea('Tarea pendiente', lista);
    agregarTarea('Tarea completada', lista);

    // Marcar la segunda como completada
    const items = lista.querySelectorAll('.tarea-item');
    const checkbox = items[1].querySelector('.tarea-checkbox');
    checkbox.checked = true;
    alternarTarea(items[1], checkbox);

    const eliminadas = limpiarCompletadas(lista);
    expect(eliminadas).toBe(1);
    expect(lista.children.length).toBe(1);
    expect(lista.querySelector('.tarea-texto').textContent).toBe('Tarea pendiente');
  });

  
});

describe('actualizarContador', () => {
  it('debe mostrar "0 tareas" cuando la lista está vacía', () => {
    const lista = crearLista();
    const contenedor = document.createElement('span');

    actualizarContador(lista, contenedor);
    expect(contenedor.textContent).toBe('0 tareas');
  });

  it('debe mostrar "1 tarea" cuando hay exactamente un elemento', () => {
    const lista = crearLista();
    agregarTarea('Única tarea', lista);
    const contenedor = document.createElement('span');

    actualizarContador(lista, contenedor);
    expect(contenedor.textContent).toBe('1 tarea');
  });

  
});

describe('mostrarError', () => {
  it('debe establecer el texto del contenedor con el mensaje de error', () => {
    const contenedor = document.createElement('div');
    mostrarError('Error de prueba', contenedor);
    expect(contenedor.textContent).toBe('Error de prueba');
  });

  it('debe formatear el texto antes de agregarlo', () => {
    agregarTarea('esTuDiaR VeRiFiCaciON De Sw', lista);
    const span = lista.querySelector('.tarea-texto');
    expect(span.textContent).toBe('Estudiar verificación de sw');
  });

  
});

// ============================================================
// Pruebas adicionales — Tarea 2
// ============================================================
describe('Pruebas adicionales — Tarea 2', () => {
  // 1. Verificar que al hacer clic en el botón de eliminar de un elemento creado con `crearTareaElemento`, el elemento se elimina de la lista.
  it('debe eliminar el elemento de la lista al hacer clic en el botón de eliminar', () => {
    const lista = crearLista();
    agregarTarea('Tarea a eliminar', lista);
    const li = lista.querySelector('.tarea-item');
    const btnEliminar = li.querySelector('.btn-eliminar');

    // Simular clic en el botón de eliminar
    btnEliminar.click();

    expect(lista.children.length).toBe(0);
  });

  // 2. Verificar que el evento `change` del checkbox alterna correctamente la clase `completada` (simulando un clic real con `dispatchEvent`).
  it('debe alternar la clase "completada" en el elemento <li> cuando el checkbox cambia', () => {
    const li = crearTareaElemento('Tarea con checkbox');
    const checkbox = li.querySelector('.tarea-checkbox');

    // Marcar el checkbox y despachar evento
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    expect(li.classList.contains('completada')).toBe(true);

    // Desmarcar el checkbox y despachar evento
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
    expect(li.classList.contains('completada')).toBe(false);
  });

  // 3. Probar `agregarTarea` con un texto de exactamente 200 caracteres (debe ser exitoso).
  it('debe agregar una tarea con exactamente 200 caracteres de texto', () => {
    const lista = crearLista();
    const textoLargo = 'A'.repeat(200);
    const resultado = agregarTarea(textoLargo, lista);

    expect(resultado.exito).toBe(true);
    expect(lista.children.length).toBe(1);
    expect(lista.querySelector('.tarea-texto').textContent).toBe(textoLargo);
  });

  // 4. Probar `limpiarCompletadas` cuando **todas** las tareas están completadas (la lista debe quedar vacía).
  it('debe eliminar todas las tareas cuando todas están completadas', () => {
    const lista = crearLista();
    agregarTarea('Tarea 1', lista);
    agregarTarea('Tarea 2', lista);

    // Marcar ambas como completadas
    lista.querySelectorAll('.tarea-item').forEach(item => {
      const checkbox = item.querySelector('.tarea-checkbox');
      checkbox.checked = true;
      alternarTarea(item, checkbox);
    });

    const eliminadas = limpiarCompletadas(lista);
    expect(eliminadas).toBe(2);
    expect(lista.children.length).toBe(0);
  });
});

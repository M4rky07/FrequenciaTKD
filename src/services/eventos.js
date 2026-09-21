const listeners = [];

export function adicionarListener(
  listener
) {
  listeners.push(listener);

  return function removerListener() {
    const indice =
      listeners.indexOf(listener);

    if (indice !== -1) {
      listeners.splice(indice, 1);
    }
  };
}

export function emitirEvento(
  evento
) {
  listeners.forEach(
    (listener) => {
      listener(evento);
    }
  );
}
export function calcularEstatisticas(alunoId, chamadas) {
  let presencas = 0;
  let faltas = 0;

  chamadas.forEach((chamada) => {
    chamada.registros.forEach((registro) => {
      if (registro.alunoId === alunoId) {
        if (registro.presente) {
          presencas++;
        } else {
          faltas++;
        }
      }
    });
  });

  return {
    presencas,
    faltas,
  };
}
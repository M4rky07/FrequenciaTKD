export function calcularFrequenciaMes(
  chamadas,
  alunoId,
  mes,
  ano
) {
  let presencas = 0;
  let faltas = 0;

  chamadas.forEach((chamada) => {
    const [anoDaChamada, mesDaChamada] =
      chamada.data.split('-').map(Number);

    const mesmaData =
      anoDaChamada === ano &&
      mesDaChamada - 1 === mes;

    if (!mesmaData) {
      return;
    }

    if (!Array.isArray(chamada.registros)) {
      return;
    }

    const registro =
      chamada.registros.find(
        (item) => item.alunoId === alunoId
      );

    if (!registro) {
      return;
    }

    if (registro.presente) {
      presencas++;
    } else {
      faltas++;
    }
  });

  const total =
    presencas + faltas;

  const frequencia =
    total > 0
      ? (presencas / total) * 100
      : 0;

  return {
    presencas,
    faltas,
    total,
    frequencia,
  };
}

export function calcularFrequenciaAnual(
  chamadas,
  alunoId,
  ano
) {
  let presencas = 0;
  let faltas = 0;

  chamadas.forEach((chamada) => {
    const [anoDaChamada] =
      chamada.data.split('-').map(Number);

    if (anoDaChamada !== ano) {
      return;
    }

    if (!Array.isArray(chamada.registros)) {
      return;
    }

    const registro =
      chamada.registros.find(
        (item) => item.alunoId === alunoId
      );

    if (!registro) {
      return;
    }

    if (registro.presente) {
      presencas++;
    } else {
      faltas++;
    }
  });

  const total =
    presencas + faltas;

  const frequencia =
    total > 0
      ? (presencas / total) * 100
      : 0;

  return {
    presencas,
    faltas,
    total,
    frequencia,
  };
}

export function calcularFrequenciaTotal(
  chamadas,
  alunoId
) {
  let presencas = 0;
  let faltas = 0;

  chamadas.forEach((chamada) => {
    if (!Array.isArray(chamada.registros)) {
      return;
    }

    const registro =
      chamada.registros.find(
        (item) => item.alunoId === alunoId
      );

    if (!registro) {
      return;
    }

    if (registro.presente) {
      presencas++;
    } else {
      faltas++;
    }
  });

  const total =
    presencas + faltas;

  const frequencia =
    total > 0
      ? (presencas / total) * 100
      : 0;

  return {
    presencas,
    faltas,
    total,
    frequencia,
  };
}
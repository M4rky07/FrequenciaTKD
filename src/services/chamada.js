export function criarChamada(
  chamadas,
  data,
  turma,
  registros
) {
  const chamadaExistente =
    chamadas.find(
      (chamada) =>
        chamada.data === data &&
        chamada.turma === turma
    );

  if (
    chamadaExistente
  ) {
    return chamadas.map(
      (chamada) => {
        if (
          chamada.id !==
          chamadaExistente.id
        ) {
          return chamada;
        }

        return {
          ...chamada,
          turma,
          registros,
        };
      }
    );
  }

  const novaChamada = {
    id: Date.now(),
    data,
    turma,
    registros,
  };

  return [
    ...chamadas,
    novaChamada,
  ];
}

export function atualizarChamada(
  chamadas,
  chamadaId,
  registros
) {
  return chamadas.map(
    (chamada) => {
      if (
        chamada.id !==
        chamadaId
      ) {
        return chamada;
      }

      return {
        ...chamada,
        registros,
      };
    }
  );
}

export function excluirChamada(
  chamadas,
  chamadaId
) {
  return chamadas.filter(
    (chamada) =>
      chamada.id !==
      chamadaId
  );
}
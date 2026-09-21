export function criarAluno(
  alunos,
  nome,
  graduacao,
  turma
) {
  const novoAluno = {
    id: Date.now(),
    nome: nome.trim(),
    graduacao: graduacao.trim(),
    turma,
    presencas: 0,
    faltas: 0,
  };

  return [
    ...alunos,
    novoAluno,
  ];
}

export function editarAluno(
  alunos,
  alunoId,
  nome,
  graduacao,
  turma
) {
  return alunos.map(
    (aluno) => {
      if (
        aluno.id !== alunoId
      ) {
        return aluno;
      }

      return {
        ...aluno,
        nome: nome.trim(),
        graduacao: graduacao.trim(),
        turma,
      };
    }
  );
}

export function excluirAluno(
  alunos,
  alunoId
) {
  return alunos.filter(
    (aluno) =>
      aluno.id !== alunoId
  );
}
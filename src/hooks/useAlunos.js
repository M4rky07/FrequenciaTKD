import {
  useCallback,
  useState,
} from 'react';

import alunosIniciais from '../Data/alunos.json';

import {
  carregarAlunos,
  salvarAlunos,
} from '../services/storage';

import {
  criarAluno,
  editarAluno,
  excluirAluno,
} from '../services/alunos';

export default function useAlunos() {
  const [alunos, setAlunos] =
    useState(alunosIniciais);

  const [carregando, setCarregando] =
    useState(true);

  const carregarDados =
    useCallback(
      async () => {
        setCarregando(true);

        const alunosSalvos =
          await carregarAlunos();

        const alunosAtuais =
          alunosSalvos !== null
            ? alunosSalvos
            : alunosIniciais;

        setAlunos(
          alunosAtuais
        );

        setCarregando(false);
      },
      []
    );

  async function criar(
    nome,
    graduacao,
    turma
  ) {
    const nomeNormalizado =
      nome.trim().toLowerCase();

    const alunoExistente =
      alunos.some(
        (aluno) =>
          aluno.nome
            .trim()
            .toLowerCase() ===
          nomeNormalizado
      );

    if (alunoExistente) {
      return {
        sucesso: false,
        mensagem:
          'Já existe um aluno com esse nome.',
      };
    }

    const novosAlunos =
      criarAluno(
        alunos,
        nome,
        graduacao,
        turma
      );

    setAlunos(
      novosAlunos
    );

    await salvarAlunos(
      novosAlunos
    );

    return {
      sucesso: true,
      mensagem:
        'Aluno cadastrado com sucesso.',
    };
  }

  async function editar(
    alunoId,
    nome,
    graduacao,
    turma
  ) {
    const nomeNormalizado =
      nome.trim().toLowerCase();

    const alunoExistente =
      alunos.some(
        (aluno) =>
          aluno.id !== alunoId &&
          aluno.nome
            .trim()
            .toLowerCase() ===
          nomeNormalizado
      );

    if (alunoExistente) {
      return {
        sucesso: false,
        mensagem:
          'Já existe outro aluno com esse nome.',
      };
    }

    const novosAlunos =
      editarAluno(
        alunos,
        alunoId,
        nome,
        graduacao,
        turma
      );

    setAlunos(
      novosAlunos
    );

    await salvarAlunos(
      novosAlunos
    );

    return {
      sucesso: true,
      mensagem:
        'Aluno editado com sucesso.',
    };
  }

  async function excluir(
    alunoId
  ) {
    const novosAlunos =
      excluirAluno(
        alunos,
        alunoId
      );

    setAlunos(
      novosAlunos
    );

    await salvarAlunos(
      novosAlunos
    );

    return {
      sucesso: true,
      mensagem:
        'Aluno excluído com sucesso.',
    };
  }

  return {
    alunos,
    carregando,
    carregarDados,
    criar,
    editar,
    excluir,
  };
}
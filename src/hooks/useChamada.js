import {
  useCallback,
  useState,
} from 'react';

import {
  carregarPresencas,
  salvarPresencas,
} from '../services/storage';

import {
  criarChamada,
  atualizarChamada,
  excluirChamada,
} from '../services/chamada';

/**
 * @typedef {Object} RegistroPresenca
 * @property {number} alunoId
 * @property {boolean} presente
 */

/**
 * @typedef {Object} Chamada
 * @property {number} id
 * @property {string} data
 * @property {string} turma
 * @property {RegistroPresenca[]} registros
 */

/**
 * @returns {{
 *   chamadas: Chamada[],
 *   carregando: boolean,
 *   carregarDados: () => Promise<Chamada[]>,
 *   salvar: (
 *     data: string,
 *     turma: string,
 *     registros: RegistroPresenca[]
 *   ) => Promise<void>,
 *   editar: (
 *     chamadaId: number,
 *     registros: RegistroPresenca[]
 *   ) => Promise<void>,
 *   excluir: (
 *     chamadaId: number
 *   ) => Promise<void>
 * }}
 */
export default function useChamada() {
  /** @type {[Chamada[], Function]} */
  const [chamadas, setChamadas] =
    useState([]);

  const [carregando, setCarregando] =
    useState(true);

  const carregarDados =
    useCallback(
      async () => {
        setCarregando(true);

        const chamadasSalvas =
          await carregarPresencas();

        /** @type {Chamada[]} */
        const chamadasAtuais =
          chamadasSalvas !== null
            ? chamadasSalvas
            : [];

        setChamadas(
          chamadasAtuais
        );

        setCarregando(false);

        return chamadasAtuais;
      },
      []
    );

  async function salvar(
    data,
    turma,
    registros
  ) {
    const novasChamadas =
      criarChamada(
        chamadas,
        data,
        turma,
        registros
      );

    setChamadas(
      novasChamadas
    );

    await salvarPresencas(
      novasChamadas
    );
  }

  async function editar(
    chamadaId,
    registros
  ) {
    const novasChamadas =
      atualizarChamada(
        chamadas,
        chamadaId,
        registros
      );

    setChamadas(
      novasChamadas
    );

    await salvarPresencas(
      novasChamadas
    );
  }

  async function excluir(
    chamadaId
  ) {
    const novasChamadas =
      excluirChamada(
        chamadas,
        chamadaId
      );

    setChamadas(
      novasChamadas
    );

    await salvarPresencas(
      novasChamadas
    );
  }

  return {
    chamadas,
    carregando,
    carregarDados,
    salvar,
    editar,
    excluir,
  };
}
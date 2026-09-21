import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  emitirEvento,
} from './eventos';

const CHAVE_ALUNOS =
  '@taekwondo_alunos';

const CHAVE_PRESENCAS =
  '@taekwondo_presencas';

export async function carregarAlunos() {
  const dados =
    await AsyncStorage.getItem(
      CHAVE_ALUNOS
    );

  if (!dados) {
    return null;
  }

  return JSON.parse(dados);
}

export async function salvarAlunos(
  alunos
) {
  await AsyncStorage.setItem(
    CHAVE_ALUNOS,
    JSON.stringify(alunos)
  );
}

export async function carregarPresencas() {
  const dados =
    await AsyncStorage.getItem(
      CHAVE_PRESENCAS
    );

  if (!dados) {
    return null;
  }

  return JSON.parse(dados);
}

export async function salvarPresencas(
  chamadas
) {
  await AsyncStorage.setItem(
    CHAVE_PRESENCAS,
    JSON.stringify(chamadas)
  );
}

export async function restaurarBackup(
  alunos,
  chamadas
) {
  await salvarAlunos(
    alunos
  );

  await salvarPresencas(
    chamadas
  );

  emitirEvento(
    'backup-restaurado'
  );
}
import {
  Platform,
} from 'react-native';

import * as FileSystem from 'expo-file-system/legacy';

import * as Sharing from 'expo-sharing';

export function criarBackup(
  alunos,
  chamadas
) {
  return {
    versao: 1,
    dataBackup:
      new Date().toISOString(),
    alunos,
    chamadas,
  };
}

export function validarBackup(
  backup
) {
  if (!backup) {
    return false;
  }

  if (backup.versao !== 1) {
    return false;
  }

  if (!Array.isArray(backup.alunos)) {
    return false;
  }

  if (!Array.isArray(backup.chamadas)) {
    return false;
  }

  return true;
}

export async function exportarBackup(
  alunos,
  chamadas
) {
  const backup =
    criarBackup(
      alunos,
      chamadas
    );

  const conteudo =
    JSON.stringify(
      backup,
      null,
      2
    );

  const nomeArquivo =
    `backup_taekwondo_${Date.now()}.json`;

  /*
   * Exportação para navegador.
   */
  if (
    Platform.OS === 'web'
  ) {
    const blob =
      new Blob(
        [conteudo],
        {
          type:
            'application/json',
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        'a'
      );

    link.href = url;

    link.download =
      nomeArquivo;

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );

    URL.revokeObjectURL(
      url
    );

    return;
  }

  /*
   * Exportação para Android/iOS.
   */
  const uri =
    FileSystem.cacheDirectory +
    nomeArquivo;

  await FileSystem.writeAsStringAsync(
    uri,
    conteudo,
    {
      encoding:
        FileSystem.EncodingType.UTF8,
    }
  );

  const disponivel =
    await Sharing.isAvailableAsync();

  if (!disponivel) {
    throw new Error(
      'O compartilhamento não está disponível neste dispositivo.'
    );
  }

  await Sharing.shareAsync(
    uri,
    {
      mimeType:
        'application/json',
      dialogTitle:
        'Exportar backup do Taekwondo',
    }
  );
}

export async function lerBackup(
  arquivo
) {
  const resposta =
    await fetch(
      arquivo.uri
    );

  const texto =
    await resposta.text();

  const backup =
    JSON.parse(texto);

  if (
    !validarBackup(
      backup
    )
  ) {
    throw new Error(
      'Arquivo de backup inválido.'
    );
  }

  return backup;
}
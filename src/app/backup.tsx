import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';

import {
  useState,
} from 'react';

import * as DocumentPicker from 'expo-document-picker';

import {
  carregarAlunos,
  carregarPresencas,
  restaurarBackup,
} from '../services/storage';

import {
  exportarBackup,
  lerBackup,
} from '../services/backup';

import NavegacaoSwipe from '../components/NavegacaoSwipe';

type AlunoBackup = {
  id: number;
  nome: string;
  graduacao: string;
  presencas: number;
  faltas: number;
};

type RegistroBackup = {
  alunoId: number;
  presente: boolean;
};

type ChamadaBackup = {
  id: number;
  data: string;
  registros: RegistroBackup[];
};

type Backup = {
  versao: number;
  dataBackup: string;
  alunos: AlunoBackup[];
  chamadas: ChamadaBackup[];
};

export default function Backup() {
  const [
    exportando,
    setExportando,
  ] = useState(false);

  const [
    importando,
    setImportando,
  ] = useState(false);

  const [
    backupSelecionado,
    setBackupSelecionado,
  ] = useState<Backup | null>(null);

  const [
    modalConfirmacao,
    setModalConfirmacao,
  ] = useState(false);

  async function fazerBackup() {
    try {
      setExportando(true);

      const alunos =
        await carregarAlunos();

      const chamadas =
        await carregarPresencas();

      console.log(
        'BACKUP - alunos:',
        alunos
      );

      console.log(
        'BACKUP - chamadas:',
        chamadas
      );

      await exportarBackup(
        alunos ?? [],
        chamadas ?? []
      );

      alert(
        'Backup exportado com sucesso!'
      );
    } catch (erro) {
      console.error(
        'ERRO COMPLETO AO EXPORTAR BACKUP:',
        erro
      );

      let mensagemErro =
        'Erro desconhecido.';

      if (
        erro instanceof Error
      ) {
        mensagemErro =
          erro.message;

        console.error(
          'Mensagem:',
          erro.message
        );

        console.error(
          'Stack:',
          erro.stack
        );
      } else {
        mensagemErro =
          String(erro);
      }

      alert(
        `ERRO AO EXPORTAR BACKUP:\n\n${mensagemErro}`
      );
    } finally {
      setExportando(false);
    }
  }

  async function importarBackup() {
    try {
      setImportando(true);

      const resultado =
        await DocumentPicker.getDocumentAsync({
          type: 'application/json',
          copyToCacheDirectory: true,
        });

      if (
        resultado.canceled
      ) {
        return;
      }

      const arquivo =
        resultado.assets[0];

      const backup =
        await lerBackup(
          arquivo
        );

      setBackupSelecionado(
        backup as Backup
      );

      setModalConfirmacao(
        true
      );
    } catch (erro) {
      console.error(
        'Erro ao importar backup:',
        erro
      );

      const mensagemErro =
        erro instanceof Error
          ? erro.message
          : String(erro);

      alert(
        `ERRO AO IMPORTAR BACKUP:\n\n${mensagemErro}`
      );
    } finally {
      setImportando(false);
    }
  }

  function cancelarImportacao() {
    setModalConfirmacao(
      false
    );

    setBackupSelecionado(
      null
    );
  }

  async function confirmarImportacao() {
    if (
      !backupSelecionado
    ) {
      return;
    }

    try {
      setImportando(true);

      await restaurarBackup(
        backupSelecionado.alunos,
        backupSelecionado.chamadas
      );

      setModalConfirmacao(
        false
      );

      setBackupSelecionado(
        null
      );

      alert(
        'Backup restaurado com sucesso!'
      );
    } catch (erro) {
      console.error(
        'Erro ao restaurar backup:',
        erro
      );

      const mensagemErro =
        erro instanceof Error
          ? erro.message
          : String(erro);

      alert(
        `ERRO AO RESTAURAR BACKUP:\n\n${mensagemErro}`
      );
    } finally {
      setImportando(false);
    }
  }

  return (
    <NavegacaoSwipe>
      <View
        style={styles.container}
      >
        <Text
          style={styles.titulo}
        >
          Backup
        </Text>

        <Text
          style={styles.subtitulo}
        >
          Proteja os dados dos seus alunos
          e das chamadas.
        </Text>

        <View
          style={styles.card}
        >
          <Text
            style={styles.tituloCard}
          >
            Exportar dados
          </Text>

          <Text
            style={styles.textoCard}
          >
            Crie um arquivo com todos os
            alunos e registros de chamadas
            armazenados no aplicativo.
          </Text>

          <TouchableOpacity
            style={[
              styles.botao,
              exportando &&
                styles.botaoDesativado,
            ]}
            onPress={
              fazerBackup
            }
            disabled={
              exportando
            }
            activeOpacity={0.7}
          >
            <Text
              style={
                styles.textoBotao
              }
            >
              {exportando
                ? 'Exportando...'
                : 'Exportar backup'}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={styles.card}
        >
          <Text
            style={styles.tituloCard}
          >
            Importar dados
          </Text>

          <Text
            style={styles.textoCard}
          >
            Selecione um arquivo de backup
            para recuperar os dados dos
            alunos e das chamadas.
          </Text>

          <TouchableOpacity
            style={[
              styles.botao,
              importando &&
                styles.botaoDesativado,
            ]}
            onPress={
              importarBackup
            }
            disabled={
              importando
            }
            activeOpacity={0.7}
          >
            <Text
              style={
                styles.textoBotao
              }
            >
              {importando
                ? 'Importando...'
                : 'Importar backup'}
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={
            modalConfirmacao
          }
          transparent={true}
          animationType="fade"
        >
          <View
            style={
              styles.overlay
            }
          >
            <View
              style={
                styles.modal
              }
            >
              <Text
                style={
                  styles.tituloModal
                }
              >
                Restaurar backup
              </Text>

              <Text
                style={
                  styles.textoModal
                }
              >
                O backup contém:
              </Text>

              <View
                style={
                  styles.resumo
                }
              >
                <Text
                  style={
                    styles.itemResumo
                  }
                >
                  Alunos:{' '}

                  <Text
                    style={
                      styles.valor
                    }
                  >
                    {
                      backupSelecionado
                        ?.alunos
                        .length
                    }
                  </Text>
                </Text>

                <Text
                  style={
                    styles.itemResumo
                  }
                >
                  Chamadas:{' '}

                  <Text
                    style={
                      styles.valor
                    }
                  >
                    {
                      backupSelecionado
                        ?.chamadas
                        .length
                    }
                  </Text>
                </Text>
              </View>

              <Text
                style={
                  styles.aviso
                }
              >
                A restauração substituirá os
                dados atuais do aplicativo.
              </Text>

              <View
                style={
                  styles.botoes
                }
              >
                <TouchableOpacity
                  style={
                    styles.botaoCancelar
                  }
                  onPress={
                    cancelarImportacao
                  }
                  disabled={
                    importando
                  }
                  activeOpacity={0.7}
                >
                  <Text
                    style={
                      styles.textoCancelar
                    }
                  >
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    styles.botaoConfirmar
                  }
                  onPress={
                    confirmarImportacao
                  }
                  disabled={
                    importando
                  }
                  activeOpacity={0.7}
                >
                  <Text
                    style={
                      styles.textoConfirmar
                    }
                  >
                    {importando
                      ? 'Restaurando...'
                      : 'Restaurar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </NavegacaoSwipe>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },

  subtitulo: {
    fontSize: 15,
    color: '#aaa',
    lineHeight: 21,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
  },

  tituloCard: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },

  textoCard: {
    fontSize: 14,
    color: '#999',
    lineHeight: 21,
    marginBottom: 18,
  },

  botao: {
    backgroundColor: '#333',
    paddingVertical: 14,
    borderRadius: 9,
    alignItems: 'center',
  },

  botaoDesativado: {
    opacity: 0.5,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      'rgba(0, 0, 0, 0.55)',
  },

  modal: {
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 22,
  },

  tituloModal: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 12,
  },

  textoModal: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
  },

  resumo: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  itemResumo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },

  valor: {
    fontWeight: 'bold',
    color: '#111',
  },

  aviso: {
    fontSize: 14,
    color: '#b00020',
    lineHeight: 20,
    marginBottom: 20,
  },

  botoes: {
    flexDirection: 'row',
    gap: 10,
  },

  botaoCancelar: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },

  botaoConfirmar: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 8,
    backgroundColor: '#111',
    alignItems: 'center',
  },

  textoCancelar: {
    color: '#333',
    fontWeight: 'bold',
  },

  textoConfirmar: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
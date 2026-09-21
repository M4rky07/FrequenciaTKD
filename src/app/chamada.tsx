import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  useCallback,
  useState,
} from 'react';

import {
  useFocusEffect,
} from 'expo-router';

import alunosIniciais from '../Data/alunos.json';

import ChamadaItem from '../components/ChamadaItem';
import ResumoChamada from '../components/ResumoChamada';
import ConfirmacaoChamadaModal from '../components/ConfirmacaoChamadaModal';
import NavegacaoSwipe from '../components/NavegacaoSwipe';

import {
  carregarAlunos,
} from '../services/storage';

import {
  adicionarListener,
} from '../services/eventos';

import useChamada from '../hooks/useChamada';

type Aluno =
  typeof alunosIniciais[number] & {
    turma?: string;
  };

type RegistroPresenca = {
  alunoId: number;
  presente: boolean;
};

type Chamada = {
  id: number;
  data: string;
  turma: string;
  registros: RegistroPresenca[];
};

type RegistroAtual = {
  alunoId: number;
  presente: boolean | null;
};

type Turma =
  | 'criancas'
  | 'adultos';

type Evento = string;

export default function Chamada() {
  const [
    alunos,
    setAlunos,
  ] = useState<Aluno[]>([]);

  const [
    presencas,
    setPresencas,
  ] = useState<RegistroAtual[]>([]);

  const [
    turmaSelecionada,
    setTurmaSelecionada,
  ] = useState<Turma | null>(
    null
  );

  const [
    carregandoAlunos,
    setCarregandoAlunos,
  ] = useState(true);

  const [
    modalConfirmacao,
    setModalConfirmacao,
  ] = useState(false);

  const {
    carregando: carregandoChamadas,
    carregarDados: carregarChamadas,
    salvar,
  } = useChamada();

  function obterDataAtual() {
    const hoje =
      new Date();

    const ano =
      hoje.getFullYear();

    const mes =
      String(
        hoje.getMonth() + 1
      ).padStart(2, '0');

    const dia =
      String(
        hoje.getDate()
      ).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }

  const carregarDados =
    useCallback(
      async () => {
        setCarregandoAlunos(
          true
        );

        const alunosSalvos =
          await carregarAlunos();

        const alunosAtuais:
          Aluno[] =
          alunosSalvos !== null
            ? alunosSalvos as Aluno[]
            : alunosIniciais;

        setAlunos(
          alunosAtuais
        );

        await carregarChamadas();

        setCarregandoAlunos(
          false
        );
      },
      [
        carregarChamadas,
      ]
    );

  useFocusEffect(
    useCallback(() => {
      carregarDados();

      const removerListener =
        adicionarListener(
          (evento: Evento) => {
            if (
              evento ===
              'backup-restaurado'
            ) {
              carregarDados();
            }
          }
        );

      return removerListener;
    }, [
      carregarDados,
    ])
  );

  function selecionarTurma(
    turma: Turma
  ) {
    setTurmaSelecionada(
      turma
    );

    setPresencas([]);

    setModalConfirmacao(
      false
    );
  }

  function trocarTurma() {
    setTurmaSelecionada(
      null
    );

    setPresencas([]);

    setModalConfirmacao(
      false
    );
  }

  function obterNomeTurma() {
    if (
      turmaSelecionada ===
      'criancas'
    ) {
      return 'Crianças';
    }

    return 'Adolescentes/Adultos';
  }

  const alunosDaTurma =
    alunos.filter(
      (aluno) =>
        aluno.turma ===
        turmaSelecionada
    );

  function alternarPresenca(
    alunoId: number
  ) {
    setPresencas(
      (listaAtual) => {
        const registroExistente =
          listaAtual.find(
            (registro) =>
              registro.alunoId ===
              alunoId
          );

        if (
          !registroExistente
        ) {
          return [
            ...listaAtual,
            {
              alunoId,
              presente: true,
            },
          ];
        }

        return listaAtual.map(
          (registro) => {
            if (
              registro.alunoId !==
              alunoId
            ) {
              return registro;
            }

            if (
              registro.presente ===
              null
            ) {
              return {
                ...registro,
                presente:
                  true,
              };
            }

            if (
              registro.presente ===
              true
            ) {
              return {
                ...registro,
                presente:
                  false,
              };
            }

            return {
              ...registro,
              presente:
                null,
            };
          }
        );
      }
    );
  }

  function alunoEstaPresente(
    alunoId: number
  ): boolean | null {
    const registro =
      presencas.find(
        (item) =>
          item.alunoId ===
          alunoId
      );

    if (!registro) {
      return null;
    }

    return registro.presente;
  }

  function abrirConfirmacao() {
    const alunosNaoMarcados =
      alunosDaTurma.filter(
        (aluno) => {
          return (
            alunoEstaPresente(
              aluno.id
            ) === null
          );
        }
      );

    if (
      alunosNaoMarcados.length >
      0
    ) {
      Alert.alert(
        'Atenção',
        `Ainda existem ${alunosNaoMarcados.length} aluno(s) não marcado(s).`
      );

      return;
    }

    setModalConfirmacao(
      true
    );
  }

  function fecharConfirmacao() {
    setModalConfirmacao(
      false
    );
  }

  async function confirmarChamada() {
    if (
      turmaSelecionada === null
    ) {
      return;
    }

    const data =
      obterDataAtual();

    const registrosCompletos:
      RegistroPresenca[] =
      alunosDaTurma.map(
        (aluno) => {
          const registro =
            presencas.find(
              (item) =>
                item.alunoId ===
                aluno.id
            );

          return {
            alunoId:
              aluno.id,
            presente:
              registro?.presente ===
              true,
          };
        }
      );

    await salvar(
      data,
      turmaSelecionada,
      registrosCompletos
    );

    setModalConfirmacao(
      false
    );

    Alert.alert(
      'Sucesso',
      'Chamada salva com sucesso!'
    );
  }

  const presentes =
    presencas.filter(
      (registro) =>
        registro.presente ===
        true
    ).length;

  const faltas =
    presencas.filter(
      (registro) =>
        registro.presente ===
        false
    ).length;

  const total =
    alunosDaTurma.length;

  const carregando =
    carregandoAlunos ||
    carregandoChamadas;

  if (
    carregando
  ) {
    return (
      <NavegacaoSwipe>
        <View
          style={
            styles.carregando
          }
        >
          <Text
            style={
              styles.textoCarregando
            }
          >
            Carregando chamada...
          </Text>
        </View>
      </NavegacaoSwipe>
    );
  }

  if (
    turmaSelecionada ===
    null
  ) {
    return (
      <NavegacaoSwipe>
        <View
          style={
            styles.containerSelecao
          }
        >
          <Text
            style={
              styles.titulo
            }
          >
            Chamada
          </Text>

          <Text
            style={
              styles.subtituloSelecao
            }
          >
            Qual turma você vai dar
            aula?
          </Text>

          <TouchableOpacity
            style={
              styles.botaoTurma
            }
            onPress={() =>
              selecionarTurma(
                'criancas'
              )
            }
            activeOpacity={0.7}
          >
            <Text
              style={
                styles.iconeTurma
              }
            >
              🧒
            </Text>

            <View
              style={
                styles.informacoesTurma
              }
            >
              <Text
                style={
                  styles.nomeTurma
                }
              >
                Crianças
              </Text>

              <Text
                style={
                  styles.quantidadeTurma
                }
              >
                {
                  alunos.filter(
                    (aluno) =>
                      aluno.turma ===
                      'criancas'
                  ).length
                }{' '}
                aluno(s)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.botaoTurma
            }
            onPress={() =>
              selecionarTurma(
                'adultos'
              )
            }
            activeOpacity={0.7}
          >
            <Text
              style={
                styles.iconeTurma
              }
            >
              👥
            </Text>

            <View
              style={
                styles.informacoesTurma
              }
            >
              <Text
                style={
                  styles.nomeTurma
                }
              >
                Adolescentes/Adultos
              </Text>

              <Text
                style={
                  styles.quantidadeTurma
                }
              >
                {
                  alunos.filter(
                    (aluno) =>
                      aluno.turma ===
                      'adultos'
                  ).length
                }{' '}
                aluno(s)
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </NavegacaoSwipe>
    );
  }

  return (
    <NavegacaoSwipe>
      <View
        style={
          styles.container
        }
      >
        <View
          style={
            styles.cabecalho
          }
        >
          <View>
            <Text
              style={
                styles.titulo
              }
            >
              Chamada
            </Text>

            <Text
              style={
                styles.subtitulo
              }
            >
              {obterNomeTurma()}
            </Text>
          </View>

          <TouchableOpacity
            style={
              styles.botaoTrocarTurma
            }
            onPress={
              trocarTurma
            }
            activeOpacity={0.7}
          >
            <Text
              style={
                styles.textoTrocarTurma
              }
            >
              Trocar turma
            </Text>
          </TouchableOpacity>
        </View>

        {
          alunosDaTurma.length ===
          0 ? (
            <View
              style={
                styles.semAlunos
              }
            >
              <Text
                style={
                  styles.textoSemAlunos
                }
              >
                Nenhum aluno cadastrado
                nesta turma.
              </Text>
            </View>
          ) : (
            <FlatList
              data={
                alunosDaTurma
              }
              keyExtractor={
                (item) =>
                  item.id.toString()
              }
              renderItem={
                ({ item }) => (
                  <ChamadaItem
                    aluno={item}
                    presente={
                      alunoEstaPresente(
                        item.id
                      )
                    }
                    onToggle={() =>
                      alternarPresenca(
                        item.id
                      )
                    }
                  />
                )
              }
              ListFooterComponent={
                <ResumoChamada
                  presentes={
                    presentes
                  }
                  faltas={
                    faltas
                  }
                  total={
                    total
                  }
                />
              }
            />
          )
        }

        <TouchableOpacity
          style={
            styles.botaoSalvar
          }
          onPress={
            abrirConfirmacao
          }
          disabled={
            alunosDaTurma.length ===
            0
          }
        >
          <Text
            style={
              styles.textoBotao
            }
          >
            Salvar chamada
          </Text>
        </TouchableOpacity>

        <ConfirmacaoChamadaModal
          visivel={
            modalConfirmacao
          }
          presentes={
            presentes
          }
          faltas={
            faltas
          }
          total={
            total
          }
          onConfirmar={
            confirmarChamada
          }
          onCancelar={
            fecharConfirmacao
          }
        />
      </View>
    </NavegacaoSwipe>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      paddingHorizontal: 20,
      paddingTop: 60,
    },

    containerSelecao: {
      flex: 1,
      backgroundColor: '#000',
      paddingHorizontal: 20,
      paddingTop: 60,
    },

    carregando: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
    },

    textoCarregando: {
      fontSize: 18,
      color: '#fff',
    },

    cabecalho: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },

    titulo: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 5,
    },

    subtitulo: {
      fontSize: 17,
      color: '#aaa',
    },

    subtituloSelecao: {
      fontSize: 17,
      color: '#aaa',
      marginBottom: 25,
    },

    botaoTurma: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#111',
      borderWidth: 1,
      borderColor: '#2a2a2a',
      borderRadius: 12,
      padding: 18,
      marginBottom: 12,
    },

    iconeTurma: {
      fontSize: 30,
      marginRight: 15,
    },

    informacoesTurma: {
      flex: 1,
    },

    nomeTurma: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },

    quantidadeTurma: {
      color: '#888',
      fontSize: 14,
      marginTop: 4,
    },

    botaoTrocarTurma: {
      backgroundColor: '#333',
      paddingHorizontal: 12,
      paddingVertical: 9,
      borderRadius: 8,
    },

    textoTrocarTurma: {
      color: '#fff',
      fontSize: 13,
      fontWeight: 'bold',
    },

    semAlunos: {
      backgroundColor: '#111',
      borderWidth: 1,
      borderColor: '#2a2a2a',
      borderRadius: 12,
      padding: 25,
      alignItems: 'center',
    },

    textoSemAlunos: {
      color: '#888',
      fontSize: 15,
      textAlign: 'center',
    },

    botaoSalvar: {
      backgroundColor: '#333',
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 5,
    },

    textoBotao: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
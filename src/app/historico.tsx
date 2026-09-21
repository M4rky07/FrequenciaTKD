import {
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

import {
  useCallback,
  useState,
} from 'react';

import {
  useFocusEffect,
} from 'expo-router';

import alunosIniciais from '../Data/alunos.json';

import HistoricoCard from '../components/HistoricoCard';
import ChamadaItem from '../components/ChamadaItem';
import ConfirmacaoChamadaModal from '../components/ConfirmacaoModal2';
import NavegacaoSwipe from '../components/NavegacaoSwipe';

import {
  carregarAlunos,
} from '../services/storage';

import {
  adicionarListener,
} from '../services/eventos';

import useChamada from '../hooks/useChamada';


type Aluno =
  typeof alunosIniciais[number];


type RegistroPresenca = {
  alunoId: number;
  presente: boolean;
};


type Chamada = {
  id: number;
  data: string;
  turma?: string;
  registros?: RegistroPresenca[];
};


type RegistroEdicao = {
  alunoId: number;
  presente: boolean | null;
};


type Evento = string;


export default function Historico() {

  const [
    alunos,
    setAlunos,
  ] = useState<Aluno[]>([]);


  const [
    chamadaSelecionada,
    setChamadaSelecionada,
  ] = useState<Chamada | null>(null);


  const [
    chamadaEditando,
    setChamadaEditando,
  ] = useState<Chamada | null>(null);


  const [
    chamadaExcluindo,
    setChamadaExcluindo,
  ] = useState<Chamada | null>(null);


  const [
    registrosEdicao,
    setRegistrosEdicao,
  ] = useState<RegistroEdicao[]>([]);


  const [
    carregandoAlunos,
    setCarregandoAlunos,
  ] = useState(true);


  const {
    chamadas,
    carregando: carregandoChamadas,
    carregarDados: carregarChamadas,
    editar,
    excluir,
  } = useChamada();


  const carregarDados =
    useCallback(
      async () => {

        setCarregandoAlunos(true);

        const alunosSalvos =
          await carregarAlunos();

        const alunosAtuais: Aluno[] =
          alunosSalvos !== null
            ? alunosSalvos as Aluno[]
            : alunosIniciais;

        setAlunos(alunosAtuais);

        await carregarChamadas();

        setCarregandoAlunos(false);
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


  function abrirDetalhes(
    chamada: Chamada
  ) {

    setChamadaSelecionada(
      chamada
    );

  }


  function fecharDetalhes() {

    setChamadaSelecionada(
      null
    );

  }


  function abrirEdicao(
    chamada: Chamada
  ) {

    setChamadaEditando(
      chamada
    );


    const registros:
      RegistroEdicao[] =
      (
        Array.isArray(chamada.registros)
          ? chamada.registros
          : []
      ).map(
        (
          registro: RegistroPresenca
        ) => ({

          alunoId:
            registro.alunoId,

          presente:
            registro.presente,

        })
      );


    setRegistrosEdicao(
      registros
    );

  }


  function fecharEdicao() {

    setChamadaEditando(
      null
    );

    setRegistrosEdicao(
      []
    );

  }


  function abrirExclusao(
    chamada: Chamada
  ) {

    setChamadaExcluindo(
      chamada
    );

  }


  function fecharExclusao() {

    setChamadaExcluindo(
      null
    );

  }


  function encontrarAluno(
    alunoId: number
  ) {

    return alunos.find(
      (aluno) =>
        aluno.id ===
        alunoId
    );

  }


  function obterPresenca(
    alunoId: number
  ): boolean | null {

    const registro =
      registrosEdicao.find(
        (
          item: RegistroEdicao
        ) =>
          item.alunoId ===
          alunoId
      );


    if (!registro) {

      return null;

    }


    return registro.presente;

  }


  function alternarPresenca(
    alunoId: number
  ) {

    setRegistrosEdicao(
      (
        listaAtual: RegistroEdicao[]
      ) => {

        const registro =
          listaAtual.find(
            (
              item: RegistroEdicao
            ) =>
              item.alunoId ===
              alunoId
          );


        if (!registro) {

          return listaAtual;

        }


        let novoValor:
          boolean | null;


        if (
          registro.presente ===
          null
        ) {

          novoValor = true;

        } else if (
          registro.presente ===
          true
        ) {

          novoValor = false;

        } else {

          novoValor = null;

        }


        return listaAtual.map(
          (
            item: RegistroEdicao
          ) => {

            if (
              item.alunoId !==
              alunoId
            ) {

              return item;

            }


            return {
              ...item,

              presente:
                novoValor,
            };

          }
        );

      }
    );

  }


  async function salvarEdicao() {

    if (
      !chamadaEditando
    ) {

      return;

    }


    const alunosNaoMarcados =
      registrosEdicao.filter(
        (
          registro: RegistroEdicao
        ) =>
          registro.presente ===
          null
      );


    if (
      alunosNaoMarcados.length >
      0
    ) {

      alert(
        `Ainda existem ${alunosNaoMarcados.length} aluno(s) não marcado(s).`
      );

      return;

    }


    const registrosAtualizados:
      RegistroPresenca[] =
      registrosEdicao.map(
        (
          registro: RegistroEdicao
        ) => ({

          alunoId:
            registro.alunoId,

          presente:
            registro.presente ===
            true,

        })
      );


    await editar(
      chamadaEditando.id,
      registrosAtualizados
    );


    setChamadaEditando(
      null
    );

    setRegistrosEdicao(
      []
    );


    alert(
      'Chamada atualizada com sucesso!'
    );

  }


  async function excluirChamada() {

    if (
      !chamadaExcluindo
    ) {

      return;

    }


    await excluir(
      chamadaExcluindo.id
    );


    setChamadaExcluindo(
      null
    );


    alert(
      'Chamada excluída com sucesso!'
    );

  }


  function contarPresentes(
    chamada: Chamada
  ) {

    const registros =
      Array.isArray(chamada.registros)
        ? chamada.registros
        : [];


    return registros.filter(
      (
        registro: RegistroPresenca
      ) =>
        registro.presente
    ).length;

  }


  function contarFaltas(
    chamada: Chamada
  ) {

    const registros =
      Array.isArray(chamada.registros)
        ? chamada.registros
        : [];


    return registros.filter(
      (
        registro: RegistroPresenca
      ) =>
        !registro.presente
    ).length;

  }


  /*
   * Organiza as chamadas da mais recente
   * para a mais antiga.
   */
  const chamadasOrdenadas:
    Chamada[] =
    [...chamadas].reverse();


  /*
   * Cria as duas seções do histórico.
   *
   * "criancas" e "adultos" são os valores
   * que já são salvos pelo chamada.tsx.
   */
  const secoes: {
    title: string;
    data: Chamada[];
  }[] = [

    {
      title: '🧒 Crianças',

      data:
        chamadasOrdenadas.filter(
          (chamada) =>
            chamada.turma ===
            'criancas'
        ),
    },

    {
      title: '👥 Adolescentes/Adultos',

      data:
        chamadasOrdenadas.filter(
          (chamada) =>
            chamada.turma ===
            'adultos'
        ),
    },

  ];


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
            Carregando histórico...
          </Text>

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

        <Text
          style={
            styles.titulo
          }
        >
          Histórico de chamadas
        </Text>


        <SectionList
          sections={secoes}

          keyExtractor={
            (item: Chamada) =>
              item.id.toString()
          }


          renderSectionHeader={
            ({ section }) => (

              <Text
                style={
                  styles.tituloTurma
                }
              >
                {section.title}
              </Text>

            )
          }


          renderItem={
            ({
              item,
            }: {
              item: Chamada;
            }) => (

              <HistoricoCard

                chamada={
                  item
                }

                quantidadeAlunos={
                  Array.isArray(
                    item.registros
                  )
                    ? item.registros.length
                    : 0
                }

                onVerDetalhes={
                  abrirDetalhes
                }

                onEditar={
                  abrirEdicao
                }

                onExcluir={
                  abrirExclusao
                }

              />

            )
          }


          ListEmptyComponent={

            <View
              style={
                styles.semChamadas
              }
            >

              <Text
                style={
                  styles.textoSemChamadas
                }
              >
                Nenhuma chamada registrada.
              </Text>

            </View>

          }


          stickySectionHeadersEnabled={
            false
          }

          showsVerticalScrollIndicator={
            false
          }

        />


        {/* =========================
            MODAL DE DETALHES
            ========================= */}

        <Modal
          visible={
            chamadaSelecionada !==
            null
          }

          animationType="slide"

          transparent={true}
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
                Detalhes da chamada
              </Text>


              {
                chamadaSelecionada && (

                  <>

                    <Text
                      style={
                        styles.dataModal
                      }
                    >
                      {
                        chamadaSelecionada.data
                          .split('-')
                          .reverse()
                          .join('/')
                      }
                    </Text>


                    <FlatList

                      data={
                        Array.isArray(
                          chamadaSelecionada.registros
                        )
                          ? chamadaSelecionada.registros
                          : []
                      }

                      keyExtractor={
                        (
                          item: RegistroPresenca
                        ) =>
                          item.alunoId.toString()
                      }


                      renderItem={
                        ({
                          item,
                        }: {
                          item: RegistroPresenca;
                        }) => {

                          const aluno =
                            encontrarAluno(
                              item.alunoId
                            );


                          if (!aluno) {

                            return null;

                          }


                          return (

                            <View
                              style={
                                styles.aluno
                              }
                            >

                              <View>

                                <Text
                                  style={
                                    styles.nomeAluno
                                  }
                                >
                                  {
                                    aluno.nome
                                  }
                                </Text>


                                <Text
                                  style={
                                    styles.graduacao
                                  }
                                >
                                  {
                                    aluno.graduacao
                                  }
                                </Text>

                              </View>


                              <Text
                                style={
                                  item.presente
                                    ? styles.presente
                                    : styles.falta
                                }
                              >
                                {
                                  item.presente
                                    ? 'Presente'
                                    : 'Falta'
                                }
                              </Text>

                            </View>

                          );

                        }
                      }

                    />


                    <View
                      style={
                        styles.resumo
                      }
                    >

                      <Text
                        style={
                          styles.textoResumo
                        }
                      >
                        Presentes:{' '}
                        {
                          contarPresentes(
                            chamadaSelecionada
                          )
                        }
                      </Text>


                      <Text
                        style={
                          styles.textoResumo
                        }
                      >
                        Faltas:{' '}
                        {
                          contarFaltas(
                            chamadaSelecionada
                          )
                        }
                      </Text>

                    </View>

                  </>

                )
              }


              <TouchableOpacity
                style={
                  styles.botaoFechar
                }

                onPress={
                  fecharDetalhes
                }
              >

                <Text
                  style={
                    styles.textoBotaoFechar
                  }
                >
                  Fechar
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </Modal>


        {/* =========================
            MODAL DE EDIÇÃO
            ========================= */}

        <Modal
          visible={
            chamadaEditando !==
            null
          }

          animationType="slide"

          transparent={true}
        >

          <View
            style={
              styles.overlay
            }
          >

            <View
              style={
                styles.modalEdicao
              }
            >

              <Text
                style={
                  styles.tituloModal
                }
              >
                Editar chamada
              </Text>


              {
                chamadaEditando && (

                  <Text
                    style={
                      styles.dataModal
                    }
                  >
                    {
                      chamadaEditando.data
                        .split('-')
                        .reverse()
                        .join('/')
                    }
                  </Text>

                )
              }


              <FlatList

                data={
                  registrosEdicao
                }

                keyExtractor={
                  (
                    item: RegistroEdicao
                  ) =>
                    item.alunoId.toString()
                }


                renderItem={
                  ({
                    item,
                  }: {
                    item: RegistroEdicao;
                  }) => {

                    const aluno =
                      encontrarAluno(
                        item.alunoId
                      );


                    if (!aluno) {

                      return null;

                    }


                    return (

                      <ChamadaItem

                        aluno={
                          aluno
                        }

                        presente={
                          obterPresenca(
                            item.alunoId
                          )
                        }

                        onToggle={() =>
                          alternarPresenca(
                            item.alunoId
                          )
                        }

                      />

                    );

                  }
                }

              />


              <TouchableOpacity
                style={
                  styles.botaoSalvar
                }

                onPress={
                  salvarEdicao
                }
              >

                <Text
                  style={
                    styles.textoBotaoSalvar
                  }
                >
                  Salvar alterações
                </Text>

              </TouchableOpacity>


              <TouchableOpacity
                style={
                  styles.botaoCancelar
                }

                onPress={
                  fecharEdicao
                }
              >

                <Text
                  style={
                    styles.textoBotaoCancelar
                  }
                >
                  Cancelar
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </Modal>


        {/* =========================
            MODAL DE EXCLUSÃO
            ========================= */}

        <ConfirmacaoChamadaModal

          visivel={
            chamadaExcluindo !==
            null
          }

          chamada={
            chamadaExcluindo
          }

          onConfirmar={
            excluirChamada
          }

          onCancelar={
            fecharExclusao
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


    titulo: {

      fontSize: 30,

      fontWeight: 'bold',

      color: '#fff',

      marginBottom: 20,

    },


    tituloTurma: {

      fontSize: 20,

      fontWeight: 'bold',

      color: '#fff',

      marginTop: 10,

      marginBottom: 12,

    },


    semChamadas: {

      backgroundColor: '#fff',

      padding: 25,

      borderRadius: 12,

      alignItems: 'center',

      borderWidth: 1,

      borderColor: '#e0e0e0',

    },


    textoSemChamadas: {

      color: '#666',

      fontSize: 16,

    },


    overlay: {

      flex: 1,

      justifyContent: 'center',

      alignItems: 'center',

      backgroundColor:
        'rgba(0, 0, 0, 0.55)',

    },


    modal: {

      width: '90%',

      maxHeight: '80%',

      backgroundColor: '#fff',

      borderRadius: 14,

      padding: 20,

    },


    modalEdicao: {

      width: '95%',

      maxHeight: '90%',

      backgroundColor: '#fff',

      borderRadius: 14,

      padding: 20,

    },


    tituloModal: {

      fontSize: 24,

      fontWeight: 'bold',

      color: '#111',

      marginBottom: 5,

    },


    dataModal: {

      fontSize: 18,

      color: '#666',

      marginBottom: 15,

    },


    aluno: {

      flexDirection: 'row',

      justifyContent: 'space-between',

      alignItems: 'center',

      paddingVertical: 12,

      borderBottomWidth: 1,

      borderBottomColor: '#eeeeee',

    },


    nomeAluno: {

      fontSize: 16,

      fontWeight: 'bold',

      color: '#111',

    },


    graduacao: {

      color: '#666',

      marginTop: 3,

    },


    presente: {

      color: '#2e7d32',

      fontWeight: 'bold',

    },


    falta: {

      color: '#b00020',

      fontWeight: 'bold',

    },


    resumo: {

      marginTop: 15,

      paddingTop: 12,

      borderTopWidth: 1,

      borderTopColor: '#ddd',

    },


    textoResumo: {

      fontSize: 16,

      fontWeight: 'bold',

      color: '#333',

      marginBottom: 5,

    },


    botaoFechar: {

      backgroundColor: '#111',

      paddingVertical: 14,

      borderRadius: 9,

      alignItems: 'center',

      marginTop: 15,

    },


    textoBotaoFechar: {

      color: '#fff',

      fontWeight: 'bold',

      fontSize: 16,

    },


    botaoSalvar: {

      backgroundColor: '#111',

      paddingVertical: 14,

      borderRadius: 9,

      alignItems: 'center',

      marginTop: 10,

    },


    textoBotaoSalvar: {

      color: '#fff',

      fontWeight: 'bold',

      fontSize: 16,

    },


    botaoCancelar: {

      paddingVertical: 14,

      alignItems: 'center',

      marginTop: 8,

    },


    textoBotaoCancelar: {

      color: '#555',

      fontWeight: 'bold',

      fontSize: 16,

    },

  });
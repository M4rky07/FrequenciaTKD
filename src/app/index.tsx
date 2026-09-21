import {
  View,
  Text,
  FlatList,
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

import AlunoCard from '../components/AlunoCard';

import AlunoForm from '../components/AlunoForm';

import ConfirmacaoModal from '../components/ConfirmacaoModal';

import FrequenciaModal from '../components/FrequenciaModal';

import FrequenciaAnualModal from '../components/FrequenciaAnualModal';

import {
  carregarPresencas,
} from '../services/storage';

import {
  adicionarListener,
} from '../services/eventos';

import {
  calcularFrequenciaMes,
  calcularFrequenciaAnual,
  calcularFrequenciaTotal,
} from '../services/frequencia';

import useAlunos from '../hooks/useAlunos';

import NavegacaoSwipe from '../components/NavegacaoSwipe';

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
  registros: RegistroPresenca[];
};

type Evento = string;

export default function Home() {
  const {
    alunos,
    carregando: carregandoAlunos,
    carregarDados: carregarAlunosDados,
    criar,
    editar,
    excluir,
  } = useAlunos();

  const [
    chamadas,
    setChamadas,
  ] = useState<Chamada[]>([]);

  const [
    carregandoChamadas,
    setCarregandoChamadas,
  ] = useState(true);

  const [
    modalFormulario,
    setModalFormulario,
  ] = useState(false);

  const [
    modalExclusao,
    setModalExclusao,
  ] = useState(false);

  const [
    alunoSelecionado,
    setAlunoSelecionado,
  ] = useState<Aluno | null>(null);

  const [
    nome,
    setNome,
  ] = useState('');

  const [
    graduacao,
    setGraduacao,
  ] = useState('');

  const [
    turma,
    setTurma,
  ] = useState('criancas');

  const [
    modalFrequencia,
    setModalFrequencia,
  ] = useState(false);

  const [
    modalAnual,
    setModalAnual,
  ] = useState(false);

  const [
    mesSelecionado,
    setMesSelecionado,
  ] = useState(
    new Date().getMonth()
  );

  const [
    mostrarMeses,
    setMostrarMeses,
  ] = useState(false);

  const carregarDadosChamadas =
    useCallback(
      async () => {
        setCarregandoChamadas(true);

        const chamadasSalvas =
          await carregarPresencas();

        const chamadasAtuais:
          Chamada[] =
          chamadasSalvas !== null
            ? chamadasSalvas as Chamada[]
            : [];

        setChamadas(
          chamadasAtuais
        );

        setCarregandoChamadas(false);
      },
      []
    );

  useFocusEffect(
    useCallback(() => {
      carregarAlunosDados();

      carregarDadosChamadas();

      const removerListener =
        adicionarListener(
          (evento: Evento) => {
            if (
              evento ===
              'backup-restaurado'
            ) {
              carregarAlunosDados();

              carregarDadosChamadas();
            }
          }
        );

      return removerListener;
    }, [
      carregarAlunosDados,
      carregarDadosChamadas,
    ])
  );

  function abrirNovoAluno() {
    setAlunoSelecionado(null);

    setNome('');

    setGraduacao('');

    setTurma(
      'criancas'
    );

    setModalFormulario(true);
  }

  function abrirEdicao(
    aluno: Aluno
  ) {
    setAlunoSelecionado(
      aluno
    );

    setNome(
      aluno.nome
    );

    setGraduacao(
      aluno.graduacao
    );

    setTurma(
      aluno.turma ||
        'criancas'
    );

    setModalFormulario(true);
  }

  function fecharFormulario() {
    setModalFormulario(false);

    setAlunoSelecionado(null);

    setNome('');

    setGraduacao('');

    setTurma(
      'criancas'
    );
  }

  async function salvarAluno() {
    if (
      nome.trim() === '' ||
      graduacao.trim() === ''
    ) {
      alert(
        'Preencha todos os campos.'
      );

      return;
    }

    let resultado;

    if (
      alunoSelecionado
    ) {
      resultado =
        await editar(
          alunoSelecionado.id,
          nome,
          graduacao,
          turma
        );
    } else {
      resultado =
        await criar(
          nome,
          graduacao,
          turma
        );
    }

    if (
      !resultado.sucesso
    ) {
      alert(
        resultado.mensagem
      );

      return;
    }

    fecharFormulario();
  }

  function abrirExclusao(
    aluno: Aluno
  ) {
    setAlunoSelecionado(
      aluno
    );

    setModalExclusao(true);
  }

  function fecharExclusao() {
    setModalExclusao(false);

    setAlunoSelecionado(null);
  }

  async function excluirAlunoSelecionado() {
    if (
      !alunoSelecionado
    ) {
      return;
    }

    await excluir(
      alunoSelecionado.id
    );

    fecharExclusao();
  }

  function abrirFrequencia(
    aluno: Aluno
  ) {
    setAlunoSelecionado(
      aluno
    );

    setMesSelecionado(
      new Date().getMonth()
    );

    setMostrarMeses(
      false
    );

    setModalFrequencia(true);
  }

  function fecharFrequencia() {
    setModalFrequencia(false);

    setMostrarMeses(false);

    setAlunoSelecionado(null);
  }

  function abrirFrequenciaAnual() {
    setModalAnual(true);
  }

  function voltarParaFrequenciaMensal() {
    setModalAnual(false);
  }

  function fecharFrequenciaAnual() {
    setModalAnual(false);

    setModalFrequencia(false);

    setAlunoSelecionado(null);
  }

  function alternarMeses() {
    setMostrarMeses(
      !mostrarMeses
    );
  }

  function selecionarMes(
    indice: number
  ) {
    setMesSelecionado(
      indice
    );

    setMostrarMeses(false);
  }

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
            Carregando alunos...
          </Text>
        </View>
      </NavegacaoSwipe>
    );
  }

  const anoAtual =
    new Date().getFullYear();

  const frequenciaAluno =
    alunoSelecionado
      ? calcularFrequenciaMes(
          chamadas,
          alunoSelecionado.id,
          mesSelecionado,
          anoAtual
        )
      : null;

  const frequenciaAnual =
    alunoSelecionado
      ? calcularFrequenciaAnual(
          chamadas,
          alunoSelecionado.id,
          anoAtual
        )
      : null;

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
          Alunos
        </Text>

        <TouchableOpacity
          style={
            styles.botaoNovo
          }
          onPress={
            abrirNovoAluno
          }
        >
          <Text
            style={
              styles.textoBotaoNovo
            }
          >
            + Novo aluno
          </Text>
        </TouchableOpacity>

        <FlatList
          data={alunos}
          keyExtractor={
            (item) =>
              item.id.toString()
          }
          renderItem={({
            item,
          }) => {
            const frequencia =
              calcularFrequenciaTotal(
                chamadas,
                item.id
              );

            const alunoComFrequencia =
              {
                ...item,
                presencas:
                  frequencia.presencas,
                faltas:
                  frequencia.faltas,
              };

            return (
              <AlunoCard
                aluno={
                  alunoComFrequencia
                }
                onEditar={
                  abrirEdicao
                }
                onExcluir={
                  abrirExclusao
                }
                onVerFrequencia={
                  abrirFrequencia
                }
              />
            );
          }}
        />

        <Modal
          visible={
            modalFormulario
          }
          transparent={true}
          animationType="fade"
        >
          <View
            style={
              styles.overlay
            }
          >
            <AlunoForm
              nome={nome}
              graduacao={
                graduacao
              }
              turma={turma}
              setNome={
                setNome
              }
              setGraduacao={
                setGraduacao
              }
              setTurma={
                setTurma
              }
              onSalvar={
                salvarAluno
              }
              onCancelar={
                fecharFormulario
              }
            />
          </View>
        </Modal>

        <ConfirmacaoModal
          visivel={
            modalExclusao
          }
          aluno={
            alunoSelecionado
          }
          onConfirmar={
            excluirAlunoSelecionado
          }
          onCancelar={
            fecharExclusao
          }
        />

        <FrequenciaModal
          visivel={
            modalFrequencia
          }
          aluno={
            alunoSelecionado
          }
          mesSelecionado={
            mesSelecionado
          }
          ano={anoAtual}
          frequencia={
            frequenciaAluno
          }
          mostrarMeses={
            mostrarMeses
          }
          onAlternarMeses={
            alternarMeses
          }
          onSelecionarMes={
            selecionarMes
          }
          onVerAnual={
            abrirFrequenciaAnual
          }
          onFechar={
            fecharFrequencia
          }
        />

        <FrequenciaAnualModal
          visivel={
            modalAnual
          }
          aluno={
            alunoSelecionado
          }
          ano={anoAtual}
          frequenciaAnual={
            frequenciaAnual
          }
          chamadas={
            chamadas
          }
          onVoltar={
            voltarParaFrequenciaMensal
          }
          onFechar={
            fecharFrequenciaAnual
          }
          calcularFrequenciaMes={
            calcularFrequenciaMes
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
      marginBottom: 5,
    },

    subtitulo: {
      fontSize: 15,
      color: '#aaa',
      lineHeight: 21,
      marginBottom: 20,
    },

    botaoNovo: {
      backgroundColor: '#333',
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 18,
    },

    textoBotaoNovo: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },

    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:
        'rgba(0, 0, 0, 0.55)',
    },
  });
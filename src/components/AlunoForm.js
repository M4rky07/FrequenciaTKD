import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const graduacoes = [
  'Faixa Branca',
  'Faixa Amarela',
  'Faixa Cinza',
  'Faixa Laranja',
  'Faixa Verde Clara',
  'Faixa Verde Escura',
  'Faixa Azul Clara',
  'Faixa Azul Escura',
  'Faixa Vermelha Clara',
  'Faixa Vermelha Escura',
  'Faixa Preta',
];

export default function AlunoForm({
  nome,
  graduacao,
  turma,
  setNome,
  setGraduacao,
  setTurma,
  onSalvar,
  onCancelar,
}) {
  return (
    <View
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.conteudo
        }
      >
        <Text
          style={styles.titulo}
        >
          Novo aluno
        </Text>

        <Text
          style={styles.label}
        >
          Nome
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do aluno"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={
            setNome
          }
        />

        <Text
          style={styles.label}
        >
          Turma
        </Text>

        <View
          style={styles.listaTurmas}
        >
          <TouchableOpacity
            style={[
              styles.opcaoTurma,
              turma ===
                'criancas' &&
                styles.opcaoSelecionada,
            ]}
            onPress={() =>
              setTurma(
                'criancas'
              )
            }
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.textoOpcao,
                turma ===
                  'criancas' &&
                  styles.textoOpcaoSelecionada,
              ]}
            >
              🧒 Crianças
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.opcaoTurma,
              turma ===
                'adultos' &&
                styles.opcaoSelecionada,
            ]}
            onPress={() =>
              setTurma(
                'adultos'
              )
            }
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.textoOpcao,
                turma ===
                  'adultos' &&
                  styles.textoOpcaoSelecionada,
              ]}
            >
              👥 Adolescentes/Adultos
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={styles.label}
        >
          Graduação
        </Text>

        <View
          style={
            styles.listaGraduacoes
          }
        >
          {graduacoes.map(
            (item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.opcaoGraduacao,
                  graduacao ===
                    item &&
                    styles.opcaoSelecionada,
                ]}
                onPress={() =>
                  setGraduacao(
                    item
                  )
                }
                activeOpacity={
                  0.7
                }
              >
                <Text
                  style={[
                    styles.textoOpcao,
                    graduacao ===
                      item &&
                      styles.textoOpcaoSelecionada,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <TouchableOpacity
          style={
            styles.botao
          }
          onPress={
            onSalvar
          }
        >
          <Text
            style={
              styles.textoBotao
            }
          >
            Salvar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            styles.botaoCancelar
          }
          onPress={
            onCancelar
          }
        >
          <Text
            style={
              styles.cancelar
            }
          >
            Cancelar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      width: '88%',
      maxHeight: '90%',
      backgroundColor: '#fff',
      borderRadius: 14,
    },

    conteudo: {
      padding: 22,
    },

    titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#111',
      marginBottom: 22,
    },

    label: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#444',
      marginBottom: 7,
    },

    input: {
      borderWidth: 1,
      borderColor: '#d5d5d5',
      borderRadius: 9,
      paddingHorizontal: 13,
      paddingVertical: 12,
      fontSize: 16,
      color: '#111',
      marginBottom: 17,
      backgroundColor: '#fafafa',
    },

    listaTurmas: {
      marginBottom: 17,
    },

    opcaoTurma: {
      borderWidth: 1,
      borderColor: '#d5d5d5',
      borderRadius: 9,
      paddingVertical: 11,
      paddingHorizontal: 13,
      marginBottom: 7,
      backgroundColor: '#fafafa',
    },

    listaGraduacoes: {
      marginBottom: 15,
    },

    opcaoGraduacao: {
      borderWidth: 1,
      borderColor: '#d5d5d5',
      borderRadius: 9,
      paddingVertical: 11,
      paddingHorizontal: 13,
      marginBottom: 7,
      backgroundColor: '#fafafa',
    },

    opcaoSelecionada: {
      backgroundColor: '#333',
      borderColor: '#333',
    },

    textoOpcao: {
      fontSize: 15,
      color: '#333',
    },

    textoOpcaoSelecionada: {
      color: '#fff',
      fontWeight: 'bold',
    },

    botao: {
      backgroundColor: '#111',
      paddingVertical: 14,
      borderRadius: 9,
      alignItems: 'center',
      marginTop: 5,
    },

    textoBotao: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },

    botaoCancelar: {
      paddingVertical: 13,
      alignItems: 'center',
      marginTop: 5,
    },

    cancelar: {
      color: '#555',
      fontSize: 15,
      fontWeight: 'bold',
    },
  });
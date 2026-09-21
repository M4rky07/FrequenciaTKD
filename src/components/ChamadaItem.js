import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function ChamadaItem({
  aluno,
  presente,
  onToggle,
}) {
  function obterTexto() {
    if (presente === null) {
      return 'Não marcado';
    }

    if (presente) {
      return 'Presente';
    }

    return 'Falta';
  }

  function obterEstilo() {
    if (presente === null) {
      return styles.botaoNaoMarcado;
    }

    if (presente) {
      return styles.botaoPresente;
    }

    return styles.botaoFalta;
  }

  function obterEstiloContainer() {
    if (presente === null) {
      return styles.containerNaoMarcado;
    }

    if (presente) {
      return styles.containerPresente;
    }

    return styles.containerFalta;
  }

  return (
    <View
      style={[
        styles.container,
        obterEstiloContainer(),
      ]}
    >
      <View style={styles.informacoes}>
        <Text style={styles.nome}>
          {aluno.nome}
        </Text>

        <Text style={styles.graduacao}>
          {aluno.graduacao}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.botao,
          obterEstilo(),
        ]}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <Text style={styles.textoBotao}>
          {obterTexto()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
  },

  containerNaoMarcado: {
    backgroundColor: '#111',
    borderColor: '#2a2a2a',
  },

  containerPresente: {
    backgroundColor: '#101c12',
    borderColor: '#234d2a',
  },

  containerFalta: {
    backgroundColor: '#1c1010',
    borderColor: '#4d2323',
  },

  informacoes: {
    flex: 1,
    paddingRight: 10,
  },

  nome: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },

  graduacao: {
    fontSize: 14,
    color: '#999',
  },

  botao: {
    width: 115,
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
  },

  botaoNaoMarcado: {
    backgroundColor: '#444',
  },

  botaoPresente: {
    backgroundColor: '#2e7d32',
  },

  botaoFalta: {
    backgroundColor: '#b00020',
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
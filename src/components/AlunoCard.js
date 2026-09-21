import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function AlunoCard({
  aluno,
  onEditar,
  onExcluir,
  onVerFrequencia,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.nome}>
        {aluno.nome}
      </Text>

      <Text style={styles.graduacao}>
        {aluno.graduacao}
      </Text>

      <View style={styles.divisor} />

      <View style={styles.estatisticas}>
        <View style={styles.estatistica}>
          <Text style={styles.valor}>
            {aluno.presencas}
          </Text>

          <Text style={styles.label}>
            Presenças
          </Text>
        </View>

        <View style={styles.estatistica}>
          <Text style={styles.valor}>
            {aluno.faltas}
          </Text>

          <Text style={styles.label}>
            Faltas
          </Text>
        </View>
      </View>

      <View style={styles.botoes}>
        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={() => onEditar(aluno)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>
            Editar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={() => onExcluir(aluno)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>
            Excluir
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.botaoFrequencia}
        onPress={() => onVerFrequencia(aluno)}
        activeOpacity={0.7}
      >
        <Text style={styles.textoBotao}>
          Ver frequência
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    padding: 18,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },

  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },

  graduacao: {
    fontSize: 15,
    color: '#999',
  },

  divisor: {
    height: 1,
    backgroundColor: '#2a2a2a',
    marginVertical: 15,
  },

  estatisticas: {
    flexDirection: 'row',
    marginBottom: 15,
  },

  estatistica: {
    flex: 1,
  },

  valor: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },

  label: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },

  botoes: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },

  botaoEditar: {
    flex: 1,
    backgroundColor: '#444',
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
  },

  botaoExcluir: {
    flex: 1,
    backgroundColor: '#b00020',
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
  },

  botaoFrequencia: {
    backgroundColor: '#222',
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
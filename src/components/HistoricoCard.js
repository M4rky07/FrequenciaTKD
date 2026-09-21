import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function HistoricoCard({
  chamada,
  quantidadeAlunos,
  onVerDetalhes,
  onEditar,
  onExcluir,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.titulo}>
            Chamada
          </Text>

          <Text style={styles.data}>
            {chamada.data
              .split('-')
              .reverse()
              .join('/')}
          </Text>
        </View>

        <View style={styles.quantidadeContainer}>
          <Text style={styles.quantidade}>
            {quantidadeAlunos}
          </Text>

          <Text style={styles.labelQuantidade}>
            alunos
          </Text>
        </View>
      </View>

      <View style={styles.divisor} />

      <TouchableOpacity
        style={styles.botaoDetalhes}
        onPress={() => onVerDetalhes(chamada)}
        activeOpacity={0.7}
      >
        <Text style={styles.textoBotao}>
          Ver detalhes
        </Text>
      </TouchableOpacity>

      <View style={styles.botoesSecundarios}>
        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={() => onEditar(chamada)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>
            Editar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={() => onExcluir(chamada)}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>
            Excluir
          </Text>
        </TouchableOpacity>
      </View>
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

  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titulo: {
    fontSize: 15,
    color: '#888',
    marginBottom: 4,
  },

  data: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },

  quantidadeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },

  quantidade: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },

  labelQuantidade: {
    fontSize: 12,
    color: '#888',
    marginTop: 1,
  },

  divisor: {
    height: 1,
    backgroundColor: '#2a2a2a',
    marginVertical: 15,
  },

  botaoDetalhes: {
    backgroundColor: '#222',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },

  botoesSecundarios: {
    flexDirection: 'row',
    gap: 10,
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

  textoBotao: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

export default function ConfirmacaoModal({
  visivel,
  aluno,
  onConfirmar,
  onCancelar,
}) {
  return (
    <Modal
      visible={visivel}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>

        <View style={styles.container}>

          <View style={styles.icone}>
            <Text style={styles.iconeTexto}>
              !
            </Text>
          </View>

          <Text style={styles.titulo}>
            Excluir aluno
          </Text>

          <Text style={styles.mensagem}>
            Deseja realmente excluir
            {' '}
            <Text style={styles.nome}>
              {aluno?.nome}
            </Text>
            ?
          </Text>

          <View style={styles.botoes}>

            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={onCancelar}
            >
              <Text style={styles.textoCancelar}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={onConfirmar}
            >
              <Text style={styles.textoExcluir}>
                Excluir
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },

  container: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 14,
    alignItems: 'center',
  },

  icone: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#fff1f1',
    borderWidth: 1,
    borderColor: '#b00020',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  iconeTexto: {
    color: '#b00020',
    fontSize: 24,
    fontWeight: 'bold',
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 10,
  },

  mensagem: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: 22,
  },

  nome: {
    fontWeight: 'bold',
    color: '#111',
  },

  botoes: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },

  botaoCancelar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },

  botaoExcluir: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#b00020',
    alignItems: 'center',
  },

  textoCancelar: {
    color: '#333',
    fontWeight: 'bold',
  },

  textoExcluir: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
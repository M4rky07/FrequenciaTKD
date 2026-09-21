import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

export default function ConfirmacaoChamadaModal({
  visivel,
  chamada,
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

          <Text style={styles.titulo}>
            Excluir chamada
          </Text>

          <Text style={styles.mensagem}>
            Deseja realmente excluir a chamada do dia{' '}
            {chamada?.data
              ?.split('-')
              .reverse()
              .join('/')}
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
    backgroundColor:
      'rgba(0, 0, 0, 0.5)',
  },

  container: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  mensagem: {
    fontSize: 16,
    marginBottom: 20,
  },

  botoes: {
    flexDirection: 'row',
    gap: 10,
  },

  botaoCancelar: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },

  botaoExcluir: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#b00020',
    alignItems: 'center',
  },

  textoCancelar: {
    fontWeight: 'bold',
  },

  textoExcluir: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
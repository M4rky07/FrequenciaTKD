import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

export default function ConfirmacaoChamadaModal({
  visivel,
  presentes,
  faltas,
  total,
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
            Confirmar chamada
          </Text>

          <Text style={styles.mensagem}>
            Confira os dados antes de salvar:
          </Text>

          <View style={styles.resumo}>
            <View style={styles.item}>
              <Text style={styles.valor}>
                {presentes}
              </Text>

              <Text style={styles.label}>
                Presentes
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.valor}>
                {faltas}
              </Text>

              <Text style={styles.label}>
                Faltas
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.valor}>
                {total}
              </Text>

              <Text style={styles.label}>
                Total
              </Text>
            </View>
          </View>

          <View style={styles.botoes}>
            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={onCancelar}
              activeOpacity={0.7}
            >
              <Text style={styles.textoCancelar}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoConfirmar}
              onPress={onConfirmar}
              activeOpacity={0.7}
            >
              <Text style={styles.textoConfirmar}>
                Confirmar
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
    padding: 22,
    borderRadius: 14,
  },

  titulo: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },

  mensagem: {
    fontSize: 15,
    color: '#666',
    marginBottom: 18,
  },

  resumo: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 20,
  },

  item: {
    flex: 1,
    alignItems: 'center',
  },

  valor: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
  },

  label: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
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
    backgroundColor: '#333',
    alignItems: 'center',
  },

  textoCancelar: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
  },

  textoConfirmar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';

const meses = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export default function FrequenciaModal({
  visivel,
  aluno,
  mesSelecionado,
  ano,
  frequencia,
  mostrarMeses,
  onAlternarMeses,
  onSelecionarMes,
  onVerAnual,
  onFechar,
}) {
  return (
    <Modal
      visible={visivel}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>

        <View style={styles.modal}>

          <ScrollView
            showsVerticalScrollIndicator={false}
          >

            <Text style={styles.titulo}>
              Frequência
            </Text>

            {aluno && (
              <>
                <Text style={styles.nome}>
                  {aluno.nome}
                </Text>

                <Text style={styles.graduacao}>
                  {aluno.graduacao}
                </Text>

                <TouchableOpacity
                  style={styles.seletorMes}
                  onPress={onAlternarMeses}
                  activeOpacity={0.7}
                >
                  <Text style={styles.textoSeletor}>
                    {meses[mesSelecionado]} {ano}
                  </Text>

                  <Text style={styles.seta}>
                    {mostrarMeses ? '▲' : '▼'}
                  </Text>
                </TouchableOpacity>

                {mostrarMeses && (
                  <View style={styles.listaMeses}>
                    {meses.map((mes, indice) => (
                      <TouchableOpacity
                        key={mes}
                        style={[
                          styles.itemMes,
                          indice === mesSelecionado &&
                            styles.itemMesSelecionado,
                        ]}
                        onPress={() =>
                          onSelecionarMes(indice)
                        }
                      >
                        <Text
                          style={[
                            styles.textoMes,
                            indice === mesSelecionado &&
                              styles.textoMesSelecionado,
                          ]}
                        >
                          {mes}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                <View style={styles.resumo}>

                  <View style={styles.informacao}>
                    <Text style={styles.label}>
                      Presenças
                    </Text>

                    <Text style={styles.presencas}>
                      {frequencia?.presencas}
                    </Text>
                  </View>

                  <View style={styles.informacao}>
                    <Text style={styles.label}>
                      Faltas
                    </Text>

                    <Text style={styles.faltas}>
                      {frequencia?.faltas}
                    </Text>
                  </View>

                  <View style={styles.informacao}>
                    <Text style={styles.label}>
                      Total de aulas
                    </Text>

                    <Text style={styles.valor}>
                      {frequencia?.total}
                    </Text>
                  </View>

                  <View style={styles.informacaoUltima}>
                    <Text style={styles.label}>
                      Frequência
                    </Text>

                    <Text style={styles.frequencia}>
                      {frequencia?.frequencia.toFixed(1)}%
                    </Text>
                  </View>

                </View>

                <TouchableOpacity
                  style={styles.botaoAnual}
                  onPress={onVerAnual}
                  activeOpacity={0.7}
                >
                  <Text style={styles.textoBotao}>
                    Ver ano inteiro
                  </Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={styles.botaoFechar}
              onPress={onFechar}
              activeOpacity={0.7}
            >
              <Text style={styles.textoBotao}>
                Fechar
              </Text>
            </TouchableOpacity>

          </ScrollView>

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

  modal: {
    width: '88%',
    maxHeight: '85%',
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 14,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },

  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },

  graduacao: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
    marginBottom: 18,
  },

  seletorMes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 9,
    paddingHorizontal: 14,
    paddingVertical: 13,
    backgroundColor: '#fafafa',
  },

  textoSeletor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },

  seta: {
    fontSize: 13,
    color: '#555',
  },

  listaMeses: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 9,
    marginTop: 8,
    overflow: 'hidden',
  },

  itemMes: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  itemMesSelecionado: {
    backgroundColor: '#eeeeee',
  },

  textoMes: {
    fontSize: 15,
    color: '#333',
  },

  textoMesSelecionado: {
    fontWeight: 'bold',
    color: '#111',
  },

  resumo: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    marginTop: 15,
    overflow: 'hidden',
  },

  informacao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },

  informacaoUltima: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 13,
  },

  label: {
    fontSize: 15,
    color: '#555',
  },

  valor: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111',
  },

  presencas: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2e7d32',
  },

  faltas: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#b00020',
  },

  frequencia: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#111',
  },

  botaoAnual: {
    backgroundColor: '#444',
    paddingVertical: 13,
    borderRadius: 9,
    alignItems: 'center',
    marginTop: 15,
  },

  botaoFechar: {
    backgroundColor: '#111',
    paddingVertical: 13,
    borderRadius: 9,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
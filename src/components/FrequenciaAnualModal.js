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

export default function FrequenciaAnualModal({
  visivel,
  aluno,
  ano,
  frequenciaAnual,
  chamadas,
  onVoltar,
  onFechar,
  calcularFrequenciaMes,
}) {
  return (
    <Modal
      visible={visivel}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.overlay}>

        <View style={styles.modal}>

          <ScrollView
            showsVerticalScrollIndicator={false}
          >

            <TouchableOpacity
              style={styles.botaoVoltar}
              onPress={onVoltar}
            >
              <Text style={styles.textoVoltar}>
                ← Voltar
              </Text>
            </TouchableOpacity>

            <Text style={styles.titulo}>
              Frequência anual
            </Text>

            {aluno && (
              <>
                <Text style={styles.nome}>
                  {aluno.nome}
                </Text>

                <Text style={styles.graduacao}>
                  {aluno.graduacao}
                </Text>

                <Text style={styles.ano}>
                  {ano}
                </Text>

                <View style={styles.resumo}>

                  <View style={styles.resumoItem}>
                    <Text style={styles.resumoLabel}>
                      Presenças
                    </Text>

                    <Text style={styles.presencas}>
                      {frequenciaAnual?.presencas}
                    </Text>
                  </View>

                  <View style={styles.resumoItem}>
                    <Text style={styles.resumoLabel}>
                      Faltas
                    </Text>

                    <Text style={styles.faltas}>
                      {frequenciaAnual?.faltas}
                    </Text>
                  </View>

                  <View style={styles.resumoItem}>
                    <Text style={styles.resumoLabel}>
                      Aulas
                    </Text>

                    <Text style={styles.valor}>
                      {frequenciaAnual?.total}
                    </Text>
                  </View>

                  <View style={styles.resumoItemUltimo}>
                    <Text style={styles.resumoLabel}>
                      Frequência
                    </Text>

                    <Text style={styles.frequencia}>
                      {frequenciaAnual?.frequencia.toFixed(1)}%
                    </Text>
                  </View>

                </View>

                <Text style={styles.tituloMensal}>
                  Resumo por mês
                </Text>

                {meses.map((mes, indice) => {
                  const frequencia =
                    calcularFrequenciaMes(
                      chamadas,
                      aluno.id,
                      indice,
                      ano
                    );

                  return (
                    <View
                      key={mes}
                      style={styles.mes}
                    >

                      <View
                        style={styles.mesCabecalho}
                      >
                        <Text style={styles.nomeMes}>
                          {mes}
                        </Text>

                        <Text
                          style={styles.percentualMes}
                        >
                          {frequencia.frequencia.toFixed(1)}%
                        </Text>
                      </View>

                      <View
                        style={styles.detalhesMes}
                      >
                        <Text
                          style={styles.textoDetalhe}
                        >
                          Presenças:{' '}
                          {frequencia.presencas}
                        </Text>

                        <Text
                          style={styles.textoDetalhe}
                        >
                          Faltas:{' '}
                          {frequencia.faltas}
                        </Text>

                        <Text
                          style={styles.textoDetalhe}
                        >
                          Aulas:{' '}
                          {frequencia.total}
                        </Text>
                      </View>

                    </View>
                  );
                })}
              </>
            )}

            <TouchableOpacity
              style={styles.botaoFechar}
              onPress={onFechar}
            >
              <Text style={styles.textoBotaoFechar}>
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
    width: '90%',
    maxHeight: '90%',
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 14,
  },

  botaoVoltar: {
    marginBottom: 15,
  },

  textoVoltar: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
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
  },

  ano: {
    fontSize: 16,
    color: '#777',
    marginTop: 4,
    marginBottom: 18,
  },

  resumo: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 22,
  },

  resumoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },

  resumoItemUltimo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 13,
  },

  resumoLabel: {
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

  tituloMensal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 12,
  },

  mes: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#fff',
  },

  mesCabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  nomeMes: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
  },

  percentualMes: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111',
  },

  detalhesMes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textoDetalhe: {
    fontSize: 13,
    color: '#666',
  },

  botaoFechar: {
    backgroundColor: '#111',
    paddingVertical: 14,
    borderRadius: 9,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBotaoFechar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
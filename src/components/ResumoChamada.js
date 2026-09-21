import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function ResumoChamada({
  presentes,
  faltas,
  total,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Resumo da chamada
      </Text>

      <View style={styles.informacoes}>
        <View style={styles.informacao}>
          <Text style={styles.valor}>
            {presentes}
          </Text>

          <Text style={styles.label}>
            Presentes
          </Text>
        </View>

        <View style={styles.informacao}>
          <Text style={styles.valor}>
            {faltas}
          </Text>

          <Text style={styles.label}>
            Faltas
          </Text>
        </View>

        <View style={styles.informacao}>
          <Text style={styles.valor}>
            {total}
          </Text>

          <Text style={styles.label}>
            Total
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginBottom: 5,
  },

  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },

  informacoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  informacao: {
    alignItems: 'center',
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
    marginTop: 3,
  },
});
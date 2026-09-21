import { View, Text, FlatList, StyleSheet } from 'react-native';

import alunos from '../data/alunos.json';

export default function Inicio() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alunos do Taekwondo</Text>

      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.aluno}>
            <Text style={styles.nome}>{item.nome}</Text>

            <Text>{item.graduacao}</Text>

            <Text>
              Presenças: {item.presencas} | Faltas: {item.faltas}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  aluno: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
import {
  useRef,
} from 'react';

import {
  View,
  StyleSheet,
  PanResponder,
} from 'react-native';

import {
  usePathname,
  router,
} from 'expo-router';

const telas = [
  'index',
  'chamada',
  'historico',
  'backup',
];

export default function NavegacaoSwipe({
  children,
}) {
  const pathname =
    usePathname();

  const panResponder =
    useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder:
          (_, gestureState) => {
            const movimentoHorizontal =
              Math.abs(
                gestureState.dx
              ) >
              Math.abs(
                gestureState.dy
              );

            return (
              movimentoHorizontal &&
              Math.abs(
                gestureState.dx
              ) > 20
            );
          },

        onPanResponderRelease:
          (_, gestureState) => {
            const distanciaX =
              gestureState.dx;

            const distanciaY =
              gestureState.dy;

            const movimentoHorizontal =
              Math.abs(
                distanciaX
              ) >
              Math.abs(
                distanciaY
              );

            const distanciaMinima =
              60;

            if (
              !movimentoHorizontal ||
              Math.abs(
                distanciaX
              ) < distanciaMinima
            ) {
              return;
            }

            const nomeTela =
              pathname
                .split('/')
                .filter(Boolean)
                .pop();

            const telaAtual =
              nomeTela || 'index';

            const indiceAtual =
              telas.indexOf(
                telaAtual
              );

            if (
              indiceAtual === -1
            ) {
              return;
            }

            /*
             * Arrastou para a esquerda:
             * próxima tela.
             */
            if (
              distanciaX < 0
            ) {
              const proximaTela =
                indiceAtual + 1;

              if (
                proximaTela <
                telas.length
              ) {
                router.navigate(
                  `/${telas[proximaTela]}`
                );
              }

              return;
            }

            /*
             * Arrastou para a direita:
             * tela anterior.
             */
            if (
              distanciaX > 0
            ) {
              const telaAnterior =
                indiceAtual - 1;

              if (
                telaAnterior >= 0
              ) {
                router.navigate(
                  `/${telas[telaAnterior]}`
                );
              }
            }
          },
      })
    ).current;

  return (
    <View
      style={styles.container}
      {...panResponder.panHandlers}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
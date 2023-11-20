import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useState } from 'react'
import { Button, Card, Dialog, FAB, IconButton, Portal, Text } from 'react-native-paper'
import { ScrollView } from 'react-native'

const Locacoes = ({ navigation }) => {

  const [locacoes, setLocacoes] = useState([])
  const [idExcluir, setIdExcluir] = useState(0)

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);


  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('locacoes').then(resultado => {
        resultado = JSON.parse(resultado) || []
        setLocacoes(resultado)
      })
    }, [])
  );

  function carregarDados() {
    AsyncStorage.getItem('locacoes').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setLocacoes(resultado)
    })
  }

  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    locacoes.splice(idExcluir, 1)
    AsyncStorage.setItem('locacoes', JSON.stringify(locacoes))
    carregarDados()
    setVisible(false)
  }

  return (
    <>
      <ScrollView style={{ padding: 10 }}>
        {locacoes.map((item, i) => (
          <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
            <Card.Content >
              <Text variant="bodyMedium">Custo: R$ {item.custo}</Text>
              <Text variant="bodyMedium">Início da locação: {item.inicioLocacao}</Text>
              <Text variant="bodyMedium">Fim da locação: {item.fimLocacao}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton icon='pencil' iconColor='#009EFF' onPress={() => navigation.push('locacoes-form', { id: i, locacao: item })} />
              <IconButton icon='delete' iconColor='#E23F29' onPress={() => confirmarExclusao(i)} />
            </Card.Actions>
          </Card>
        ))}

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyLarge">Deseja realmente excluir?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={excluir}>Sim</Button>
              <Button onPress={hideDialog}>Não</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

      </ScrollView>
      <FAB
        mode='elevated'
        icon="plus"
        style={{ position: 'absolute', right: 10, bottom: 10, backgroundColor: "#2ECC71" }}
        onPress={() => navigation.push('locacoes-form')}
        color='white'
      />

    </>
  )
}

export default Locacoes
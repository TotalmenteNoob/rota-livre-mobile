import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useState } from 'react'
import { Button, Card, Dialog, FAB, IconButton, Portal, Text } from 'react-native-paper'
import { ScrollView } from 'react-native'

const Carros = ({ navigation }) => {

  const [carros, setCarros] = useState([])
  const [idExcluir, setIdExcluir] = useState(0)

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);


  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('carros').then(resultado => {
        resultado = JSON.parse(resultado) || []
        setCarros(resultado)
      })
    }, [])
  );

  function carregarDados() {
    AsyncStorage.getItem('carros').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setCarros(resultado)
    })
  }

  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    carros.splice(idExcluir, 1)
    AsyncStorage.setItem('carros', JSON.stringify(carros))
    carregarDados()
    setVisible(false)
  }

  return (
    <>
      <ScrollView style={{ padding: 10 }}>
        {carros.map((item, i) => (
          <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
            <Card.Content >
              <Text variant="titleLarge">{item.marca} {item.modelo}</Text>
              <Text variant="bodyMedium">Quilometragem: {item.quilometragem}</Text>
              <Text variant="bodyMedium">Placa: {item.placa}</Text>
              <Text variant="bodyMedium">Ano: {item.ano}</Text>
              <Text variant="bodyMedium">Carroceria: {item.tipoCarro}</Text>
              <Text variant="bodyMedium">Cor: {item.cor}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton icon='pencil' iconColor='#009EFF' onPress={() => navigation.push('carros-form', { id: i, carro: item })} />
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
        onPress={() => navigation.push('carros-form')}
        color='white'
      />

    </>
  )
}

export default Carros
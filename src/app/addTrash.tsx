import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

// Tipagem do resíduo
interface Residuo {
  id: string;
  tipo: string;
  descricao: string;
  quantidade: string;
}

const CadastroResiduos: React.FC = () => {
  const [residuos, setResiduos] = useState<Residuo[]>([]);
  const [form, setForm] = useState<Residuo>({
    id: '',
    tipo: '',
    descricao: '',
    quantidade: '',
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Atualiza os valores dos campos do formulário
  const handleInputChange = (field: keyof Residuo, value: string): void => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Adiciona ou edita um resíduo
  const handleSaveResiduo = (): void => {
    const { tipo, descricao, quantidade } = form;

    if (!tipo || !descricao || !quantidade) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos antes de salvar.');
      return;
    }

    if (editIndex !== null) {
      const updatedResiduos = [...residuos];
      updatedResiduos[editIndex] = { ...form, id: updatedResiduos[editIndex].id };
      setResiduos(updatedResiduos);
      setEditIndex(null);
    } else {
      setResiduos((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }

    setForm({ id: '', tipo: '', descricao: '', quantidade: '' });
  };

  // Exclui um resíduo
  const handleDeleteResiduo = (id: string): void => {
    setResiduos((prev) => prev.filter((residuo) => residuo.id !== id));
  };

  // Edita um resíduo
  const handleEditResiduo = (index: number): void => {
    setForm(residuos[index]);
    setEditIndex(index);
  };

  // Finaliza e confirma o cadastro
  const handleFinalizarCadastro = (): void => {
    if (residuos.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos um resíduo antes de finalizar o cadastro.');
      return;
    }

    // Ação final de cadastro (pode ser integração com backend ou outro processo)
    console.log('Resíduos cadastrados:', residuos);
    Alert.alert('Sucesso', 'Resíduos cadastrados com sucesso!');

    // Reseta o estado após o cadastro
    setResiduos([]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Cadastro de Resíduos</Text>

      {/* Picker para Tipo */}
      <Picker
        selectedValue={form.tipo}
        onValueChange={(value) => handleInputChange('tipo', value)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione o tipo de resíduo" value="" />
        <Picker.Item label="Plástico" value="Plástico" />
        <Picker.Item label="Metal" value="Metal" />
        <Picker.Item label="Papel" value="Papel" />
        <Picker.Item label="Eletrônico" value="Eletrônico" />
        <Picker.Item label="Vidro" value="Vidro" />
      </Picker>

      {/* Outros campos */}
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={form.descricao}
        onChangeText={(text) => handleInputChange('descricao', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={form.quantidade}
        keyboardType="numeric"
        onChangeText={(text) => handleInputChange('quantidade', text)}
      />

      {/* Botão para salvar (adicionar ou editar) */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveResiduo}>
        <Text style={styles.buttonText}>{editIndex !== null ? 'Salvar Edição' : 'Adicionar Resíduo'}</Text>
      </TouchableOpacity>

      {/* Lista de resíduos adicionados */}
      <FlatList
        data={residuos}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.residuoItem}>
            <Text style={styles.residuoText}>
              <Text style={styles.bold}>Tipo:</Text> {item.tipo}
            </Text>
            <Text style={styles.residuoText}>
              <Text style={styles.bold}>Descrição:</Text> {item.descricao}
            </Text>
            <Text style={styles.residuoText}>
              <Text style={styles.bold}>Quantidade:</Text> {item.quantidade}
            </Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => handleEditResiduo(index)}>
                <Ionicons name="pencil" size={24} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteResiduo(item.id)}>
                <Ionicons name="trash" size={24} color="#F44336" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Botão para finalizar o cadastro */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleFinalizarCadastro}>
        <Text style={styles.buttonText}>Finalizar Cadastro</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  residuoItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  residuoText: {
    fontSize: 16,
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

export default CadastroResiduos;
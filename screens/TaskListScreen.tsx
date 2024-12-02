import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TaskListScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // Carrega as tarefas salvas ao iniciar
  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) setTasks(JSON.parse(storedTasks));
      setLoading(false); // Definir como false após o carregamento
    };
    loadTasks();
  }, []);

  // Salva tarefas sempre que houver mudanças
  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Adiciona uma nova tarefa
  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  // Marca uma tarefa como concluída
  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  // Deleta uma tarefa
  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  // Função para exibir o skeleton loader
  const renderSkeleton = () => {
    return (
      <View style={styles.skeleton}>
        <View style={styles.skeletonItem} />
        <View style={styles.skeletonItem} />
        <View style={styles.skeletonItem} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>
      <TextInput
        placeholder="Digite uma nova tarefa" 
        value={newTask}
        onChangeText={setNewTask}
        style={styles.input}
        placeholderTextColor={'#FFFFFF'}
      />
      <Pressable style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Adicionar Tarefa</Text>
      </Pressable>
      {/* Exibe o skeleton se estiver carregando */}
      {loading ? (
        renderSkeleton()
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItem 
              task={item} 
              onToggleCompletion={toggleTaskCompletion} 
              onDelete={deleteTask} // Passando a função de deletar
            />
          )}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8A05BE',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F9F9F9',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: ''
  },
  input: {
    borderWidth: 1,
    borderColor: '#F9F9F9',
    padding: 12,
    borderRadius: 15,
    backgroundColor: '#8a2be2',
    marginBottom: 15,
    fontSize: 16,
    color: '#ffffff',
  
  },
  addButton: {
    backgroundColor: '#8A05BE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 20,
  },
  skeleton: {
    marginTop: 20,
  },
  skeletonItem: {
    backgroundColor: '#E0E0E0', // Cor de fundo do skeleton
    height: 50,
    marginBottom: 10,
    borderRadius: 15,
  },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggleCompletion: (id: number) => void;
  onDelete: (id: number) => void;  // Função para deletar a tarefa
}

export default function TaskItem({ task, onToggleCompletion, onDelete }: TaskItemProps) {
  return (
    <View style={[styles.taskContainer, task.completed && styles.completedTask]}>
      <TouchableOpacity onPress={() => onToggleCompletion(task.id)}>
        <Text style={task.completed ? styles.completedText : styles.taskText}>
          {task.text}
        </Text>
      </TouchableOpacity>
      {/* Botão de deletar */}
      <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Deletar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#9a05be',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedTask: {
    backgroundColor: '#f1f1f1', // Fundo mais claro para tarefas concluídas
    borderColor: '#8A05BE', // Cor de borda mais suave
    borderWidth: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#9a05be',
    fontWeight: 'bold'
  },
  completedText: {
    fontSize: 16,
    color: '#FFFFFF',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    backgroundColor: '#FF0000', // Cor de fundo para deletar (vermelho)
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

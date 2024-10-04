import { component$, useStore, $ } from '@builder.io/qwik';

export const TaskList = component$(() => {
  const state = useStore({
    tasks: [
      { id: 1, text: 'Estudiar Qwik', completed: false },
      { id: 2, text: 'Implementar lista de tareas', completed: false },
    ],
    newTaskText: '',
  });

  const addTask = $(() => {
    if (state.newTaskText.trim()) {
      state.tasks.push({
        id: Date.now(),
        text: state.newTaskText,
        completed: false,
      });
      state.newTaskText = '';
    }
  });

  const toggleTaskCompleted = $((taskId: number) => {
    const task = state.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  });

  const deleteTask = $((taskId: number) => {
    state.tasks = state.tasks.filter((t) => t.id !== taskId);
  });

  return (
    <div>
      <h1>Lista de Tareas</h1>

      <input
        type="text"
        placeholder="Nueva tarea"
        value={state.newTaskText}
        onInput$={(e) => (state.newTaskText = (e.target as HTMLInputElement).value)}
      />
      <button onClick$={addTask}>Agregar</button>

      <ul>
        {state.tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange$={() => toggleTaskCompleted(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <button onClick$={() => deleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
});

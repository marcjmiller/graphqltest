package com.redv.graphqltest.service;

import com.redv.graphqltest.exception.TodoNotFoundException;
import com.redv.graphqltest.model.CreateTodoInput;
import com.redv.graphqltest.model.Todo;
import com.redv.graphqltest.repo.TodoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TodoService {
  private final TodoRepository todoRepository;

  public Todo getTodo(Long id) {
    return todoRepository.findById(id).orElseThrow(TodoNotFoundException::new);
  }

  public List<Todo> getTodos() {
    return todoRepository.findAll();
  }

  public Todo createTodo(CreateTodoInput input) {
    return todoRepository.save(new Todo(input));
  }

  public Todo completeTodo(Long id) {
    Todo todo = todoRepository.findById(id).orElseThrow(TodoNotFoundException::new);
    todo.setCompleted(!todo.getCompleted());
    return todoRepository.save(todo);
  }

  public Todo deleteTodo(Long id) {
    Todo todo = todoRepository.findById(id).orElseThrow(TodoNotFoundException::new);
    todoRepository.deleteById(id);
    return todo;
  }
}

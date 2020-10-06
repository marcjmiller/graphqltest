package com.redv.graphqltest.resolver;

import com.redv.graphqltest.models.Todo;
import com.redv.graphqltest.repo.TodoRepository;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class TodoResolver implements GraphQLQueryResolver {
  @Autowired
  private TodoRepository todoRepository;

  @Autowired
  public void setTodoRepository(TodoRepository todoRepository) {
    this.todoRepository = todoRepository;
  }

  @Transactional
  public Todo todo(Long id) {
    return todoRepository.findById(id).orElse(null);
  }

  @Transactional
  public List<Todo> todos() {
    return todoRepository.findAll();
  }
}

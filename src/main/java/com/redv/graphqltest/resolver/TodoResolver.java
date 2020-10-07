package com.redv.graphqltest.resolver;

import com.redv.graphqltest.model.Todo;
import com.redv.graphqltest.service.TodoService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class TodoResolver implements GraphQLQueryResolver {
  private final TodoService todoService;

  public Todo todo(Long id) {
    return todoService.getTodo(id);
  }

  public List<Todo> todos() {
    return todoService.getTodos();
  }
}

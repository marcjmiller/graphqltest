package com.redv.graphqltest.resolver;

import com.redv.graphqltest.model.CreateTodoInput;
import com.redv.graphqltest.model.Todo;
import com.redv.graphqltest.service.TodoService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class TodoMutationResolver implements GraphQLMutationResolver {
  private final TodoService todoService;

  public Todo createTodo(CreateTodoInput input) {
    return todoService.createTodo(input);
  }

  public Todo completeTodo(Long id) {
    return todoService.completeTodo(id);
  }

  public Todo deleteTodo(Long id) {
    return todoService.deleteTodo(id);
  }
}

package com.redv.graphqltest.resolver;

import com.redv.graphqltest.models.Todo;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TodoResolver implements GraphQLQueryResolver {
  public Todo todo1 = new Todo("1", "Get stuff done", false);
  public Todo todo2 = new Todo("2", "Stuff I did", true);
  public List<Todo> todoList = Arrays.asList(todo1, todo2);

  public Todo getTodo(String id) {
    return todoList.stream()
      .filter(todo -> todo.getId().equals(id))
      .collect(Collectors.toList())
      .get(0);
  }

  public List<Todo> getTodos() {
    return todoList;
  }
}

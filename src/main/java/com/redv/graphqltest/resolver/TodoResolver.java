package com.redv.graphqltest.resolver;

import com.redv.graphqltest.models.Todo;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class TodoResolver implements GraphQLQueryResolver {
  public Todo todo1 = new Todo("1", "Get stuff done", false);
  public Todo todo2 = new Todo("2", "Stuff I did", true);

  public Todo getTodo(String id) {
    return todo1;
  }

  public List<Todo> getTodos() {
    return Arrays.asList(todo1, todo2);
  }
}

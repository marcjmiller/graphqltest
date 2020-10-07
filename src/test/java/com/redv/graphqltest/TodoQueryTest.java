package com.redv.graphqltest;

import com.graphql.spring.boot.test.GraphQLResponse;
import com.graphql.spring.boot.test.GraphQLTest;
import com.graphql.spring.boot.test.GraphQLTestTemplate;
import com.redv.graphqltest.model.Todo;
import com.redv.graphqltest.service.MemberService;
import com.redv.graphqltest.service.TodoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@GraphQLTest
public class TodoQueryTest extends BaseIntegrationTest {
  @Autowired
  private GraphQLTestTemplate graphQLTestTemplate;

  @MockBean
  private MemberService memberServiceMock;

  @MockBean
  private TodoService todoServiceMock;

  @Test
  public void getTodoById() throws Exception {
    Todo todo = new Todo(1L, "Get Stuff Done", false);
    when(todoServiceMock.getTodo(any())).thenReturn(todo);

    GraphQLResponse response = graphQLTestTemplate.postForResource("graphql/get-todo-by-id.graphql");

    assertTrue(response.isOk());

    assertEquals("1", response.get("$.data.todo.id"));
    assertEquals("Get Stuff Done", response.get("$.data.todo.text"));
    assertEquals("false", response.get("$.data.todo.completed"));
  }
}

package com.redv.graphqltest;

import com.graphql.spring.boot.test.GraphQLResponse;
import com.graphql.spring.boot.test.GraphQLTest;
import com.graphql.spring.boot.test.GraphQLTestTemplate;
import com.redv.graphqltest.model.CreateTodoInput;
import com.redv.graphqltest.model.Todo;
import com.redv.graphqltest.service.MemberService;
import com.redv.graphqltest.service.TodoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doReturn;


@GraphQLTest
public class TodoMutationTest extends BaseIntegrationTest {
  @Autowired
  private GraphQLTestTemplate graphQLTestTemplate;

  @MockBean
  MemberService memberServiceMock;

  @MockBean
  TodoService todoServiceMock;

  static CreateTodoInput input = new CreateTodoInput("New Todo");
  static Todo todo = new Todo(1L, "New Todo", false);

  @BeforeEach
  public void setUp() {
    todo.setCompleted(false);
  }

  @Test
  public void createTodo() throws Exception {
    doReturn(todo).when(todoServiceMock).createTodo(input);
    GraphQLResponse response = graphQLTestTemplate.postForResource("graphql/create-todo.graphql");

    System.out.println(response.getRawResponse());
    assertTrue(response.isOk());
    assertEquals("New Todo", response.get("$.data.createTodo.text"));
  }

  @Test
  public void completeTodo() throws Exception {
    todo.setCompleted(true);
    doReturn(todo).when(todoServiceMock).completeTodo(1L);
    GraphQLResponse response = graphQLTestTemplate.postForResource("graphql/complete-todo-by-id.graphql");

    assertTrue(response.isOk());
    assertEquals("true", response.get("$.data.completeTodo.completed"));
  }

  @Test
  public void deleteTodo() throws Exception {
    doReturn(todo).when(todoServiceMock).deleteTodo(1L);
    GraphQLResponse response = graphQLTestTemplate.postForResource("graphql/delete-todo-by-id.graphql");

    assertTrue(response.isOk());
    assertEquals("New Todo", response.get("$.data.deleteTodo.text"));
  }
}

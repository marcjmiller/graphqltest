package com.redv.graphqltest;

import com.graphql.spring.boot.test.GraphQLResponse;
import com.graphql.spring.boot.test.GraphQLTest;
import com.graphql.spring.boot.test.GraphQLTestTemplate;
import com.redv.graphqltest.model.Member;
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
public class MemberQueryTest extends BaseIntegrationTest {
  @Autowired
  private GraphQLTestTemplate graphQLTestTemplate;

  @MockBean
  private MemberService memberServiceMock;

  @MockBean
  private TodoService todoServiceMock;

  @Test
  public void getMemberById() throws Exception {
    Member member = new Member(1L, "Marc");
    when(memberServiceMock.getMember(any())).thenReturn(member);

    GraphQLResponse response = graphQLTestTemplate.postForResource("graphql/get-member-by-id.graphql");

    assertTrue(response.isOk());

    assertEquals("1", response.get("$.data.member.id"));
    assertEquals("Marc", response.get("$.data.member.name"));
  }
}

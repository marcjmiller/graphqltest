package com.redv.graphqltest;

import com.graphql.spring.boot.test.GraphQLResponse;
import com.graphql.spring.boot.test.GraphQLTest;
import com.graphql.spring.boot.test.GraphQLTestTemplate;
import com.redv.graphqltest.model.CreateMemberInput;
import com.redv.graphqltest.model.Member;
import com.redv.graphqltest.service.MemberService;
import com.redv.graphqltest.service.TodoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doReturn;


@GraphQLTest
public class MemberMutationTest extends BaseIntegrationTest {
  @Autowired
  private GraphQLTestTemplate graphQLTestTemplate;

  @MockBean
  MemberService memberServiceMock;

  @MockBean
  TodoService todoServiceMock;

  static CreateMemberInput input = new CreateMemberInput("Stu");
  static Member member = new Member(1L, "Stu");

  @Test
  public void createMember() throws Exception {
    doReturn(member).when(memberServiceMock).createMember(input);
    GraphQLResponse response = graphQLTestTemplate.postForResource("graphql/create-member.graphql");

    assertTrue(response.isOk());
    assertEquals("Stu", response.get("$.data.createMember.name"));
  }

  @Test
  public void deleteMember() throws Exception {
    doReturn(member).when(memberServiceMock).deleteMember(1L);
    GraphQLResponse response = graphQLTestTemplate.postForResource("graphql/delete-member-by-id.graphql");

    assertTrue(response.isOk());
    assertEquals("Stu", response.get("$.data.deleteMember.name"));
  }
}

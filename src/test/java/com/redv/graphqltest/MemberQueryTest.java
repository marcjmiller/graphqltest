package com.redv.graphqltest;

import com.graphql.spring.boot.test.GraphQLResponse;
import com.graphql.spring.boot.test.GraphQLTest;
import com.graphql.spring.boot.test.GraphQLTestTemplate;
import com.redv.graphqltest.models.Member;
import com.redv.graphqltest.repo.MemberRepository;
import com.redv.graphqltest.repo.TodoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@GraphQLTest
public class MemberQueryTest extends BaseIntegrationTest {
  @Autowired
  private GraphQLTestTemplate graphQLTestTemplate;

  @MockBean
  private MemberRepository memberRepository;

  @MockBean
  private TodoRepository todoRepository;

  @Test
  public void getMemberById() throws Exception {
    Member member = new Member(1L, "Marc");
    when(memberRepository.findById(any()))
      .thenReturn(Optional.of(member));

    GraphQLResponse response = graphQLTestTemplate.postForResource("graphql/get-member-by-id.graphql");

    assertTrue(response.isOk());

    assertEquals("1", response.get("$.data.getMember.id"));
    assertEquals("Marc", response.get("$.data.getMember.name"));
  }
}

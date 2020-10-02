package com.redv.graphqltest.resolver;

import com.redv.graphqltest.models.Member;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MemberResolver implements GraphQLQueryResolver {
  public Member member1 = new Member("1", "Marc");
  public Member member2 = new Member("2", "NotMarc");
  public List<Member> memberList = Arrays.asList(member1, member2);

  public Member getMember(String id) {
    return memberList.stream()
      .filter(member -> member.id.equals(id))
      .collect(Collectors.toList())
      .get(0);
  }

  public List<Member> getMembers() {
    return memberList;
  }
}

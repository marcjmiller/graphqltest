package com.redv.graphqltest.resolver;

import com.redv.graphqltest.model.Member;
import com.redv.graphqltest.service.MemberService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class MemberResolver implements GraphQLQueryResolver {
 private final MemberService memberService;

  public Member getMember(Long id) {
    return memberService.getMember(id);
  }

  public List<Member> getMembers() {
    return memberService.getMembers();
  }
}

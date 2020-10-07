package com.redv.graphqltest.resolver;

import com.redv.graphqltest.model.CreateMemberInput;
import com.redv.graphqltest.model.Member;
import com.redv.graphqltest.service.MemberService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class MemberMutationResolver implements GraphQLMutationResolver {
  private final MemberService memberService;

  public Member createMember(CreateMemberInput input) {
    return memberService.createMember(input);
  }

  public Member deleteMember(Long id) {
    return memberService.deleteMember(id);
  }
}

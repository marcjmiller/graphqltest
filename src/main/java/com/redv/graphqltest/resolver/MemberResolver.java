package com.redv.graphqltest.resolver;

import com.redv.graphqltest.models.Member;
import com.redv.graphqltest.repo.MemberRepository;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MemberResolver implements GraphQLQueryResolver {
  @Autowired
  private MemberRepository memberRepository;

  @Autowired
  public void setMemberRepository(MemberRepository memberRepository) {
    this.memberRepository = memberRepository;
  }

  public Member getMember(Long id) {
    return memberRepository.findById(id).orElse(null);
  }

  public List<Member> getMembers() {
    return memberRepository.findAll();
  }
}

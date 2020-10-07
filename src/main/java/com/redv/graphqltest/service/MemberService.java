package com.redv.graphqltest.service;

import com.redv.graphqltest.exception.MemberNotFoundException;
import com.redv.graphqltest.model.CreateMemberInput;
import com.redv.graphqltest.model.Member;
import com.redv.graphqltest.repo.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MemberService {
  private final MemberRepository memberRepository;

  public Member getMember(Long id) {
    return memberRepository.findById(id).orElseThrow(MemberNotFoundException::new);
  }

  public List<Member> getMembers() {
    return memberRepository.findAll();
  }

  public Member createMember(CreateMemberInput input) {
    return memberRepository.save(new Member(input));
  }

  public Member deleteMember(Long id) {
    Member member = memberRepository.findById(id).orElseThrow(MemberNotFoundException::new);
    memberRepository.deleteById(id);
    return member;
  }
}

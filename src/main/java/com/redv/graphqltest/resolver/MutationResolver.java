package com.redv.graphqltest.resolver;

import com.redv.graphqltest.exceptions.TodoNotFoundException;
import com.redv.graphqltest.models.CreateMemberInput;
import com.redv.graphqltest.models.CreateTodoInput;
import com.redv.graphqltest.models.Member;
import com.redv.graphqltest.models.Todo;
import com.redv.graphqltest.repo.MemberRepository;
import com.redv.graphqltest.repo.TodoRepository;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Component
@AllArgsConstructor
public class MutationResolver implements GraphQLMutationResolver {
  private final TodoRepository todoRepository;
  private final MemberRepository memberRepository;

  @Transactional
  public Todo createTodo(CreateTodoInput input) {
    return todoRepository.saveAndFlush(new Todo(input));
  }

  @Transactional
  public Todo completeTodo(Long id) {
    Todo todo = todoRepository.findById(id).orElseThrow(TodoNotFoundException::new);
    todo.setCompleted(!todo.getCompleted());
    return todoRepository.saveAndFlush(todo);
  }

  @Transactional
  public int deleteTodo(Long id) {
    int count = todoRepository.findAllById(Collections.singleton(id)).size();
    todoRepository.deleteById(id);
    return count;
  }

  @Transactional
  public Member createMember(CreateMemberInput input) {
    return memberRepository.saveAndFlush(new Member(input));
  }

  @Transactional
  public int deleteMember(Long id) {
    int count = memberRepository.findAllById(Collections.singleton(id)).size();
    memberRepository.deleteById(id);
    return count;
  }
}

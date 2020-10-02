package com.redv.graphqltest.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Todo {
  @Id
  private Long id;
  private String text;
  private Boolean completed;
}

package com.study.calendar.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
@Entity
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private LocalDate deadlineDate;
    private LocalTime deadlineTime;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}

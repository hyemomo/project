package com.study.calendar.Entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;
@Entity
public class Calendar {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    @OneToMany(mappedBy = "calendar", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Task> tasks;


}

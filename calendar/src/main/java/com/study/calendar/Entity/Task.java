package com.study.calendar.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;


@Entity//db에 있는 테이블을 의미!!!
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private Date due_date;

    @ManyToOne
    @JoinColumn(name = "calendar_id")
    private Calendar calendar;
}

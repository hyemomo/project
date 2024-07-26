package com.study.calendar.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity//db에 있는 테이블을 의미!!!
@Data
public class Board {
    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //identity mysql, mariadb에서 사용
    //sequence oracle에서 사용

    private Integer id;
    private String title;
    private String Content;
}

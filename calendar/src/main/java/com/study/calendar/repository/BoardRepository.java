package com.study.calendar.repository;

import com.study.calendar.Entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository <Board,Integer>{
}

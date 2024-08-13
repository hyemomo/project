package com.study.calendar.repository;

import com.study.calendar.Entity.Task;
import com.study.calendar.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.time.LocalDate;
import java.util.List;
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
    List<Task> findByDeadlineDate(LocalDate deadlineDate);
   void deleteById(Long id);
}

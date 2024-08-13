package com.study.calendar.dto;

import java.time.LocalDate;

public class TaskUpdateRequest {
    public LocalDate getDeadlineDate() {
        return deadlineDate;
    }

    public void setDeadlineDate(LocalDate deadlineDate) {
        this.deadlineDate = deadlineDate;
    }

    private LocalDate deadlineDate;
}

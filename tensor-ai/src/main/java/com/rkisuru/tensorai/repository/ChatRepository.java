package com.rkisuru.tensorai.repository;

import com.rkisuru.tensorai.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Integer> {

    @Query("SELECT c FROM Chat c WHERE c.userId = :userId AND c.id = :id")
    Optional<Chat> findByUserId(@Param("userId") String userId, @Param("id") Integer id);

    @Query("SELECT c FROM Chat c WHERE c.userId = :userId")
    List<Chat> findAllByUserId(@Param("userId") String userId);
}

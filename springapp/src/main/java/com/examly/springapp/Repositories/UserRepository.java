package com.examly.springapp.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.Models.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

}

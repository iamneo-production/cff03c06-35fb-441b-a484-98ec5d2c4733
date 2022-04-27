package com.examly.springapp.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import com.examly.springapp.Models.User;
import com.examly.springapp.Repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public User getUser(String id) {
		return userRepository.findById(id).orElse(null);
	}
	
	public User saveUser(User user) {
		
		return userRepository.save(user);
	}
	
	public void deleteUser(String id) {
		userRepository.deleteById(id);
	}

}


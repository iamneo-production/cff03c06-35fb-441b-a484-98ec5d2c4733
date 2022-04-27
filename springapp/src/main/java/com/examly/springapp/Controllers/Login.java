package com.examly.springapp.Controllers;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.Models.AuthenticationRequest;
import com.examly.springapp.Models.AuthenticationResponse;
import com.examly.springapp.Models.User;
import com.examly.springapp.Services.BabyUserDetailsService;
import com.examly.springapp.Services.JwtUtil;
import com.examly.springapp.Services.UserService;

@RestController
public class Login {
	//auth manager
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private BabyUserDetailsService userDetailsService;

	@Autowired
	private UserService userService;
	
	

	@RequestMapping(value = "/user/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationTokenUser(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {

		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));
			User user = userService.getUser(authenticationRequest.getUsername());
			if (!user.getUserRole().equals("USER")) {
				throw new BadCredentialsException("Incorrect username or password");

			}
		} catch (BadCredentialsException e) {

			throw new Exception("Incorrect username or password", e);

		}
		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		final String jwt = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new AuthenticationResponse(jwt));
	}

	@RequestMapping(value = "/admin/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationTokenAdmin(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {

		
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));
			User user = userService.getUser(authenticationRequest.getUsername());
			if (!user.getUserRole().equals("ADMIN")) {
				throw new BadCredentialsException("Incorrect username or password");

			}
		} catch (BadCredentialsException e) {

			throw new Exception("Incorrect username or password", e);

		}
		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		final String jwt = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new AuthenticationResponse(jwt));
	}

	@RequestMapping(value = "/user/login", method = RequestMethod.POST)
	public boolean loginUser(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {

		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));
			User user = userService.getUser(authenticationRequest.getUsername());
			if (!user.getUserRole().equals("USER")) {
				throw new BadCredentialsException("Incorrect username or password");

			}
		} catch (BadCredentialsException e) {

			return false;

		}
		return true;
	}

	@RequestMapping(value = "/admin/login", method = RequestMethod.POST)
	public boolean loginAdmin(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {

		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));
			User user = userService.getUser(authenticationRequest.getUsername());
			if (!user.getUserRole().equals("ADMIN")) {
				throw new BadCredentialsException("Incorrect username or password");

			}
		} catch (BadCredentialsException e) {
			return false;
		}
		return true;
	}
}

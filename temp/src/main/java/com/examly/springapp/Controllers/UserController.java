package com.examly.springapp.Controllers;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.Models.User;
import com.examly.springapp.Services.BabyUserDetailsService;
import com.examly.springapp.Services.JwtUtil;
import com.examly.springapp.Services.UserService;

@RestController
class UserController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private BabyUserDetailsService userDetailsService;

	@Autowired
	private UserService userService;
	
	Set<String> passwordSet=new HashSet<>(Arrays.asList(new String[] {"12345678","Passs@1234","password","11111111"
			,"1234567890","123456789","123123123","00000000","password1","iloveyou","777777777","55555555"
			,"15975343","123456789a","99999999","88888888","12345678910","12344321","1111111111","liverpool"
			,"fuckyou1","11223344","123456789q","999999999","xxxxxxxx"}));

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String addUser(@RequestBody Map<String, String> user, HttpServletResponse response) throws Exception {
		if (user.get("email") == null || user.get("password") == null || user.get("userRole") == null
				|| user.get("mobileNumber") == null || user.get("username") == null || user.get("password").length()<8) {

			response.setStatus(400);
			return "User Not Created";
		}
		
		if(user.get("email").equals(user.get("password"))||user.get("username").equals(user.get("password")) ) {
			
			response.setStatus(400);
			return "Password is same as username or email";
			
		}
		
		if(passwordSet.contains(user.get("password")) || user.get("password").length()<8) {
			
			response.setStatus(400);
			return "Weak Password";
			
		}
		if (!isValidMobileNo(user.get("mobileNumber"))) {
			response.setStatus(400);
			return "Invalid Phone Number";

		}
		if (!isValidEmail(user.get("email"))) {
			response.setStatus(400);
			return "Invalid Email Id";

		}
		if (userService.getUser(user.get("email")) != null) {
			response.setStatus(406);
			return "Email Id Already Exists";

		}
		User u = new User();
		u.setEmail(user.get("email"));
		u.setPassword(user.get("password"));
		u.setUsername(user.get("username"));
		u.setUserRole(user.get("userRole"));
		u.setMobileNumber(user.get("mobileNumber"));
		userService.saveUser(u);
		return "User Added";

	}

	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public String editUser(@RequestBody Map<String, String> user, HttpServletResponse response) throws Exception {
		if (user.get("email") == null || user.get("password") == null || user.get("userRole") == null
				|| user.get("mobileNumber") == null || user.get("username") == null || user.get("password").length()<8) {

			response.setStatus(400);
			return "User Not Created";
		}
		User us=userService.getUser(user.get("email"));
		if(us==null){
			response.setStatus(400);
			return "User Not Found Or attempt to change Email Id ";
		}

		
		if(user.get("email").equals(user.get("password"))||user.get("username").equals(user.get("password")) ) {
			
			response.setStatus(400);
			return "Password is same as username or email";
			
		}
		
		if(passwordSet.contains(user.get("password")) || user.get("password").length()<8) {
			
			response.setStatus(400);
			return "Weak Password";
			
		}
		if (!isValidMobileNo(user.get("mobileNumber"))) {
			response.setStatus(400);
			return "Invalid Phone Number";

		}
		if (!isValidEmail(user.get("email"))) {
			response.setStatus(400);
			return "Invalid Email Id";

		}
		
		User u = new User();
		u.setEmail(user.get("email"));
		u.setPassword(user.get("password"));
		u.setUsername(user.get("username"));
		u.setUserRole(user.get("userRole"));
		u.setMobileNumber(user.get("mobileNumber"));
		userService.saveUser(u);
		return "User Edited";

	}

	@RequestMapping(value = "/view/{userId}", method = RequestMethod.GET)
	public User viewUser(@PathVariable("userId") String id, HttpServletResponse response) {
		User u=userService.getUser(id);
		if(u==null){
			response.setStatus(404);
			return null;
		}
		return u;
	}

	@RequestMapping(value = "/delete/{userId}", method = RequestMethod.GET)
	public String deleteUser(@PathVariable("userId") String id) {
		userService.deleteUser(id);
		return "User Deleted";
	}

	public static boolean isValidMobileNo(String str) {
		Pattern ptrn = Pattern.compile("(0/91)?[7-9][0-9]{9}");
		Matcher match = ptrn.matcher(str);
		return (match.find() && match.group().equals(str));
	}

	public static boolean isValidEmail(String str) {
		String regex = "^(.+)@(.+)$";
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(str);
		return matcher.matches();
	}

}

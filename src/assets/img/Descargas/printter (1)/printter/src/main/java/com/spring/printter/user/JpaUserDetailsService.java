package com.spring.printter.user;
import com.spring.printter.entities.User;
import com.spring.printter.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JpaUserDetailsService  implements UserDetailsService {

    @Autowired
    private IUserRepository repository;
    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<User> optionUser = repository.findByEmail(username);
    if(optionUser.isEmpty()) {
        throw new UsernameNotFoundException(String.format("email %s no encontrado"));
    } else {
        User user = optionUser.orElseThrow();
        List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
                        new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(username,user.getPassword(),
                true,true,true,true,authorities);
    }

    }
}

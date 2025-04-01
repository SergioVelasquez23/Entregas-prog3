package com.prog3.security.Controllers;

import com.prog3.security.Models.Session;
import com.prog3.security.Models.User;
import com.prog3.security.Repositories.SessionRepository;
import com.prog3.security.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@CrossOrigin
@RestController
@RequestMapping("api/sessions")
public class SessionsControllers {
    @Autowired
    SessionRepository theSessionRepository;
    @Autowired
    UserRepository theUserRepository;

    @GetMapping("")
    public List<Session> find(){
        return this.theSessionRepository.findAll();
    }

    @GetMapping("/{id}")
    public Session findById(@PathVariable String id) {
        return this.theSessionRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Session create(@RequestBody Session newSession){
        return this.theSessionRepository.save(newSession);
    }

    @PutMapping("/{id}")
    public Session update(@PathVariable String id, @RequestBody Session newSession){
        Session actualSession = this.theSessionRepository.findById(id).orElse(null);
        if (actualSession != null){
            actualSession.setToken(newSession.getToken());
            actualSession.setUser(newSession.getUser());
            this.theSessionRepository.save(actualSession);
            return actualSession;
        }else{
            return null;
        }
    }

    @DeleteMapping({"/{id}"})
    public void delete(@PathVariable String id){
        this.theSessionRepository.findById(id).ifPresent(theSession -> this.theSessionRepository.delete(theSession));
    }

    @PostMapping("/{sessionId}/user/{userId}")
    public String matchUser(@PathVariable String userId, @PathVariable String sessionId) {
        Session theSession = this.theSessionRepository.findById(sessionId).orElse(null);
        User theUser = this.theUserRepository.findById(userId).orElse(null);

        if (theSession != null && theUser != null) {
            theSession.setUser(theUser);
            this.theSessionRepository.save(theSession);
            return "User matched to session";
        } else {
            return "User or session not found";

        }
    }
    
    @GetMapping("/user/{userId}")
    public List<Session> getSessionByUser(@PathVariable String userId){
        return this.theSessionRepository.getSessionByUser(userId);
    }

    @GetMapping("/timesErrorValidationCode/{userId}")
    public int getTimesErrorValidationCode(@PathVariable String userId){
        AtomicInteger timesError = new AtomicInteger();
        List<Session> theSessions = theSessionRepository.getSessionByUser(userId);
        theSessions.forEach(session -> {
            timesError.set(session.getTimesErrorValidationCode());
        });
        return timesError.get();
    }
}
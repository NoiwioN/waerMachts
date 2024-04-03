package net.ictcampus.waerMachts.controller.security;


import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.ictcampus.waerMachts.model.models.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import static net.ictcampus.waerMachts.controller.security.SecurityConstants.*;
import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }
    // Deine Benutzeranmeldeinformationen werden versucht zu authendifizieren
    @Override
    //Benutzerdaten werden entgegengenommen und es wird versucht, die Authentifikation vorzunehmen.
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            User creds = new ObjectMapper()
                    .readValue(req.getInputStream(), User.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getUsername(),
                            creds.getPassword(),
                            new ArrayList<>()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    //Wenn man sich nun anmeldet wird dein Token erstellt
    @Override
    //Methode wird nach attemptAuthentication ausgeführt und erstellt ein JWT-Token
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) {

        String token = JWT.create()
                .withSubject(((org.springframework.security.core.userdetails.User) auth.getPrincipal()).getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(SECRET.getBytes()));
        try {
            res.setCharacterEncoding("UTF-8");
            res.setContentType("application/json");
            String myJson = "{\"accessToken\": \"" + token + "\"}";
            res.getWriter().write(myJson);
            res.getWriter().flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
        res.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
    }

}

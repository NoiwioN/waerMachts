package net.ictcampus.waerMachts.controller.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

import static net.ictcampus.waerMachts.controller.security.SecurityConstants.*;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
    public JWTAuthorizationFilter(AuthenticationManager authManager) {
        super(authManager);
    }
    /*
    Der Filter überprüft eingehende HTTP-Anfragen auf das Vorhandensein eines gültigen JWT-Authentifizierungsheaders.
    Wenn ein gültiges Token gefunden wird, wird der Benutzer authentifiziert, indem ein Authentication-Objekt im Sicherheitskontext der Anwendung gespeichert wird.
    Die Anfrage wird anschließend an die weiteren Filter und Servlets der Anwendung weitergeleitet.
    1. Der Authentifizierungsheader wird überprüft
    2. Das Authentifikationsobjekt für den User wird erstellt
    3. Im SecurityContext wird das AuthentifikationsObjekt gespeichert
    4. chain.doFilter Kette wird fortgesetzt.
     */

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(HEADER_STRING);

        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }
        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    /*Die Methode extrahiert ein JWT aus der HTTP-Anfrage, validiert es,
    extrahiert den darin enthaltenen Benutzernamen und erstellt bei Erfolg ein Authentication-Objekt für die weitere Verarbeitung innerhalb der Anwendung.
    1. liest das Token aus (String token=....)
    2. Secret und HMAC512 werden verwendet, um die Konfiguration für den JWTVerifier zu erstellen
    3. JWT.verify überprüft, ob ein Token den Konfigurationen entspricht
    4. .getSubject gibt den Wert für den Schlüssel subject im Payload zurück.
    5. Nun wird ein UsernamePasswordAuthenticationToken zurückgegeben, welches weiter verwendet werden kann (in do Filter internal)
     */
    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);
        if (token != null) {
            // parse the token.
            String user = JWT.require(Algorithm.HMAC512(SECRET.getBytes())).build().verify(token.replace(TOKEN_PREFIX, "")).getSubject();

            if (user != null) {
                return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
            }
            return null;
        }
        return null;
    }

}

package net.ictcampus.waerMachts.controller.security;

public class SecurityConstants {
    // wird hier angegeben, damit das Request auch ohne Authentifizierung
    public static final String SIGN_UP_URL = "/users/sign-up";
    public static final String FORTESTONLYPLEASEDELETEMEVERYIMPORTANT = "/audiobooks";
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    // Wir haben alle URLs gesperrt ausser die Registrierungsseite. Swagger erstellt
    // uns aber Dokumentations URLs.
    // Diese müssen wir nun genau gleich wie die /sign-up URL freischalten.
    public static final String[] API_DOCUMENTATION_URLS = {
            "/v3/api-docs/**",
            "/swagger-ui.html",
            "/swagger-ui/**"
    };
    public static final String [] READS ={
            "/**"
    };

}

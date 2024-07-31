package com.ssafy.bartter.global.cache;

public class CacheKey {

    public static String authenticationKey(String username){
        return "authentication#" + username;
    }
}

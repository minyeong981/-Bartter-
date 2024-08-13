package com.ssafy.bartter.global.cache;

public class CacheKey {

    public static String authenticationKey(String username){ return "authentication:" + username; }

    public static String searchLogKey(String username){ return "searchLog:" + username; }

    public static String autocompleteKey(){ return "autocomplete"; }

    public static String autocompleteScoreKey(){ return "autocomplete:score"; }

    public static String messageKey(int tradeId) { return "trade:chat:" + tradeId;}

    public static String currentTradeKey() { return "trade:current"; }

    public static String tradeInfoKey(int tradeId ) { return "trade:info:" + tradeId; }

    public static String fcmTokenKey(int userId ) { return "fcm:info:" + userId; }

    public static String userNicknameKey(int userId) { return "user:nickname:" + userId;}
}

package com.ssafy.bartter.global.cache;

public class CacheKey {

    public static String authenticationKey(String username){ return "authentication:" + username; }

    public static String searchLogKey(String username){ return "searchLog:" + username; }

    public static String messageKey(int tradeId) { return "trade:chat:" + tradeId;}

    public static String currentTradeKey() { return "trade:current"; }

    public static String stompSessionKey(){ return "stomp:session"; }
}

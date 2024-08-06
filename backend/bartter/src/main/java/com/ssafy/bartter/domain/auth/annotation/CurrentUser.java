package com.ssafy.bartter.domain.auth.annotation;

import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


/**
 * 현재 인증된 사용자의 `UserAuthDto` 객체를 컨트롤러에서 주입받기 위한 어노테이션
 *
 * @author 김훈민
 */
@Target({ElementType.PARAMETER, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Parameter(hidden = true)
@AuthenticationPrincipal(expression = "#this == 'anonymousUser' ? null : @fetchUser.apply(#this)")
public @interface CurrentUser {
}


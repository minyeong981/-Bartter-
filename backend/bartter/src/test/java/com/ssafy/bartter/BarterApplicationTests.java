package com.ssafy.bartter;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;

@DataJpaTest
@Import(Environment.class)
class BartterApplicationTests {

    @Autowired
    Environment environment;

    @Test
    void contextLoads() {
        Assertions.assertThat(environment.getProperty("spring.datasource.url"))
                .isEqualTo("jdbc:h2:mem:test");
    }
}

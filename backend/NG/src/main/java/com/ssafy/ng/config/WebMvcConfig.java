package com.ssafy.ng.config;

import io.swagger.models.HttpMethod;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
    		registry.addResourceHandler("/resources/**")
    				.addResourceLocations("/WEB-INF/resources/");
    		
    		registry.addResourceHandler("swagger-ui.html")
    				.addResourceLocations("classpath:/META-INF/resources/");

    		registry.addResourceHandler("/webjars/**")
    				.addResourceLocations("classpath:/META-INF/resources/webjars/");
    }

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins(
						"https://localhost:3000",
						"https://localhost:3001",
						"https://j7e206.p.ssafy.io",
						"http://localhost:3000",
						"http://localhost:3001",
						"http://j7e206.p.ssafy.io"
				)
				.allowedMethods(
						HttpMethod.GET.name(),
						HttpMethod.HEAD.name(),
						HttpMethod.POST.name(),
						HttpMethod.PUT.name(),
						HttpMethod.DELETE.name()
				);
	}
}

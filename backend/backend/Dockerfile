# Sử dụng JDK 17
FROM eclipse-temurin:17-jdk-jammy AS build

WORKDIR /app

# Copy file Maven wrapper và pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Cấp quyền chạy cho mvnw
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build ứng dụng
RUN ./mvnw clean package -DskipTests

# Chạy ứng dụng
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

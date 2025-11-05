# Sử dụng JDK 17
FROM openjdk:17-jdk-slim

# Cài đặt locale UTF-8
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

# Thư mục làm việc
WORKDIR /app

# Copy Maven Wrapper và pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Quyền thực thi mvnw
RUN chmod +x mvnw

# Tải dependencies (cache)
RUN ./mvnw dependency:go-offline

# Copy source code
COPY src ./src

# Build ứng dụng
RUN ./mvnw clean package -DskipTests

# Expose cổng 8080
EXPOSE 8080

# ✅ FIX LỖI Ở ĐÂY
ENTRYPOINT ["sh", "-c", "java -jar target/*.jar"]

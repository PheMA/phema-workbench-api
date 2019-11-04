FROM maven:3.6.2-jdk-11 as builder

COPY . /opt/phema/phex
RUN rm -rf ./opt/phema/phex/src/ui/node
COPY settings-docker.xml /root/.m2/settings.xml
WORKDIR /opt/phema/phex

RUN mvn com.github.eirslett:frontend-maven-plugin:1.8.0:install-node-and-yarn
RUN mvn com.github.eirslett:frontend-maven-plugin:1.8.0:yarn
RUN mvn package

FROM adoptopenjdk/openjdk11:jdk-11.0.4_11-alpine-slim

COPY --from=builder /opt/phema/phex/target/PheEx.jar /opt/phema/phex/PheEx.jar
WORKDIR /opt/phema/phex
CMD ["java", "-jar", "PheEx.jar"]
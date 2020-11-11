FROM maven:3.6.3-jdk-11 AS builder

COPY . /opt/phema/phema-workbench-api
COPY settings-docker.xml /root/.m2/settings.xml
WORKDIR /opt/phema/phema-workbench-api

RUN mvn package

FROM adoptopenjdk/openjdk11:jdk-11.0.4_11-alpine-slim

ARG VCS_REF

LABEL org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.vcs-url="https://github.com/phema/phema-workbench-api"

COPY --from=builder /opt/phema/phema-workbench-api/target/phema-workbench-api.jar /opt/phema/phema-workbench-api/

WORKDIR /opt/phema/phema-workbench-api

EXPOSE 8083

CMD ["java", "-jar", "phema-workbench-api.jar"]

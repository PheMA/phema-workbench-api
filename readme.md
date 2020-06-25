<br/><br/>
<img src="http://informatics.mayo.edu/phema/images/b/bc/Phema-logo.png">
<br/><br/>

# PhEMA Workbench API

[![PhEMA](./repo-badge.svg)](https://projectphema.org "PhEMA")
[![Build Status](https://travis-ci.org/PheMA/phema-workbench-api.svg?branch=master)](https://travis-ci.org/PheMA/phema-workbench-api "Travis CI build status")
[![Docker Image](https://images.microbadger.com/badges/version/phema/phema-workbench-api.svg)](https://hub.docker.com/r/phema/phema-workbench-api "Docker image version")

Java API for the [PhEMA](http://projectphema.org) Workbench.

## Quickstart

To get started fast, download the latest version on the [releases page](https://github.com/PheMA/phema-workbench-api/releasess), then run:

```
java -jar phema-workbench-api.jar
```

You can also run the Docker image using the version shown in the badge above, for example:

```
docker run -p 8083:8083 phema/phema-workbench-api:0.3.0
```


To use the PhEMA Workbench application, you will also need to run the [app](https://github.com/PheMA/phema-workbench-app).

## Requirements

In order to run the application, you need at least Java 11 installed. To install Java manually, see the documentation
[here](https://www.java.com/en/download/help/download_options.xml).

## Contributing

### Technologies

The PhEMA Workbench API is built using the following technologies:

- Java (11.0.2)
  - [Maven](https://maven.apache.org/)
  - [Jetty](https://www.eclipse.org/jetty/documentation/)
  - [Jersey](https://jersey.github.io/)

### Workflow

> #### 1. Clone the repo

```
git clone https://github.com/phema/phema-workbench-api.git && cd phema-workbench-api
```

> #### 2. Run API

As a developer, you may want to run the API using your IDE, but it is also possible to do so in the terminal by running
the following:

```
mvn exec:java
```

> #### 3. Build Release

When you're done making your changes, you can build a new fat jar by running:

```
mvn package
```

This will create `target/phema-workbench-api.jar`, which will contain all the dependencies and can be run as described in the **QuickStart**
section above.

## Acknowledgements

This work has been funded by NIGMS grant R01GM105688.

## License

[Apache 2.0](license.md)

<br/><br/>
<img src="http://informatics.mayo.edu/phema/images/b/bc/Phema-logo.png">
<br/><br/>

# PhEMA Workbench API

[![PhEMA](./repo-badge.svg)](https://projectphema.org)
[![Build Status](https://travis-ci.org/PheMA/phema-workbench-api.svg?branch=master)](https://travis-ci.org/PheMA/phema-workbench-api)
[![Download](https://img.shields.io/badge/dynamic/json.svg?label=latest&query=name&url=https://bintray.com/api/v1/packages/phema/docker/phema-phex/versions/_latest) ](https://bintray.com/beta/#/phema/docker/phema-phex?tab=overview)

Java API for the [PhEMA](http://projectphema.org) Workbench.

## Quickstart

To get started fast, download the latest version on the [releases page](https://github.com/PheMA/phema-workbench-api/releasess), then run:

```
java -jar phema-workbench-api.jar
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
git clone https://github.com/PheMA/phex.git && cd phex
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

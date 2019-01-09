<br/><br/>
<img src="http://informatics.mayo.edu/phema/images/b/bc/Phema-logo.png">
<br/><br/>

# PhEX

> Phenotype Executer

Desktop application for executing phenotypes represented using the [PhEMA](http://projectphema.org) standard against a
variety of data backends.

## Quickstart

To get started fast, download the latest version on the [releases page](https://github.com/PheMA/phex/releases), then run:

```
java -jar PhEX.jar
```

Then, navigate to http://localhost:8083 in your browser.

## Requirements

In order to run the application, you need at least Java 1.8 installed. It's likely that your system already satisfies
this requirement, but if you need to install Java manually, see the documentation [here](https://www.java.com/en/download/help/download_options.xml).

## Contributing

### Technologies

The PhEX application is built using the following technologies:

- Java (1.8)
  - [Maven](https://maven.apache.org/)
  - [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin)
  - [Jetty](https://www.eclipse.org/jetty/documentation/)
  - [Jersey](https://jersey.github.io/)
- JavaScript (es2015)
  - [Yarn](https://yarnpkg.com/en/)
  - [Parcel](https://parceljs.org/)
  - [React](https://reactjs.org/)
  - [Redux](https://redux.js.org/)
  - [Redux-Saga](https://redux-saga.js.org/)
  - [Blueprint](https://blueprintjs.com/docs/)

### Workflow

> #### 1. Clone the repo

```
git clone https://github.com/PheMA/phex.git && cd phex
```

> #### 2. Install local copies of Node and Yarn

```
mvn frontend:install-node-and-yarn
```

> #### 3. Install JavaScript dependencies with Yarn

```
mvn frontend:yarn
```

> #### 4. Build JavaScript

```
mvn exec:exec
```

:bulb: Note that this is a long running process, so should be started in a separate terminal window. This command will
run Parcel, which will continue to watch for JavaScript changes and rebuild when it detects changes.

> #### 5. Run API

As a developer, you may want to run the API using your IDE, but it is also possible to do so in the terminal by running
the following:

```
mvn exec:java
```

:bulb: Once you've run Parcel at least once (`mvn exec:exec`) and you have the API up and running, you can navigate to
http://localhost:8083 in your browser to see the application.

> #### 6. Build Release

When you're done making your changes, you can build a new fat jar by running:

```
mvn package
```

This will create `target/PheEx.jar`, which will contain all the dependencies and can be run as described in the **QuickStart**
section above.

## Acknowledgements

This work has been funded by NIGMS grant R01GM105688.

## License

[Apache 2.0](license.md)

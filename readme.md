<br/><br/>
<img src="http://informatics.mayo.edu/phema/images/b/bc/Phema-logo.png">
<br/><br/>

# PhEX

> Phenotype Executor

Desktop application for executing phenotypes represented using the [PhEMA](http://projectphema.org) standard against a
variety of data backends.

## Quickstart

To get started fast, download the latest version on the releases page, then run:

```
java -jar PhEX.jar
```

Then, navigate to http://localhost:8083 in your browser.

## Requirements

In order to run the application, you need at least Java 1.8 installed. It's likely that your system already satisfies
this requirement, but if you need to install Java manually, see the documentation [here](https://www.java.com/en/download/help/download_options.xml).


## Contributing

### Technologies

The PhEX application is built using the following technologies

* Java (1.8)
    * [Maven](https://maven.apache.org/)
    * [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin)
    * [Jetty](https://www.eclipse.org/jetty/documentation/)
    * [Jersey](https://jersey.github.io/)
* JavaScript (es2015)
    * [Yarn](https://yarnpkg.com/en/)
    * [Parcel](https://parceljs.org/)
    * [React](https://reactjs.org/)
    * [Redux](https://redux.js.org/)
    * [Redux-Saga](https://redux-saga.js.org/)
    * [antd](https://ant.design/docs/react/introduce)

### Workflow

> #### 1. Clone the repo

Run:

```
git clone https://github.com/PheMA/phex.git && cd phex

```

> #### 2. Install local copies of Node and Yarn



## Acknowledgements

This work has been funded by NIGMS grant R01GM105688.

## License

[Apache 2.0](license.md)

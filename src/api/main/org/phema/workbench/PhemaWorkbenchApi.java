package org.phema.workbench;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.DefaultHandler;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.eclipse.jetty.util.resource.Resource;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.logging.LoggingFeature;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;

import javax.servlet.DispatcherType;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.util.EnumSet;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

public class PhemaWorkbenchApi {
  public static Logger logger = Logger.getLogger(org.phema.workbench.PhemaWorkbenchApi.class.getSimpleName());

  public static int PHEMA_WORKBENCH_API_DEFAULT_PORT = 8083;
  public static String PHEMA_WORKBENCH_API_DEFAULT_PROPERTY_FILE_NAME = "phema-workbench-api.properties";
  public static String PHEMA_WORKBENCH_API_DEFAULT_PROPERTY_FILE_PATH = "/opt/phema/workbench/" + PHEMA_WORKBENCH_API_DEFAULT_PROPERTY_FILE_NAME;

  public static void main(String[] args) {
    try {
      new org.phema.workbench.PhemaWorkbenchApi().run();
    } catch (Throwable t) {
      t.printStackTrace();
    }
  }

  public void setup() {
    // Make sure phenotype directory exists and try to create it if not
    String phenotypePath = System.getProperty("phema-workbench-api.phenotype_directory");
    File directory = new File(phenotypePath);
    if (!directory.exists()) {
      logger.info("Creating phenotype directory: " + phenotypePath);
      directory.mkdirs();
    }
  }

  public void loadProperties() {
    // Store the current set of properties
    Properties p = new Properties(System.getProperties());

    FileInputStream propFile;

    // First check for explicit properties file path
    String explicitPath = p.getProperty("phema-workbench-api.properties_file");
    if (explicitPath != null && !explicitPath.isEmpty()) {
      logger.info("Loading properties from: " + explicitPath);
      try {
        propFile = new FileInputStream(explicitPath);
        p.load(propFile);
        System.setProperties(p);
        logger.info("Loaded properties from: " + explicitPath);
        return;
      } catch (Exception e) {
        logger.warning("Error loading properties from " + explicitPath + ": " + e.getMessage());
      }
    }

    // Then check default location
    logger.info("Checking for properties file: " + PHEMA_WORKBENCH_API_DEFAULT_PROPERTY_FILE_PATH);
    try {
      propFile = new FileInputStream(PHEMA_WORKBENCH_API_DEFAULT_PROPERTY_FILE_PATH);
      p.load(propFile);
      System.setProperties(p);
      logger.info("Loaded properties file: " + PHEMA_WORKBENCH_API_DEFAULT_PROPERTY_FILE_PATH);
      return;
    } catch (Exception e) {
      logger.warning("Error loading properties from " + explicitPath + ": " + e.getMessage());
    }

    // Finally check the resources directory
    logger.info("Checking for properties file in resources directory");
    try {
      InputStream propInputStream = org.phema.workbench.PhemaWorkbenchApi.class
        .getClassLoader().getResourceAsStream(PHEMA_WORKBENCH_API_DEFAULT_PROPERTY_FILE_NAME);
      p.load(propInputStream);
      System.setProperties(p);
      logger.info("Loaded properties file in resources directory");
      return;
    } catch (Exception e) {
      logger.severe("Error loading properties from " + explicitPath + ": " + e.getMessage());
    }

    logger.severe("Could not find a valid properties file");
    System.exit(1);
  }

  public void run() throws Exception {
    loadProperties();
    System.getProperties().list(System.out);

    setup();

    Server server = new Server(PHEMA_WORKBENCH_API_DEFAULT_PORT);
    HandlerList handlers = new HandlerList();

    ServletContextHandler servletContextHandler = new ServletContextHandler(ServletContextHandler.SESSIONS);
    servletContextHandler.setContextPath("/");

    // Set up the API servlet
    ResourceConfig config = new ResourceConfig();
    config.register(JacksonFeature.class);
    config.register(MultiPartFeature.class);
    config.register(LoggingFeature.class);
    config.packages("org.phema.workbench.api.resources");

    ServletHolder apiServletHolder = new ServletHolder(new ServletContainer(config));
    servletContextHandler.addServlet(apiServletHolder, "/api/v1/*");

    // Add CORS filter
    FilterHolder cors = servletContextHandler.addFilter(CrossOriginFilter.class, "/*", EnumSet.of(DispatcherType.REQUEST));
    cors.setInitParameter(CrossOriginFilter.ALLOWED_ORIGINS_PARAM, "*");
    cors.setInitParameter(CrossOriginFilter.ACCESS_CONTROL_ALLOW_ORIGIN_HEADER, "*");
    cors.setInitParameter(CrossOriginFilter.ALLOWED_METHODS_PARAM, "GET,POST,HEAD");
    cors.setInitParameter(CrossOriginFilter.ALLOWED_HEADERS_PARAM, "X-Requested-With,Content-Type,Accept,Origin");

    handlers.addHandler(servletContextHandler);
    handlers.addHandler(new DefaultHandler());

    server.setHandler(handlers);

    try {
      server.start();
      logger.info("Started PhEMA Workbench API listening on port: " + PHEMA_WORKBENCH_API_DEFAULT_PORT);
      server.join();
    } catch (Exception ex) {
      logger.log(Level.SEVERE, null, ex);
    } finally {
      server.destroy();
    }
  }
}
package org.phema.workbench.api.resources.phenotype;

import org.apache.commons.lang3.StringUtils;
import org.codehaus.jackson.annotate.JsonProperty;

import java.io.File;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.stream.Collectors;

public class PhenotypeList {
  @JsonProperty("entries")
  private ArrayList<Phenotype> entries;

  public PhenotypeList() {
    entries = getEntries();
  }

  private Phenotype buildPhenotype(String fileName) {
    Phenotype p = new Phenotype();

    // FIXME: We should probably inspect some kind of manifest here
    // instead of just using the filename

    ArrayList<String> fileNameParts = new ArrayList<>();
    for (String part : fileName.split("\\.")) {
      if (part.startsWith("ID[")) {
        p.setId(StringUtils.substringBetween(part, "[", "]"));
      } else if (part.startsWith("TS[")) {
        p.setModified(new Date(Integer.parseInt(StringUtils.substringBetween(part, "[", "]"))));
      } else {
        fileNameParts.add(part);
      }
    }

    p.setName(String.join(".", fileNameParts));

    return p;
  }

  public ArrayList<Phenotype> getEntries() {
    ArrayList<Phenotype> list = new ArrayList<>();

    String phenotypePath = System.getProperty("phema-workbench-api.phenotype_directory");

    File f = new File(phenotypePath);
    String[] pathnames = f.list();

    for (String pathname : pathnames) {
      list.add(buildPhenotype(pathname));
    }

    return list;
  }
}

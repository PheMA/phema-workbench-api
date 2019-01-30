package org.phema.executer.api.resources.phenotype;

import org.codehaus.jackson.annotate.JsonProperty;

import java.util.ArrayList;
import java.util.Date;

public class PhenotypeList {
  public PhenotypeList() {
    entries = new ArrayList<Phenotype>();

    // For now, just add a bunch of dummy data
    // eventually read these from a database or the filesystem
    entries.add(new Phenotype(1, "BHP", new Date(1548819064), 2519));
    entries.add(new Phenotype(2, "Cataracts", new Date(1548819072), 88190));
    entries.add(new Phenotype(3, "Dementia", new Date(1548819077), 548));
    entries.add(new Phenotype(4, "Diabetic Retinopathy", new Date(1548819083), 88190));
    entries.add(new Phenotype(5, "Resistant hypertension", new Date(1548819089), 881908));
    entries.add(new Phenotype(6, "Sickle Cell Disease", new Date(1548819096), 15488));
  }

  @JsonProperty("entries")
  private ArrayList<Phenotype> entries;

  public ArrayList<Phenotype> getEntries() {
    return entries;
  }
}

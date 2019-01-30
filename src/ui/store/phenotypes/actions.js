export const FETCH_PHENOTYPE_LIST = "phenotypes@FETCH_PHENOTYPE_LIST";
export const FETCH_PHENOTYPE_LIST_SUCCESS =
  "phenotypes@FETCH_PHENOTYPE_LIST_SUCCESS";
export const FETCH_PHENOTYPE_LIST_FAILED =
  "phenotypes@FETCH_PHENOTYPE_LIST_FAILED";

export const fetchPhenotypeList = () => ({
  type: FETCH_PHENOTYPE_LIST,
  payload: {}
});

export const fetchPhenotypeListSuccess = data => ({
  type: FETCH_PHENOTYPE_LIST_SUCCESS,
  payload: { data }
});

export const fetchPhenotypeListFailed = error => ({
  type: FETCH_PHENOTYPE_LIST_FAILED,
  payload: { error }
});

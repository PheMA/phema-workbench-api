import {
  FETCH_PHENOTYPE_LIST,
  FETCH_PHENOTYPE_LIST_SUCCESS,
  FETCH_PHENOTYPE_LIST_FAILED
} from "./actions";

const initialState = {
  list: [],
  fetching: false,
  error: null,
  open: []
};

export default function phenotypeReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case FETCH_PHENOTYPE_LIST: {
      return Object.assign({}, state, { fetching: true, fail: false });
    }
    case FETCH_PHENOTYPE_LIST_SUCCESS: {
      return Object.assign({}, state, {
        fetching: false,
        fail: false,
        list: payload.data.entries,
        error: null
      });
    }
    case FETCH_PHENOTYPE_LIST_FAILED: {
      return {
        fetching: false,
        fail: true,
        gitSha: null,
        error: payload.error
      };
    }
    default:
      return initialState;
  }
}

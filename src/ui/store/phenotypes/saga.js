import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_PHENOTYPE_LIST,
  fetchPhenotypeListSuccess,
  fetchPhenotypeListFailed
} from "./actions";
import PhEx from "../../api/phex";

const phex = new PhEx();

function* fetchPhenotypeList() {
  try {
    const phenotypes = yield phex.getPhenotypeList();
    yield put(fetchPhenotypeListSuccess(phenotypes));
  } catch (err) {
    console.log(err);

    yield put(fetchPhenotypeListFailed(err));
  }
}

export default function* phenotypeSaga() {
  yield takeLatest(FETCH_PHENOTYPE_LIST, fetchPhenotypeList);
}

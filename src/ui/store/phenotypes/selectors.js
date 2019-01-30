import _ from "lodash";

const phenotypeListSelector = state => _.get(state, "phenotypes.list");

export { phenotypeListSelector };

import { CurrentStatus } from "../types";

const statuses: CurrentStatus = {
  failed_internal: "Internal Error",
  failed_external: "Input Error",
  success: "Operation Successful",
  unavailable:
    "We do not support this database currently, however please keep an eye out as we plan to implement more available databses!",
};

export default statuses;

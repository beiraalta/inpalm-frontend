import { REACT_APP_BACKEND_URL } from "../constants/settings";
import { AbstractService } from "./abstract";

export class Backend extends AbstractService {
  constructor() {
    super(REACT_APP_BACKEND_URL);
  }

}

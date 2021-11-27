import FormManager from "managers/FormManager/FormManager";
import { UseFormReturn } from "react-hook-form";

import { FormInstanceName } from "./enums";

export interface FormManagerInstance {
  formName: FormInstanceName;
  formInstance: UseFormReturn;
}

export interface FormsStore {
  manager: FormManager;
}

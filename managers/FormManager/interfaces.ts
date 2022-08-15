import FormManager from 'managers/FormManager/FormManager';
import { UseFormReturn } from 'react-hook-form';

import { FormInstanceName } from './enums';

export interface FormManagerInstance {
  formName: FormInstanceName
  formInstance: UseFormReturn
  additionalActions?: () => void
}

export interface FormsStore {
  manager: FormManager
}

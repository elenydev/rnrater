import { FormManagerInstance } from './interfaces';
import { FormInstanceName } from './enums';

export default class FormManager {
  forms: FormManagerInstance[] = [];

  public setFormInstance (formInstance: FormManagerInstance) {
    this.forms = (this.forms.find(
      ({ formName }) => formInstance.formName === formName
    ) != null)
      ? [
          ...this.forms.filter(
            ({ formName }) => formInstance.formName === formName
          ),
          formInstance
        ]
      : [...this.forms, formInstance];
  }

  public clearCurrentForm (currentFormName: FormInstanceName): void {
    const currentForm = this.forms.find(
      ({ formName }) => formName === currentFormName
    );
    currentForm?.formInstance.reset();
    ((currentForm?.additionalActions) != null) && currentForm.additionalActions();
  }
}

import { FormManagerInstance } from "./interfaces";
import { FormInstanceName } from "./enums";

export default class FormManager {
  forms: FormManagerInstance[] = [];

  public setFormInstance(formInstance: FormManagerInstance) {
    this.forms.push(formInstance);
  }

  public clearCurrentForm(currentFormName: FormInstanceName): void {
    const currentForm = this.forms.find(
      ({ formName }) => formName === currentFormName
    );
    currentForm?.formInstance.reset();
    currentForm?.additionalActions && currentForm.additionalActions();
  }
}

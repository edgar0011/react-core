// @flow
import React, { PureComponent } from 'react'
import { memoize } from 'lodash'

import type { Field, FlexFieldLayout, FormProps, FormComponents, FlexLayout, Errors } from './Form'

type FormSimpleProps = {
  fields: Array<Field>,
  errors: Errors,
  buttonLabels?: {
    reset?: string,
    submit?: string
  },
  formName: string,
  onChangeHandler?: Function,
  onBlurHandler?: Function,
  onFocusHandler?: Function,
  onResetHandler?: Function,
  onSubmitHandler: Function,
  submitDisabled?: boolean,
  showReset?: boolean,
  resetable?: boolean,
  showErrors?: boolean,
  flexLayout: FlexLayout,
  flexFieldLayout: FlexFieldLayout,
  translations?: {
    reset?: string,
    submit?: string
  },
  renderButtons?: Function,
  renderForm?: Function,
  renderField?: Function,
  components: FormComponents
}

type RenderButtons = {
  submitDisabled?: boolean,
  showReset?: boolean,
  resetable?: boolean,
  labels: {
    reset?: string,
    submit?: string
  },
  errors: Errors,
  components: FormComponents
}

type RenderField = {
  field: Field,
  flexFieldLayout: FlexFieldLayout,
  fieldValue?: any,
  components: FormComponents,
  props?: any
}

type RenderFieldControlled = {
  ...RenderField,
  handleInputChange: (event: SyntheticKeyboardEvent<EventTarget>) => void,
  handleInputFocus: (event: SyntheticKeyboardEvent<EventTarget>) => void,
  handleInputBlur: (event: SyntheticKeyboardEvent<EventTarget>) => void,
  components?: ?FormComponents
}

type RenderForm = FormProps & {
  formName: string,
  fields: Array<Field>,
  flexFieldLayout: FlexFieldLayout,
  flexLayout: FlexLayout,
  handleSubmit: Function,
  errors?: Errors,
  showErrors?: boolean,
  renderFieldMethod: Function,
  renderButtonsMethod: Function,
  buttonsProps?: RenderButtons,
  translations?: {
    reset?: string,
    submit?: string
  },
  components: FormComponents
}

class FormSimple extends PureComponent<FormSimpleProps> {

  static defaultProps: {
    flexLayout: FlexLayout,
    flexFieldLayout: FlexFieldLayout
  } = {
    flexFieldLayout: {
      minWidth: '25%',
      maxWidth: '25%'
    },
    flexLayout: {
      wrap: true
    }
  }

  constructor(props: FormSimpleProps) {
    super(props)

    this.memoizedHandleFieldInputChange = memoize(this.handleFieldInputChange, (field) => field.name)
    this.memoizedHandleFieldInputFocus = memoize(this.eventHandler('focus'), (field) => field.name)
    this.memoizedHandleFieldInputBlur = memoize(this.eventHandler('blur'), (field) => field.name)
  }

  handleSubmit = (event: SyntheticEvent<EventTarget>) => {
    event.preventDefault()
    this.props.onSubmitHandler()
  }

  handleFieldInputChange = (field: Field) => (event: SyntheticEvent<EventTarget>) => {
    if (event.target instanceof HTMLInputElement) {
      const { value }: { value: any } = event.target
      let newValue: any = value
      if (field.valueDecorator) {
        newValue = field.valueDecorator(value, field)
      }
      const { name }: { name: string } = field

      field.onChange && field.onChange(name, newValue)
      this.props.onChangeHandler && this.props.onChangeHandler(name, newValue)
    }
  }

  eventHandler = (eventName: string) => {
    const eventPreffix: string = `on${eventName.substr(0, 1).toUpperCase()}${eventName.substr(1)}`
    const eventPreffixHandler: string = `${eventPreffix}Handler`
    return (field: Field) => (event: SyntheticEvent<EventTarget>) => {
      if (event.target instanceof HTMLInputElement) {
        const { value }: { value: any }  = event.target
        const { name }: { name: string } = field
        field[eventPreffix] && field[eventPreffix](name, value)
        this.props[eventPreffixHandler] && this.props[eventPreffixHandler](name, value)
      }
    }
  }

  resetHandler = () => {
    this.props.onResetHandler && this.props.onResetHandler()
  }

  memoizedHandleFieldInputChange: Function
  memoizedHandleFieldInputFocus: Function
  memoizedHandleFieldInputBlur: Function
  props: FormSimpleProps

  renderButtons = ({ showReset, submitDisabled, resetable,
                     labels: { reset, submit }, errors, components }: RenderButtons) => {
    const hasErrors = !!(errors && (errors.length || Object.values(errors).length))
    const buttonsData: Array<Object> = []
    if (showReset) {
      buttonsData.push({ big: true, type: 'reset', disabled: !resetable, onClick: this.resetHandler, label: reset })
    }
    buttonsData.push({ big: true,
      isPlatinum: true,
      type: 'submit',
      disabled: submitDisabled || hasErrors,
      label: submit
    })

    return (this.props.renderButtons
      ? this.props.renderButtons(buttonsData)
      : <components.ActionGroupComponent data={buttonsData} />)
  }

  renderForm = (formProps: FormProps) =>
    (this.props.renderForm ? this.props.renderForm(formProps) : <formProps.components.FormComponent {...formProps} />)

  renderField = ({ field, flexFieldLayout, fieldValue, components, ...props }: RenderField) => {
    const handleInputChange: Function = this.memoizedHandleFieldInputChange(field)
    const handleInputFocus: Function = this.memoizedHandleFieldInputFocus(field)
    const handleInputBlur: Function = this.memoizedHandleFieldInputBlur(field)

    // TODO FORM Field props type
    const formFieldProps: RenderFieldControlled = {
      field, flexFieldLayout, fieldValue, handleInputChange, handleInputFocus, handleInputBlur, ...props }

    const renderFieldMethod = field.render || this.props.renderField
    return renderFieldMethod ? renderFieldMethod(formFieldProps)
      : <components.FormFieldComponent key={field.name} {...formFieldProps} />
  }

  render() {
    const {
      fields, errors, showErrors, formName, buttonLabels,
      flexLayout, flexFieldLayout, showReset, submitDisabled, translations, resetable, components,
      ...formProps
    }: FormSimpleProps = this.props
    const buttonsProps: RenderButtons = {
      showReset,
      submitDisabled,
      resetable,
      labels: buttonLabels || {
          reset: translations && translations.reset ? translations.reset : 'Reset',
          submit: translations && translations.submit ? translations.submit : 'Search'
      },
      components,
      errors
    }
    const renderFormProps: RenderForm = {
      formName,
      fields,
      flexFieldLayout,
      flexLayout,
      handleSubmit: this.handleSubmit,
      errors,
      showErrors,
      renderFieldMethod: this.renderField,
      renderButtonsMethod: this.renderButtons,
      buttonsProps,
      translations,
      components,
      ...formProps
    }

    return this.renderForm(renderFormProps)
  }
}
export default FormSimple

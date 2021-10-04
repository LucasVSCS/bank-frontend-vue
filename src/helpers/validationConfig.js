import { required, double, email } from 'vee-validate/dist/rules'

import { extend, setInteractionMode } from 'vee-validate'

extend('email', {
  ...email,
  message: 'Preencha um e-mail válido.'
})

extend('required', {
  ...required,
  message: '{_field_} não pode ser vazio.'
})

extend('double', {
  ...double,
  message: 'Preencha um valor válido.'
})

extend('greaterThanZero', {
  getMessage: field => field + ' o valor não pode ser R$ 0.',
  validate: value => {
    if (value > 0) return true
    return false
  }
})

setInteractionMode('eager')

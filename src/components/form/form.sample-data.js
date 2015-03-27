module.exports = [
  {
    schema: {
      id: 'username',
      label: 'Username',
      placeholder: 'zhuli23',
      validator: 'username',
      errorMessage: 'Eek! That is not a valid username!',
      required: true
    },
    valid: ['kate123', 'kate_hudson'],
    invalid: ['', 1234, 'ka']
  },
  {
    schema: {
      id: 'password',
      type: 'password',
      label: 'Password',
      validator: 'password',
      required: true
    },
    valid: ['password', '12321dASDa2'],
    invalid: ['', 'pass']
  },
  {
    schema: {
      id: 'whatever',
      label: 'Whatever',
      placeholder: 'Not validated'
    },
    valid: ['hello', '']
  }
];

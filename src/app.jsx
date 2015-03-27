var React = require('react');
var Form = require('./components/form/form.jsx');

var signup = [
  {
    id: 'username',
    label: 'Username',
    placeholder: 'zhuli23',
    validator: 'username',
    errorMessage: 'Eek! That is not a valid username!',
    required: true
  },
  {
    id: 'password',
    type: 'password',
    label: 'Password',
    validator: 'password',
    required: true
  },
  {
    id: 'whatever',
    label: 'Whatever',
    placeholder: 'Not validated'
  }
];

var mailingList = [
  {
    id: 'name',
    label: 'Name',
    required: true
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'zhuli@gmail.com',
    validator: 'email',
    required: true
  }
];

function onSubmit(fields, isValid) {
  alert(isValid ? 'valid' : 'not valid');
  console.log(fields);
}

React.render((<div>
  <div className="container">
    <Form fields={signup} onSubmit={onSubmit} />
    <Form fields={mailingList} onSubmit={onSubmit} />
  </div>
</div>), document.getElementById('app'));

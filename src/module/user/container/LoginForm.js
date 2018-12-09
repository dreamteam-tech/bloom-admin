import React from 'react';
import { Form, FormRow, Part, SpinnerOverlay } from 'firefly/component';

export class LoginForm extends Form {
  render() {
    const {
      loading
    } = this.props;

    const { form } = this.state;

    return (
      <SpinnerOverlay show={loading}>
        <form onSubmit={this.submit} className="form">
          <Part
            type="text"
            name="phone"
            errors={this.getErrors()}
            disabled={loading}
            autoFocus={true}
            autoCapitalize="off"
            autoCorrect="off"
            label='Телефон'
            value={form.phone || ''}
            onChange={this.change('phone')}/>

          <Part
            type="password"
            errors={this.getErrors()}
            name="password"
            disabled={loading}
            autoComplete="new-password"
            label='Пароль'
            value={form.password || ''}
            onChange={this.change('password')}/>

          <FormRow className="b-form__pane">
            <button
              type="submit"
              disabled={loading}
              className="b-button">
              Вход
            </button>
          </FormRow>
        </form>
      </SpinnerOverlay>
    );
  }
}

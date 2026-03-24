import { UserType } from 'src/users/userType';

export class UserValidator {
  static validate(user: UserType) {
    const errors: string[] = [];

    // firstname
    if (
      typeof user.firstname !== 'string' ||
      user.firstname.trim().length === 0
    )
      errors.push('firstname deve ser uma string não vazia');
    if (user.firstname.trim().length < 2)
      errors.push('firstname deve ter pelo menos 2 caracteres');
    if (user.firstname.trim().length > 50)
      errors.push('firstname não pode ter mais de 50 caracteres');
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(user.firstname))
      errors.push('firstname não pode conter números ou caracteres especiais');

    // lastname
    if (typeof user.lastname !== 'string' || user.lastname.trim().length === 0)
      errors.push('lastname deve ser uma string não vazia');
    if (user.lastname.trim().length < 2)
      errors.push('lastname deve ter pelo menos 2 caracteres');
    if (user.lastname.trim().length > 50)
      errors.push('lastname não pode ter mais de 50 caracteres');
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(user.lastname))
      errors.push('lastname não pode conter números ou caracteres especiais');

    // email
    if (typeof user.email !== 'string' || user.email.trim().length === 0)
      errors.push('email deve ser uma string não vazia');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email))
      errors.push('email inválido');

    // cpf
    if (typeof user.cpf !== 'string' || user.cpf.trim().length === 0)
      errors.push('cpf deve ser uma string não vazia');
    if (!/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(user.cpf))
      errors.push('cpf inválido, formato esperado: 000.000.000-00');

    // loggedinemail
    if (typeof user.loggedinemail !== 'boolean')
      errors.push('loggedinemail deve ser um boolean');

    if (errors.length > 0) {
      return { success: false, errors, data: null };
    }

    return { success: true, errors: [], data: user };
  }
}

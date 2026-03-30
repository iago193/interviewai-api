import { UserType } from 'src/users/userType';

export class UserEditValidator {
  static validate(user: UserType) {
    const errors: string[] = [];

    // firstname
    if (user.firstname !== undefined) {
      if (user.firstname.trim().length === 0)
        errors.push('firstname deve ser uma string não vazia');
      else if (user.firstname.trim().length < 2)
        errors.push('firstname deve ter pelo menos 2 caracteres');
      else if (user.firstname.trim().length > 50)
        errors.push('firstname não pode ter mais de 50 caracteres');
      else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(user.firstname))
        errors.push(
          'firstname não pode conter números ou caracteres especiais',
        );
    }

    // lastname
    if (user.lastname !== undefined) {
      if (user.lastname.trim().length === 0)
        errors.push('lastname deve ser uma string não vazia');
      else if (user.lastname.trim().length < 2)
        errors.push('lastname deve ter pelo menos 2 caracteres');
      else if (user.lastname.trim().length > 50)
        errors.push('lastname não pode ter mais de 50 caracteres');
      else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(user.lastname))
        errors.push('lastname não pode conter números ou caracteres especiais');
    }

    // email
    if (user.email !== undefined) {
      if (user.email.trim().length === 0)
        errors.push('email deve ser uma string não vazia');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email))
        errors.push('email inválido');
    }

    // cpf
    if (user.cpf !== undefined) {
      if (user.cpf.trim().length === 0)
        errors.push('cpf deve ser uma string não vazia');
      else if (!/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(user.cpf))
        errors.push('cpf inválido, formato esperado: 000.000.000-00');
    }

    if (errors.length > 0) {
      return { success: false, errors, data: null };
    }

    return { success: true, errors: [], data: user };
  }
}

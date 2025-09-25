class User {
  constructor(id, name, email, age, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  isValid() {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('El nombre es requerido');
    }
    if (!this.email || !this.validateEmail(this.email)) {
      throw new Error('Email inválido');
    }
    if (this.age && this.age < 0) {
      throw new Error('La edad no puede ser negativa');
    }
    return true;
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  static fromDatabase(data) {
    return new User(
      data.id,
      data.name,
      data.email,
      data.age,
      data.createdAt,
      data.updatedAt
    );
  }
}

module.exports = User;
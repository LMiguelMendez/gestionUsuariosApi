/**
 * Entidad de Usuario que representa la lógica de dominio
 * @class User
 * @param {number} id - ID único del usuario
 * @param {string} name - Nombre completo del usuario
 * @param {string} email - Email único del usuario
 * @param {number} age - Edad del usuario (opcional)
 * @param {Date} createdAt - Fecha de creación
 * @param {Date} updatedAt - Fecha de última actualización
 */
class User {
  /**
   * Valida que los datos del usuario sean correctos
   */
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
      throw new Error("El nombre es requerido");
    }
    if (!this.email || !this.validateEmail(this.email)) {
      throw new Error("Email inválido");
    }
    if (this.age && this.age < 0) {
      throw new Error("La edad no puede ser negativa");
    }
    return true;
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

    /**
   * Convierte la entidad a objeto JSON para respuesta
   * @returns {Object} Objeto con las propiedades del usuario
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }


    /**
   * Crea una instancia de User desde datos de base de datos
   */
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

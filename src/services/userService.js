const UserRepository = require('../repositories/userRepository');

/**
 * Servicio de usuarios que contiene la lógica de negocio
 */
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers() {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw new Error(`Error obteniendo usuarios: ${error.message}`);
    }
  }

  async getUserById(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error('ID de usuario inválido');
      }

      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      throw new Error(`Error obteniendo usuario: ${error.message}`);
    }
  }

    /**
   * Crea un nuevo usuario con validación de email único
   * @async
   * @param {Object} userData - Datos del usuario a crear
   * @param {string} userData.name - Nombre del usuario
   * @param {string} userData.email - Email único del usuario
   * @param {number} [userData.age] - Edad opcional
   * @returns {Promise<User>} Usuario creado
   * @throws {Error} Si el email ya existe o datos inválidos
   */
  
  async createUser(userData) {
    try {
      if (!userData.name || !userData.email) {
        throw new Error('Nombre y email son requeridos');
      }

      const existingUser = await this.userRepository.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('El email ya está registrado');
      }

      return await this.userRepository.create(userData);
    } catch (error) {
      throw new Error(`Error creando usuario: ${error.message}`);
    }
  }

  async updateUser(id, userData) {
    try {
      if (!id || isNaN(id)) {
        throw new Error('ID de usuario inválido');
      }

      const existingUser = await this.userRepository.findById(id);
      if (!existingUser) {
        throw new Error('Usuario no encontrado');
      }

      if (userData.email && userData.email !== existingUser.email) {
        const userWithEmail = await this.userRepository.findByEmail(userData.email);
        if (userWithEmail) {
          throw new Error('El email ya está registrado por otro usuario');
        }
      }

      return await this.userRepository.update(id, userData);
    } catch (error) {
      throw new Error(`Error actualizando usuario: ${error.message}`);
    }
  }

  async deleteUser(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error('ID de usuario inválido');
      }

      const existingUser = await this.userRepository.findById(id);
      if (!existingUser) {
        throw new Error('Usuario no encontrado');
      }

      return await this.userRepository.delete(id);
    } catch (error) {
      throw new Error(`Error eliminando usuario: ${error.message}`);
    }
  }
}

module.exports = UserService;
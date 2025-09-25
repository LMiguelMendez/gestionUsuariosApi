const UserModel = require('../models/userModel');
const User = require('../entities/user');

class UserRepository {
  constructor() {
    this.model = UserModel;
  }

  async findAll() {
    try {
      const users = await this.model.findAll();
      return users.map(user => User.fromDatabase(user.toJSON()));
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const user = await this.model.findByPk(id);
      return user ? User.fromDatabase(user.toJSON()) : null;
    } catch (error) {
      throw new Error(`Error al buscar usuario por ID: ${error.message}`);
    }
  }

  async findByEmail(email) {
    try {
      const user = await this.model.findOne({ where: { email } });
      return user ? User.fromDatabase(user.toJSON()) : null;
    } catch (error) {
      throw new Error(`Error al buscar usuario por email: ${error.message}`);
    }
  }

  async create(userData) {
    try {
      const user = new User(
        null,
        userData.name,
        userData.email,
        userData.age,
        new Date(),
        new Date()
      );
      
      user.isValid();

      const createdUser = await this.model.create(user.toJSON());
      return User.fromDatabase(createdUser.toJSON());
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('El email ya está registrado');
      }
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(err => err.message).join(', ');
        throw new Error(`Datos inválidos: ${messages}`);
      }
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }

  async update(id, userData) {
    try {
      const existingUser = await this.findById(id);
      if (!existingUser) {
        throw new Error('Usuario no encontrado');
      }

      const updatedUser = new User(
        id,
        userData.name || existingUser.name,
        userData.email || existingUser.email,
        userData.age !== undefined ? userData.age : existingUser.age,
        existingUser.createdAt,
        new Date()
      );

      updatedUser.isValid();

      const [affectedRows] = await this.model.update(updatedUser.toJSON(), { 
        where: { id } 
      });

      if (affectedRows === 0) {
        throw new Error('No se pudo actualizar el usuario');
      }

      return updatedUser;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('El email ya está registrado por otro usuario');
      }
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(err => err.message).join(', ');
        throw new Error(`Datos inválidos: ${messages}`);
      }
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const affectedRows = await this.model.destroy({ where: { id } });
      if (affectedRows === 0) {
        throw new Error('No se pudo eliminar el usuario');
      }

      return true;
    } catch (error) {
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
  }
}

module.exports = UserRepository;
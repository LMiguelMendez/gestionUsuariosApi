const UserService = require('../services/userService');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getUsers(req, res) {
    try {
      const users = await this.userService.getAllUsers();
      res.json({
        success: true,
        data: users.map(user => user.toJSON()),
        count: users.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.json({
        success: true,
        data: user.toJSON()
      });
    } catch (error) {
      if (error.message.includes('no encontrado') || error.message.includes('inválido')) {
        return res.status(404).json({
          success: false,
          error: error.message
        });
      }
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }

  async createUser(req, res) {
    try {
      const { name, email, age } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({
          success: false,
          error: 'Nombre y email son requeridos'
        });
      }

      const user = await this.userService.createUser({ name, email, age });
      res.status(201).json({
        success: true,
        data: user.toJSON(),
        message: 'Usuario creado exitosamente'
      });
    } catch (error) {
      if (error.message.includes('email ya está registrado') || 
          error.message.includes('Datos inválidos')) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }

  async updateUser(req, res) {
    try {
      const { name, email, age } = req.body;
      
      if (!name && !email && age === undefined) {
        return res.status(400).json({
          success: false,
          error: 'Se requiere al menos un campo para actualizar'
        });
      }

      const user = await this.userService.updateUser(req.params.id, { name, email, age });
      res.json({
        success: true,
        data: user.toJSON(),
        message: 'Usuario actualizado exitosamente'
      });
    } catch (error) {
      if (error.message.includes('no encontrado')) {
        return res.status(404).json({
          success: false,
          error: error.message
        });
      }
      if (error.message.includes('email ya está registrado') || 
          error.message.includes('inválido')) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }

  async deleteUser(req, res) {
    try {
      await this.userService.deleteUser(req.params.id);
      res.json({
        success: true,
        message: 'Usuario eliminado exitosamente'
      });
    } catch (error) {
      if (error.message.includes('no encontrado')) {
        return res.status(404).json({
          success: false,
          error: error.message
        });
      }
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }
}

module.exports = UserController;
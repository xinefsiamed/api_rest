"use strict";module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'students',
      'email',
      { type: Sequelize.STRING, allowNull: false, unique: true },
    );
  },
};

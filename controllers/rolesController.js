const service = require("../services/rolesService");
const userService = require("../services/usersService");

exports.create = async (req, res) => {
    const data = await service.create(req.body);
    res.json(data);
};

exports.getAll = async (req, res) => {
    const data = await service.getAll();
    res.json(data);
};

exports.getById = async (req, res) => {
    const data = await service.getById(req.params.id);
    res.json(data);
};

exports.update = async (req, res) => {
    const data = await service.update(req.params.id, req.body);
    res.json(data);
};

exports.delete = async (req, res) => {
    await service.softDelete(req.params.id);
    res.json({ message: "deleted" });
};

exports.getUsersByRole = async (req, res) => {
    const users = await userService.getUsersByRole(req.params.id);
    res.json(users);
};
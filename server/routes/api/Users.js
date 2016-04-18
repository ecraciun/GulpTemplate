"use strict";
const express = require("express");
const UserRepository = require('../../data/repositories/UserRepository');
const logger = require('../../helpers/logger');
var router = express.Router();
var userRepo = new UserRepository.UserRepository();
router.get('/', function (req, res, next) {
    userRepo.GetAll().then((users) => {
        res.json(users);
    })
        .catch((err) => {
        logger.error(err);
        res.send(500, "Internal server error");
    });
});
module.exports = router;

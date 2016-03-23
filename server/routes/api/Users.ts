import express = require("express");
import * as UserRepository from '../../data/repositories/UserRepository';
import * as logger from '../../helpers/logger';

var router = express.Router();
var userRepo = new UserRepository.UserRepository();

router.get('/', function(req, res, next) {
    userRepo.GetAll().then((users) => {
        res.json(users);
    })
    .catch((err) => {
        logger.error(err);
        res.send(500, "Internal server error");
    })
});

export = router;
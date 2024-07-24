const express = require("express");
const { Sequelize } = require("sequelize");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const config = require("./config");
const passport = require("passport");

const configSession = (app) => {
  const sequelize = new Sequelize(
    config.database.databaseName,
    config.database.username,
    config.database.password,
    {
      dialect: "postgres",
      host: config.database.host,
      logging: false,
      define: {
        freezeTableName: true,
      },
      timezone: "+07:00",
    }
  );
  const myStore = new SequelizeStore({
    db: sequelize,
  });
  app.use(
    session({
      secret: "keyboard cat",
      store: myStore,
      resave: false, // we support the touch method so per the express-session docs this should be set to false
      proxy: true, // if you do SSL outside of node.
      saveUninitialized: false,
      expiration: 30 * 1000,
      cookie: {expires: 30 * 1000},
    })
  );
  myStore.sync();

  app.use(passport.authenticate("session"));

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      //   cb(null, { id: user.id, username: user.username });
      cb(null, user);
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

module.exports = configSession;

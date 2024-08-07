// create cronjob to clear limit ip use node-cron
const cron = require("node-cron");
const { Op } = require("sequelize");
const db = require("../../database/models");

cron.schedule("0 * * * *", async () => {
  const currentTime = new Date();
  const sixHoursAgo = new Date(currentTime - 6 * 60 * 60 * 1000);

  // Xóa các hàng đã quá 6 giờ
  await TaskAssignment.destroy({
    where: {
      assigned_at: {
        [Op.lt]: sixHoursAgo,
      },
    },
  });
});

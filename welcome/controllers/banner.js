const Jimp = require("jimp");
const { text } = require("../config/config.json");

module.exports = async (client, member) => {
  const channaldefaul = member.guild.systemChannelID;
  let channel = client.channels.cache.get(channaldefaul);
  let font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
  let mask = await Jimp.read("./assets/mask.png");
  let background = await Jimp.read("./assets/welcome.png");

  const URL = `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}`;
  await Jimp.read(URL)
    .then((avatar) => {
      avatar.resize(330, 330);
      mask.resize(330, 330);
      avatar.mask(mask);
      background.print(font, 30, 30, member.user.username);
      background.print(font, 790, 30, member.user.discriminator);
      background.composite(avatar, 28, 115).write("./assets/welcome_user.png");
    })
    .catch(async () => {
      await Jimp.read("./assets/noPhoto.jpg").then((avatarNull) => {
        avatarNull.resize(330, 330);
        mask.resize(330, 330);
        avatarNull.mask(mask);
        background.print(font, 30, 30, member.user.username);
        background.print(font, 790, 30, member.user.discriminator);
        background
          .composite(avatarNull, 28, 115)
          .write("./assets/welcome_user.png");
      });
    });

  channel.send(`Ola <@${member.user.id}>, ${text}`, {
    files: ["./assets/welcome_user.png"],
  });
};

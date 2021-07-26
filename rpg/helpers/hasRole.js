module.exports = (message, nameRole) => {
  let role = message.guild.roles.cache.find((role) => role.name === nameRole);
  let memberHasRole = message.member.roles.cache.has(role.id);

  return memberHasRole;
};

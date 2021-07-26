module.exports = (member, roleName) => {
  const role = member.guild.roles.cache.find((role) => role.name === "Member");

  member.roles.add(role);
};

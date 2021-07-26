module.exports = (message, userId) => {
  let element = ["Água", "Fogo", "Terra", "Ar", "Arcano"];
  let role;
  let name;
  let memberHasRole;
  let user = message.guild.members.cache.find((user) => user == userId);

  for (let nameRole of element) {
    name = nameRole;
    role = message.guild.roles.cache.find((role) => role.name === nameRole);
    memberHasRole = user._roles.includes(role.id);
    role = role.id;

    if (memberHasRole) break;
  }

  if (!memberHasRole) {
    (name = "Default"), (role = "");
  }

  return {
    id: userId,
    status: memberHasRole,
    element: name,
    elementId: role,
  };
};

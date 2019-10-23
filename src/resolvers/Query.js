const feed = (parent, args, context, info) => context.prisma.links();

const link = (parent, args, context, info) => {
  context.prisma.links().filter(link => link.id === args.id)[0];
};

module.exports = {
  feed,
  link,
};

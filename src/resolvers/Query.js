const feed = async (parent, args, context, info) => {
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter },
        ],
      }
    : {};

  const links = await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  });

  const count = await context.prisma
    .linksConnection({
      where,
    })
    .aggregate()
    .count();

  return { links, count };
};

const link = (parent, args, context, info) => {
  context.prisma.links().filter(link => link.id === args.id)[0];
};

module.exports = {
  feed,
  link,
};

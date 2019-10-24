const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserId } = require("../utils");
const { APP_SECRET } = require("../config");

const signup = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
};

const login = async (parent, args, context, info) => {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const createLink = (parent, args, context, info) => {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } },
  });
};

const updateLink = (parent, args, context, info) => {
  const userId = getUserId(context);

  return context.prisma.updateLink({
    data: {
      description: args.description,
      url: args.url,
    },
    where: {
      id: userId,
    },
  });
};

const vote = async (parent, args, context, info) => {
  const userId = getUserId(context);

  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { connect: { id: args.linkId } },
  });

  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } },
  });
};

module.exports = {
  signup,
  login,
  createLink,
  updateLink,
  vote,
};

import User from './';

const CreateUser = async (data) => {
  const user = await User.create(data);
  return user;
};

const GetUser = async (condition) => {
  const user = await User.findOne(condition);
  return user;
};

const UpdateUser = async (condition, data) => {
  await User.updateOne(condition, {
    $set: data
  });
};

export {
  CreateUser,
  GetUser,
  UpdateUser
};

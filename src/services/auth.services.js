var User = require('../models/user.model')

const changePassword = async (id, newPass) => {
  return await User.findByIdAndUpdate({_id: id}, {password : newPass});
};
const changeInfo = async (id, name, phone, address) => {
  return await User.findByIdAndUpdate({_id: id}, {name : name, phone: phone, address: address});
};
  module.exports = {
    changePassword,
    changeInfo,
  };
const AWS = require("aws-sdk");

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: process.env.AWS_REGION || "us-east-1",
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const getUserProfiles = async (params) => {
  const userProfiles = await dynamoClient.scan(params).promise();
  return userProfiles;
};

const getUserProfileByUserId = async (params) => {
  return await dynamoClient.get(params).promise();
};

const addOrUpdateProfile = async (params) => {
  return await dynamoClient.put(params).promise();
};

module.exports = {
  getUserProfileByUserId,
  getUserProfiles,
  addOrUpdateProfile,
};

// {
//     id: '1'
//     userId: 'id',
//     whyReasons: ['I want to feel better',
//                             'I want to look better'],
//     struggles: ['Bad eating habits',
//                       'Stress'],
//     yesNo: true,
//     lifestyle: 'Lightly Active'
//     eating_habit: 'I have no healthy habit'
//     past_tries: ['Nothing', 'Noom']
//     weight: 56
//     weight_unit: 'kg'
//     height: 6
//     height_unit: 'ft'
//     target_weight: 32
//     target_weight_unit: 'kg'
//     age: 31
//     gender: Male
//   }

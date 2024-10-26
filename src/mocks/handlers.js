const baseURL = "https://znapped-drfapi-8eee30ca5ab2.herokuapp.com/"

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx ) => {
    return res(ctx.json({
      "pk": 9,
      "username": "m_t",
      "email": "",
      "first_name": "",
      "last_name": "",
      "profile_id": 9,
      "profile_image": "https://res.cloudinary.com/dbzkngkda/image/upload/v1/media/images/default_profile_osp4cq",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout`, (req, res, ctx) => {
    return res(ctx.status(200));
  })
];
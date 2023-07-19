const {User, Thought} = require('../models');

const userController = {

    // GET All users
    getAllUser(req, res) {

        User.find({})
        .populate({

            path: 'friends',
            select: '-__v',

        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {

            console.log(err);
            res.sendStatus(400);

        });

    },

    // GET One user by ID
    getUserById({params}, res) {

        User.findOne({_id: params.id})
        .populate({

            path: "thoughts",
            select: "-__v",

        })
        .populate({

            path: "friends",
            select: "-__v",

        })
        .select("-__v")
        .then((dbUserData) => {

            if (!dbUserData) {

                return res
                .status(404)
                .json({ message: "Couldn't retrieve a user with that ID" });

            }
            res.json(dbUserData);

        })
        .catch((err) => {

            console.log(err);
            res.sendStatus(400);

        });

    },

    // CREATE User
    createUser({body}, res) {

        User.create(body)

          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.json(err));

    },

    // UPDATE User by ID
    updateUser({params, body}, res) {

        User.findOneAndUpdate({_id: params.id}, body, {

          new: true,
          runValidators: true,

        })
        .then((dbUserData) => {

            if (!dbUserData) {

                res.status(404).json({ message: "Couldn't retrieve a user with this IS" });
                return;

            }

            res.json(dbUserData);

          })
        .catch((err) => res.json(err));

    },

    // DELETE User
    deleteUser({params}, res) {

        User.findOneAndDelete({_id: params.id})

        .then((dbUserData) => {

            if (!dbUserData) {

              return res.status(404).json({ message: "Couldn't retrieve a user with this ID" });

            }
            
            return Thought.deleteMany({_id:{$in: dbUserData.thoughts}});

          })
        .then(() => {

            res.json({ message: "User and all thoughts deleted" });

          })
        .catch((err) => res.json(err));

    },

    // ADD friend
    addFriend({params}, res) {

        User.findOneAndUpdate(

        {_id: params.userId},
        {$addToSet: {friends: params.friendId}},
        {new: true, runValidators: true}

        )
        .then((dbUserData) => {

            if (!dbUserData) {

            res.status(404).json({message: "Couldn't retrieve a user with this ID" });
            return;

            }
            res.json(dbUserData);

        })
        .catch((err) => res.json(err));

    },

    // DELETE friend
    removeFriend({params}, res) {

        User.findOneAndUpdate(

        {_id: params.userId},
        {$pull: {friends: params.friendId}},
        {new: true}

        )
        .then((dbUserData) => {

        if (!dbUserData) {

          return res.status(404).json({ message: "Couldn't retrieve a user with this ID" });

        }
        res.json(dbUserData);

      })
      .catch((err) => res.json(err));
    },
};

module.exports = userController;
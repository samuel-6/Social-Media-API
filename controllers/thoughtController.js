const {Thought, User} = require('../models');

const thoughtController = {

    // GET ALL Thoughts
    getAllThought(req, res) {

        Thought.find({})
        .populate({

            path: 'reactions',
            select: '-__v',

        })
        .select('-__v')
        .sort({_id: -1})
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {

            console.log(err);
            res.sendStatus(400);

        });

    },

    // GET ONE Thought by ID
    getThoughtById({params}, res) {

        Thought.findOne({_id: params.id})
        .populate({

            path: 'reactions',
            select: '-__v',

        })
        .select('-__v')
        .then((dbThoughtData) => {

            if (!dbThoughtData) {

                return res.status(404).json({message: "Couldn't retrieve a thought with that ID ):"});

            }
            res.json(dbThoughtData);

        })
        .catch((err) => {

            console.log(err);
            res.sendStatus(400);

        });

    },

    // CREATE Thought
    createThought({params, body}, res) {

        Thought.create(body)
        .then(({_id}) => {

            return User.findOneAndUpdate(

                {_id: body.userId},
                {$push: {thoughts: _id}},
                {new: true}

            );

        })
        .then((dbUserData) => {

            if (!dbUserData) {

                return res
                .status(404)
                .json({message: "Thought created, but couldn't find a user with that ID"});

            }
            res.json({message: "Thought successfully created"});

        })
        .catch((err) => res.json(err));

    },

    // UPDATE Thought by ID
    updateThought({params, body}, res) {

        Thought.findOneAndUpdate({_id: params.id}, body, {

            new: true,
            runValidators: true,

        })
        .then((dbThoughtData) => {

            if (!dbThoughtData) {

                res.status(404).json({message: "Couldn't retrieve a thought with that ID"});
                return;

            }
            res.json(dbThoughtData);

        })
        .catch((err) => res.json(err));

    },

    // DELETE Thought
    deleteThought({params}, res) {

        Thought.findOndeAndDelete({_id: params.id})
        .then((dbThoughtData) => {

            if (!dbThoughtData) {

                return res.status(404).json({message: "Couldn't find a Thought with this ID"});

            }

            // REMOVE Thought ID from user's field
            return User.findOneAndUpdate(

                {thoughts: params.id},
                {$pull: {thoughts: params.id}},
                {new: true}

            );
            
        })
        .then((dbUserData) => {

            if (!dbUserData) {

                return res.status(404).json({message: "Thought created, but couldn't retrieve a user with this ID"});

            }
            res.json({message: "Thought successfully deleted"});

        })
        .catch((err) => res.json(err));

    },

    // ADD reaction
    addReaction({params, body}, res) {

        Thought.findOneAndUpdate(

            {_id: params.thoughtId},
            {$addToSet: {reactions: body}},
            {new: true, runValidators: true}

        )
        .then((dbThoughtData) => {

            if (!dbThoughtData) {

                res.status(404).json({message: "Couldn't retrieve a thought with this ID"});

            }
            res.json(dbThoughtData);

        })
        .catch((err) => res.json(err));

    },

    // DELETE reaction
    removeReaction({params}, res) {

        Thought.findOneAndUpdate(

            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}

        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));

    },

};

module.exports = thoughtController;
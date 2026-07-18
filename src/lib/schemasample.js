
let playerSchema = {
    name: String,
    gender: String,
    score: {
        believe: Number,
        doing: Number,
        trust: Number
    }
}

let sceneSchema = {
    sceneId: Number,
    speaker: String,
    dialogue: String,
    display: String,
    choices: [
        {
            choiceNumber: Number,
            description: String,
            nextSceneId: Number,
            scoring: {
                believe: Number,
                doing: Number,
                trust: Number
            }
        },
        {
            choiceNumber: Number,
            description: String,
            nextSceneId: Number,
            scoring: {
                believe: Number,
                doing: Number,
                trust: Number
            }
        },
        {
            choiceNumber: Number,
            description: String,
            nextSceneId: Number,
            scoring: {
                believe: Number,
                doing: Number,
                trust: Number
            }
        },
    ]

}
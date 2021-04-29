import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container:{
        width:'1200px',
        height:'800px',
        marginTop:'64px',
        marginLeft:'64px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        border: '1px solid black'
    },
    questionSection:{
        height:'200px',
        marginTop:'10px',
        marginBottom:'10px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        border: '1px solid black'       
    },
    stageCount:{
        marginTop:'10px',
        marginBottom:'10px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        border: '1px solid black'       
    },
    tipSection:{
        height:'200px',
        marginTop:'10px',
        marginBottom:'10px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        border: '1px solid black'       
    },
    answerSection:{
        height:'400px',
        marginTop:'10px',
        marginBottom:'10px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        border: '1px solid black'       
    },
    textBoxTextField:{
        width:"450px"
    },
}))

export default function PlayGameStages() {
    const classes = useStyles();
    const history = useHistory();
    const testQuestions = [
        {
            "question": "question0",
            "answer": "d1",
            "tip1": "tip1",
            "tip2": "tip2",
            "choice1": "d1",
            "choice2": "Bd2",
            "choice3": "Bd3",
            "choice4": "Bd4",
            "choice5": "Bd5",
            "letters": [],
            "_id": "",
            "type": "MultipleChoice"
        },
        {
            "question": "question1",
            "answer": "ABC",
            "tip1": "",
            "tip2": "",
            "choice1": "",
            "choice2": "",
            "choice3": "",
            "choice4": "",
            "choice5": "",
            "letters": ['A','N','Q','R','H','W','O','K','J','U','V','B','C','J'],
            "_id": "6070a325ad0c350524e78ea9",
            "type": "Construction"
        },
        {
            "question": "question2",
            "answer": "B1",
            "tip1": "tip1",
            "tip2": "tip2",
            "choice1": "B1",
            "choice2": "B2",
            "choice3": "B3",
            "choice4": "B4",
            "choice5": "B5",
            "letters": [],
            "_id": "",
            "type": "MultipleChoice"
        },
        {
            "question": "question3",
            "answer": "ASD",
            "tip1": "tip1",
            "tip2": "tip2",
            "choice1": "",
            "choice2": "",
            "choice3": "",
            "choice4": "",
            "choice5": "",
            "letters": ['B'],
            "_id": "6070a325ad0c350524e78ea9",
            "type": "Textbox"
        },
        {
            "question": "question4",
            "answer": "MJ",
            "tip1": "",
            "tip2": "",
            "choice1": "",
            "choice2": "",
            "choice3": "",
            "choice4": "",
            "choice5": "",
            "letters": ['A','N','Q','R','H','W','O','K','J','U','V','B','M','J'],
            "_id": "6070a325ad0c350524e78ea9",
            "type": "Construction"
        },
        {
            "question": "question5",
            "answer": "c1",
            "tip1": "tip1",
            "tip2": "tip2",
            "choice1": "c1",
            "choice2": "c2",
            "choice3": "c3",
            "choice4": "c4",
            "choice5": "c5",
            "letters": [],
            "_id": "",
            "type": "MultipleChoice"
        },
        {
            "question": "question6",
            "answer": "DDD",
            "tip1": "TIP1: ANSWER = DDD",
            "tip2": "TIP2: ANSWER = DDD",
            "choice1": "1",
            "choice2": "2",
            "choice3": "3",
            "choice4": "4",
            "choice5": "5",
            "letters": [],
            "_id": "6070a325ad0c350524e78ea9",
            "type": "Textbox"
        },
        {
            "question": "question7",
            "answer": "WO",
            "tip1": "",
            "tip2": "",
            "choice1": "",
            "choice2": "",
            "choice3": "",
            "choice4": "",
            "choice5": "",
            "letters": ['A','N','Q','R','H','W','O','K','J','U','V','B','M','J'],
            "_id": "6070a325ad0c350524e78ea9",
            "type": "Construction"
        }
    ]

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [point, setPoint] = useState(0);
    const [tip1Disabled, setTip1Disabled] = useState(false);
    const [tip2Disabled, setTip2Disabled] = useState(false);
    const [tipConstruction, setTipConstruction] = useState([-1,-1]);

    const [multipleChoiceButtonDisabled, setMultipleChoiceButtonDisabled] = useState([]);
    const [multipleChoice, setMultipleChoice] = useState(shuffle([testQuestions[currentQuestion].choice1,testQuestions[currentQuestion].choice2,testQuestions[currentQuestion].choice3,testQuestions[currentQuestion].choice4,testQuestions[currentQuestion].choice5]));
    //const [multipleChoice, setMultipleChoice] = useState([]);
    const [textboxAnswer, setTextboxAnswer] = useState('');
    const [textboxAnswerError, setTextboxAnswerError] = useState(false)
    
    const [constructionAnswer, setConstructionAnswer] = useState('')
    const [constructionAnswerError, setConstructionAnswerError] = useState(false)
    const [constructionButtonDisabled, setConstructionButtonDisabled] = useState([])
    const [constructionSubmitButtonDisabled, setConstructionSubmitButtonDisabled] = useState(false)
    const [constructionLetters, setConstructionLetters] = useState(shuffle(testQuestions[currentQuestion].letters.map(x => x)));

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
            setPoint(point + 10);
            if(tip1Disabled === false){
                setPoint(point + 3);
            }
            if(tip2Disabled === false){
                setPoint(point + 3);
            }
		}


		const nextQuestion = currentQuestion + 1;

		if (nextQuestion < testQuestions.length) {
            if (testQuestions[nextQuestion].type === "MultipleChoice") {
                initializeMultipleChoice();
            }

			setCurrentQuestion(nextQuestion);
            setTip1Disabled(false);
            setTip2Disabled(false);
            setMultipleChoiceButtonDisabled([]);
            handleResetOptionClick();
            setConstructionAnswerError(false);
            setTextboxAnswerError(false);
            setTextboxAnswer('');
            setTipConstruction([-1,-1]);

            // if (testQuestions[currentQuestion].type === "MultipleChoice") {
            //     initializeMultipleChoice();
            // }

		} else {
			setShowScore(true);
		}
	};

	const handleSubmitTextboxOptionClick = (isCorrect) => {
		if (textboxAnswer === "") {
			setTextboxAnswerError(true)
		}
        else{
            handleAnswerOptionClick(isCorrect)
        }
	};

	const handleSubmitConstructionOptionClick = (isCorrect) => {
		if (constructionAnswer === "") {
			setConstructionAnswerError(true)
		}
        else{
            handleAnswerOptionClick(isCorrect)
        }
	};

	const handleResetOptionClick = () => {
        setConstructionAnswer('');
        setConstructionButtonDisabled([]);
        var temp = constructionButtonDisabled;
        for (var i = 0; i < temp.length; i++) {
            temp[i] = false;
        }
        setConstructionAnswerError(false)
        setConstructionButtonDisabled(temp)
        
	};

    const handleAddLetterOptionClick = (letter, index) => {
        setConstructionSubmitButtonDisabled(true);
        setConstructionAnswer(constructionAnswer + letter);
        var temp = constructionButtonDisabled;
        temp[index] = true;
        setConstructionButtonDisabled(temp);
        setConstructionSubmitButtonDisabled(false);
	};
	const handleTip1OptionClick = () => {
        setTip1Disabled(true);
        if (testQuestions[currentQuestion].type === "MultipleChoice") {
            var rand = getRandomInt(5);
            while(multipleChoice[rand] === testQuestions[currentQuestion].answer.toString() || multipleChoiceButtonDisabled[rand] === true){
                rand = getRandomInt(5);
            }
            var temp = multipleChoiceButtonDisabled;
            temp[rand] = true;
            setMultipleChoiceButtonDisabled(temp);
        }
        if (testQuestions[currentQuestion].type === "Construction") {
            var answer = testQuestions[currentQuestion].answer.toString();
            var rand = getRandomInt(answer.length);
            while(tipConstruction[0] === rand || tipConstruction[1] === rand){
                rand = getRandomInt(answer.length);
            }
            var temp = tipConstruction;
            temp[0] = rand;
            setTipConstruction(temp);
        }
	};

	const handleTip2OptionClick = () => {
        setTip2Disabled(true);
        if (testQuestions[currentQuestion].type === "MultipleChoice") {
            var rand = getRandomInt(5);
            while(multipleChoice[rand] === testQuestions[currentQuestion].answer.toString() || multipleChoiceButtonDisabled[rand] === true){
                rand = getRandomInt(5);
            }
            var temp = multipleChoiceButtonDisabled;
            temp[rand] = true;
            setMultipleChoiceButtonDisabled(temp);
        }
        if (testQuestions[currentQuestion].type === "Construction") {
            var answer = testQuestions[currentQuestion].answer.toString();
            var rand = getRandomInt(answer.length);
            while(tipConstruction[0] === rand || tipConstruction[1] === rand){
                rand = getRandomInt(answer.length);
            }
            var temp = tipConstruction;
            temp[1] = rand;
            setTipConstruction(temp);
        }
	};

    const initializeMultipleChoice = () => {
        var temp = []
        temp.push(testQuestions[currentQuestion + 1].choice1);
        temp.push(testQuestions[currentQuestion + 1].choice2);
        temp.push(testQuestions[currentQuestion + 1].choice3);
        temp.push(testQuestions[currentQuestion + 1].choice4);
        temp.push(testQuestions[currentQuestion + 1].choice5);
        shuffle(temp);
        setMultipleChoice(temp);
	};

    // const initializeConstructionLetters = () => {
    //     var temp = testQuestions[currentQuestion].letters.map();
    //     shuffle(temp);
    //     setConstructionLetters(temp);
	// };

    //Fisher-Yates (aka Knuth) Shuffle. https://github.com/coolaj86/knuth-shuffle
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
    //get random integer
    function getRandomInt(max) {
    return Math.floor(Math.random() * max);
    }

	return (
		<div className='app'>
			{showScore ? (
				<Container className={classes.container}>
                    <Typography>
                        You got {score} questions correct out of {testQuestions.length} questions.
                    </Typography>
                    <Typography>
                        You obtained {point} points from completing the game.
                    </Typography>
				</Container>
			) : (
				<>
                    <Container className={classes.container}>
                        <Typography>
                            Current Obtained Points: {point}.
                        </Typography>
                        <Container id='stage-count' className={classes.stageCount}>
                            <Typography>
                                Stage {currentQuestion + 1} / {testQuestions.length}
                            </Typography>
                        </Container>
                        <Container id='question-section' className={classes.questionSection}>
                            <Typography>
                                {testQuestions[currentQuestion].question}
                            </Typography>                         
                        </Container>
                        
                        <Container id='tip-section' className={classes.tipSection}>
                            <Button variant="contained" onClick={() => handleTip1OptionClick(true)} disabled={tip1Disabled}>{"Tip Card 1"}</Button>
                            {tip1Disabled && testQuestions[currentQuestion].type === "Textbox"
                            && 
                            <Typography>{testQuestions[currentQuestion].tip1}</Typography>
                            }
                            {tip1Disabled && testQuestions[currentQuestion].type === "Construction"
                            && 
                            <Typography>{testQuestions[currentQuestion].answer.charAt(tipConstruction[0])}</Typography>
                            }
                            <Button variant="contained" onClick={() => handleTip2OptionClick(true)} disabled={tip2Disabled}>{"Tip Card 2"}</Button>
                            {tip2Disabled && testQuestions[currentQuestion].type === "Textbox"
                            &&
                            <Typography>{testQuestions[currentQuestion].tip2}</Typography>
                            }
                            {tip2Disabled && testQuestions[currentQuestion].type === "Construction"
                            && 
                            <Typography>{testQuestions[currentQuestion].answer.charAt(tipConstruction[1])}</Typography>
                            }
                        </Container>

                        <Container id='answer-section' className={classes.answerSection}>
                            {testQuestions[currentQuestion].type === "MultipleChoice"
                            &&
                            <Container id='multiple-choice-section'>
                                <Button style={{textTransform: 'none'}} variant="contained" onClick={() => handleAnswerOptionClick(multipleChoice[0] === testQuestions[currentQuestion].answer)} disabled={multipleChoiceButtonDisabled[0]}>{multipleChoice[0]}</Button>
                                <Button style={{textTransform: 'none'}} variant="contained" onClick={() => handleAnswerOptionClick(multipleChoice[1] === testQuestions[currentQuestion].answer)} disabled={multipleChoiceButtonDisabled[1]}>{multipleChoice[1]}</Button>
                                <Button style={{textTransform: 'none'}} variant="contained" onClick={() => handleAnswerOptionClick(multipleChoice[2] === testQuestions[currentQuestion].answer)} disabled={multipleChoiceButtonDisabled[2]}>{multipleChoice[2]}</Button>
                                <Button style={{textTransform: 'none'}} variant="contained" onClick={() => handleAnswerOptionClick(multipleChoice[3] === testQuestions[currentQuestion].answer)} disabled={multipleChoiceButtonDisabled[3]}>{multipleChoice[3]}</Button>
                                <Button style={{textTransform: 'none'}} variant="contained" onClick={() => handleAnswerOptionClick(multipleChoice[4] === testQuestions[currentQuestion].answer)} disabled={multipleChoiceButtonDisabled[4]}>{multipleChoice[4]}</Button>
                            </Container>
                            }
                            {testQuestions[currentQuestion].type === "Textbox"
                            &&
                            <Container id='textbox-section'>
                                <TextField
                                onChange={(e) => setTextboxAnswer(e.target.value)}
                                error={textboxAnswerError}
                                variant="outlined"
                                required
                                name="textbox-answer"
                                label=""
                                id="textboxAnswer"
                                placeholder="Your Answer"
                                //helperText="Please Enter an Answer."
                                className={classes.textBoxTextField}
                                inputProps={{style: {textTransform: 'uppercase'}}}
                                />
                                <Button variant="contained" onClick={() => handleSubmitTextboxOptionClick(textboxAnswer.valueOf().toLocaleUpperCase('en-US') === testQuestions[currentQuestion].answer.valueOf())}>{"Submit"}</Button>
                             
                            </Container>
                            }
                            {testQuestions[currentQuestion].type === "Construction"
                            &&
                            <Container id='construction-section'>
                                {constructionAnswerError
                                &&
                                <Typography>{"Please Input an Answer!"}</Typography>
                                }
                                <Typography>{"Input Answer: "}</Typography>
                                <Typography>{constructionAnswer}</Typography>
                                {constructionButtonDisabled}
                                <Button variant="contained" onClick={() => handleSubmitConstructionOptionClick(constructionAnswer.valueOf() === testQuestions[currentQuestion].answer.valueOf())} disabled={constructionSubmitButtonDisabled}>{"Submit"}</Button>
                                <Button variant="contained" onClick={() => handleResetOptionClick()} disabled={constructionSubmitButtonDisabled}>{"Reset"}</Button>
                                {testQuestions[currentQuestion].letters.map((letter, index) => (
                                    <Button variant="contained" onClick={() => handleAddLetterOptionClick(letter, index)} disabled={constructionButtonDisabled[index]}>{letter}</Button>
                                ))}
                                {/* {constructionLetters.map((letter, index) => (
                                    <Button variant="contained" onClick={() => handleAddLetterOptionClick(letter, index)} disabled={constructionButtonDisabled[index]}>{letter}</Button>
                                ))} */}
                            </Container>
                            }

                        </Container>
                    </Container>
				</>
			)}
		</div>
	);
}
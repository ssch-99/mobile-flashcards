import React, {Component} from 'react';
import {
    Container,
    Button, Content, Text, Badge, Form, H3
} from 'native-base';
import {connect} from "react-redux";
import {Notifications} from "expo";
import {createNotification} from "../utils/api";
class Quiz extends Component {

    state = {
        questions: [],
        questionIndex: 0,
        showAnswer: false,
        answeredCorrect : 0,
        answeredFalse: 0,
        deckId: 0
    }

    toggleAnswer = () => {
        this.setState((oldState) => ({
            ...oldState,
            showAnswer: !oldState.showAnswer
        }))

    }

    answer = (answer) => {

        if(answer === "correct"){

            this.setState((oldState) => ({
                ...oldState,
                showAnswer: false,
                answeredCorrect: oldState.answeredCorrect + 1,
                questionIndex: oldState.questionIndex + 1
            }))

        } else {
            this.setState((oldState) => ({
                ...oldState,
                showAnswer: false,
                answeredFalse: oldState.answeredFalse + 1,
                questionIndex: oldState.questionIndex + 1
            }))

        }

        if(this.state.questionIndex === this.state.questions.length) {
            // Remove Notification and set it up for tomorrow
            Notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                    time: tomorrow,
                    repeat: 'day',
                }
            )
        }


    }

    restart = () => {
        this.setState((oldState) => ({
            ...oldState,
            questionIndex: 0,
            showAnswer: false,
            answeredCorrect : 0,
            answeredFalse: 0,
        }))
    }

    componentDidMount() {
        const { id } = this.props.route.params;
        const deck = this.props.decks[id];


        console.log("DECK", deck)
        console.log(deck.questions)

        this.setState((oldState) => ({
            ...oldState,
            questions: deck.questions,
            deckId: id
        }))

        console.log(this.state)
    }


    render() {
        this.state.questions.map((q) => console.log(q.question))


        if(this.state.questions.length > 0) {

            if (this.state.questions.length === this.state.questionIndex) {
                return  (
                    <Container contentContainerStyle={{flexGrow: 1}}>
                        <Content style={{marginTop: 10}}>
                            <Text>You finished the quiz. You answered {(this.state.answeredCorrect / this.state.questions.length * 100).toFixed(1)} % correct.</Text>

                            <Button onPress={this.restart} style={{margin: 20, marginTop: 10}} block
                                    rounded danger>
                                <Text>Restart</Text>
                            </Button>

                            <Button onPress={() => this.props.navigation.navigate('Deck', {id: this.state.deckId })} style={{margin: 20, marginTop: 10}} block rounded
                                    primary>
                                <Text>Back to Deck</Text>
                            </Button>
                        </Content>
                    </Container>
                )
            }else {


                return (
                    <Container contentContainerStyle={{flexGrow: 1}}>
                        <Content style={{marginTop: 10}}>
                            <Badge primary style={{alignSelf: 'center'}}>
                                <Text>{this.state.questionIndex + 1} / {this.state.questions.length} Questions</Text>
                            </Badge>

                            <H3 style={{
                                textAlign: 'center',
                                marginTop: 40
                            }}>{this.state.questions[this.state.questionIndex].question}</H3>

                            {this.state.showAnswer ? <Text
                                    style={{textAlign: "center"}}>{this.state.questions[this.state.questionIndex].answer}</Text> :
                                <Text></Text>}
                            <Form>
                                <Button onPress={() => this.answer("correct")} style={{margin: 20}} block success
                                        rounded>
                                    <Text>Correct</Text>
                                </Button>
                                <Button onPress={() => this.answer("false")} style={{margin: 20, marginTop: 10}} block
                                        rounded danger>
                                    <Text>Incorrect</Text>
                                </Button>

                                <Button onPress={this.toggleAnswer} style={{margin: 20, marginTop: 10}} block rounded
                                        primary>
                                    <Text> {this.state.showAnswer ? "Hide Answer" : "Show Answer"}</Text>
                                </Button>
                            </Form>
                        </Content>
                    </Container>
                )
            }
        }else {
            return (
                <Container contentContainerStyle={{flexGrow: 1}}>
                    <Content>
                        <H3 style={{textAlign: 'center', marginTop: 40}}>ERROR</H3>

                    </Content>


                </Container>
            )
        }
    }
}


function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz)

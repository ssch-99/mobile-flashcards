import React, {Component} from 'react';
import {
    Container,
    Button, Content, Text, Form, H3, Item, Label, Input
} from 'native-base';
import Constants from 'expo-constants';
import {saveQuestion} from "../utils/api";
import {addQuestion} from "../actions";
import {connect} from "react-redux";
class AddQuestion extends Component {


    state = {
        question: '',
        answer: ''
    }

    handleQuestionChange = (question) => {

        this.setState(() => ({
            question
        }))
    }

    handleAnswerChange = (answer) => {

        this.setState(() => ({
            answer
        }))
    }

    saveQuestion = () => {
        const { id } = this.props.route.params;
        console.log(id)
        const {question,answer} = this.state
        console.log("save Card:", this.state.question, " ", this.state.answer)

         saveQuestion(id,{question: question, answer: answer}).then(() => this.props.dispatch(addQuestion(id,{question: question, answer: answer})))
        this.props.navigation.goBack()

    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <H3 style={{textAlign:"center", marginTop:40}}>Add a new Question!</H3>
                        <Item floatingLabel>
                            <Label>Question</Label>
                            <Input value={this.state.question} onChangeText={this.handleQuestionChange} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Answer</Label>
                            <Input value={this.state.answer} onChangeText={this.handleAnswerChange} />
                        </Item>
                        <Button onPress={this.saveQuestion} style={{margin:20}} block rounded>
                            <Text>Save</Text>
                        </Button>

                    </Form>
                </Content>
            </Container>
        )

    }
}

export default connect()(AddQuestion)

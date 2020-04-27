import React, {Component} from 'react';
import { Container,
    Button, Content,H3, Form, Input,Item, Label, Text } from 'native-base';
import {timeToString} from "../utils/helpers";
import {addDeck} from "../actions";
import {saveDeck} from "../utils/api";
import {connect} from "react-redux";
class AddDeck extends Component {

    state = {
        deck: {
            title: '',
            questions: []
        }
    }

    handleChange = (title) => {

        this.setState((oldState) => {
            const deck = this.state.deck
            deck.title = title

            return {
                ...oldState,
                deck
        }
        })
    }

    saveDeck = () => {
        console.log("save Deck:", this.state.deck.title)
        //TODO SAVE
        const key = timeToString()
        const deck = this.state.deck

        this.props.dispatch(addDeck({
            [key] : deck
        }))
        saveDeck({key,deck})
        this.props.navigation.goBack()
        this.props.navigation.navigate('Deck', {id: key })
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <H3 style={{textAlign:"center", marginTop:40}}>Add a new Deck!</H3>
                        <Item floatingLabel>
                            <Label>Deck Title</Label>
                            <Input value={this.state.deck.title} onChangeText={this.handleChange} />
                        </Item>
                        <Button onPress={this.saveDeck} style={{margin:20}} block rounded>
                            <Text>Save</Text>
                        </Button>

                    </Form>
                </Content>
            </Container>
        )

    }

}

export default connect()(AddDeck)

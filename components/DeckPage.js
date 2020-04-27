import React, {Component} from 'react';
import {
    Container, View,
    Button, Icon,
    Fab, Content, H1, Text,Badge
} from 'native-base';
import Constants from 'expo-constants';
import {connect} from "react-redux";
import {timeToString} from "../utils/helpers";
import {deleteDeck} from "../utils/api";
import {removeDeck} from "../actions";
class DeckPage extends Component {

    startQuiz = () => {
        console.log("start quiz")
        const { id } = this.props.route.params;
        this.props.navigation.navigate('Quiz', {id: id})
    }

    deleteDeck = () => {
        console.log("delete deck")
        const { id } = this.props.route.params;
        //TODO SAVE
        deleteDeck(id)
        this.props.navigation.goBack()
        this.props.dispatch(removeDeck(id))

    }



    render() {
        const { id } = this.props.route.params;
        const deck = this.props.decks[id];

        if(deck) {
            return (
                <Container contentContainerStyle={{flexGrow: 1}}>
                    <Content>
                        <H1 style={{textAlign: 'center', marginTop: 40}}>{deck.title}</H1>
                        <Badge primary style={{alignSelf: 'center'}}>
                            <Text>{deck.questions ? deck.questions.length : 0} Questions</Text>
                        </Badge>

                        <Button onPress={this.startQuiz} style={{margin: 20}} block rounded primary>
                            <Text>Start Quiz</Text>
                        </Button>
                        <Button onPress={this.deleteDeck} style={{margin: 20}} block rounded danger>
                            <Text>Delete Deck</Text>
                        </Button>
                    </Content>

                    <View>
                        <Fab
                            direction="up"
                            style={{backgroundColor: '#5067FF'}}
                            position="bottomRight"
                            onPress={() => this.props.navigation.navigate('AddQuestion', {id: id})}>
                            <Icon name="add"/>
                        </Fab>
                    </View>
                </Container>
            )
        } else{
            return (<Text> </Text>)
        }
    }

}
function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckPage)

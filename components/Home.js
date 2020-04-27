import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {
    Container,
    View, Icon,
    Fab, Content, H1, Text, Card, CardItem,
    Body, List, ListItem
} from 'native-base';
import {fetchDecks} from "../utils/api";
import {receiveDecks} from "../actions";
import {connect} from "react-redux";

class Home extends Component {
    componentDidMount() {

        const {dispatch} = this.props

        fetchDecks().then((decks) => {

            dispatch(receiveDecks(decks))
        })
    }


    render() {
        //Object.keys(this.props.decks).map(key => ({ key, value: this.props.decks[key] })
        return (
            <Container contentContainerStyle={{ flexGrow: 1 }}>
                <Content>
                    <List>
                        {Object.entries(this.props.decks).map(([key,value])=>{
                            return (
                                <ListItem key={key} noBorder onPress={() => this.props.navigation.navigate('Deck', {id: key})}>
                                    <Card style={{width: '100%'}}>
                                        <CardItem>
                                            <Body>
                                                <H1>{value.title}</H1>
                                                <Text>{value.questions ? value.questions.length : 0}</Text>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                </ListItem>
                            );
                        })}
                    </List>
                </Content>

                <View>
                    <Fab
                        direction="up"
                        containerStyle={{}}
                        style={{backgroundColor: '#5067FF'}}
                        position="bottomRight"
                        onPress={() => this.props.navigation.navigate('AddDeck', {})}>
                        <Icon name="add"/>
                    </Fab>
                </View>
            </Container>
        );
    }

}

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Home)


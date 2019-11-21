import React, {Component} from 'react';
// import './itemList.css';
import {ListGroup, ListGroupItem} from 'reactstrap';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const ListGroupItemCustom = styled(ListGroupItem)`
    cursor: pointer;
`;
const ListGroupCustom = styled(ListGroup)`
    cursor: pointer;
`;

export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null,
        error: false
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (charList) => {
                this.setState ({
                    charList
                })
            })
    }

    componentDidCatch() {
        // console.log('error');
        this.setState({
            error: true
        })
    }

    renderItems(arr) {
        return arr.map( (item, i) => {
            // console.log(item);
            return (
                <ListGroupItemCustom
                key={item.id}
                onClick={ () => this.props.onCharSelected(41 + i)}>
                    {item.name}
                </ListGroupItemCustom>
            )
        })
    }

    render() {

        const {charList, error} = this.state;

        
        if (!charList) {
            return <Spinner/>
        }
        
        const items = this.renderItems(charList);
        const errorMessage = error ? <ErrorMessage/> : null;


        return (
            <ListGroupCustom>
                {items}
                {errorMessage}
            </ListGroupCustom>
        );
    }
}
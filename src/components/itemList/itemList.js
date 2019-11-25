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
        // loading: true
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (charList) => {
                this.setState ({
                    charList,
                    loading: false
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
        // const item = gotService.getAllCharacters();
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
            return <ErrorMessage/>
        }
        
        // const spinner = !charList ? <Spinner/> : null;
        const items = this.renderItems(charList);
        // const errorMessage = error ? <ErrorMessage/> : null;
        // const content = !(spinner || error) ? {items} : null;

        return (
            <ListGroupCustom>
                {items}
                {/* {errorMessage}
                {spinner}
                {content} */}
            </ListGroupCustom>
        );
    }
}
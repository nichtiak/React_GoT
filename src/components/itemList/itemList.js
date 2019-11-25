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
        error: false,
        loading: true,
        errorModule: false
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (charList) => {
                this.setState ({
                    charList,
                    loading: false
                })
            })
            .catch( () => {
                this.setState ({
                    loading: false,
                    error: true
                })
            })
    }

    componentDidCatch() {
        // console.log('error');
        this.setState({
            errorModule: true
        })
    }

    renderItems(arr) {
        // const item = gotService.getAllCharacters();
        return arr.map( (item, i) => {
            console.log(item);
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

        const {charList, error, loading} = this.state;

        
        // if (!charList) {
        //     return <ErrorMessage/>
        // }
        
        const spinner = !charList ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(charList || error) ? {items} : null;
        // const items = this.renderItems(charList);
        const items = !(loading || error) ? this.renderItems(charList) : null;

        return (
            <ListGroupCustom>
                {spinner}
                {items}
                {errorMessage}
                {content}
            </ListGroupCustom>
        );
    }
}
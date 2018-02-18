import { h, Component } from 'preact';
import style from './style.css';
import classNames from 'classnames'

export const Piece = {
    'scarab': '../../assets/images/scarab.png',
    'anubis': '../../assets/images/anubis.png',
    'sphinx': '../../assets/images/sphinx.png',
    'pharaoh': '../../assets/images/pharaoh.png',
    'obelisk': '../../assets/images/obelisk.png',
    'pyramid': '../../assets/images/pyramid.png',
}



export default class Tile extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <img class={classNames(style.piece, this.props.player == 0 ? style.friendly : '')} src={Piece[this.props.type]} direction="N"/>
        )
    }
}
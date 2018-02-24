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
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event){
        this.props.onClick(this.props)
    }

    render({ player, type, onClick, col, row }, ) {
        return (
            <img
                class={classNames(style.piece, player == 0 ? style.friendly : '')}
                src={Piece[type]} direction="N"
                onClick={this.handleClick} />
        )
    }
}
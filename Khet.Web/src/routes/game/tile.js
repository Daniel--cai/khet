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

    handleClick = (event) => {
        console.log(this.props)
        this.props.onClick(this.props)
    }

    render({ player, type, onClick, col, row, rotate },{}) {
        return (
            <img
                class={classNames(style.piece, { [style.friendly]: player == 0 })}
                src={Piece[type]} direction="N"
                style={{ 'transform': `rotate(${rotate * 90}deg)` }}/>
        )
    }
}
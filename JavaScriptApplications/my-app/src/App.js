import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import logo from './logo.svg';
import './App.css';

let my_news = [
    {
        author: "Водитель Петербурга",
        text: "На Невском уже ограничения – начались дорожные работы",
        bigText: "Дорожные работы частично ограничили Невский проспект раньше обещанного. Как вечером 28 апреля передает корреспондент «Водителя Петербурга», ЗАО «ВАД» начал устанавливать ограждения на главной магистрали города в девятом часу вечера."
    },
    {
        author: "Life.ru",
        text: "В Петербурге систему видеонаблюдения в метро объединят с общегородской",
        bigText: "В ближайшее время в Петербурге систему видеонаблюдения в метро объединят с общегородской, сообщил депутат ЗакСа Алексей Цивилев. Ранее парламентарий направил соответствующий запрос губернатору Георгию Полтавченко."
    },
    {
        author: "MR7.ru",
        text: "Репетиции парада Победы в Петербурге перенесли на вечернее время",
        bigText: "Репетиции военного парада Победы перенесли с дневного времени на вечернее. Об этом рассказал командующий войсками Западного военного округа генерал-полковник Андрей Картаполов, сообщили в пресс-службе ЗВО."
    },
];

let events = require('events');
let eventEmitter = new events.EventEmitter();

/**========App Component========**/

class App extends Component {

    render() {
        return (
            <div className="App">
                <Header />
                <Intro />
            </div>
        );
    };

}

/**========Header Component========**/

class Header extends Component {

    render(){
        return (
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Hola!!! Welcome to React</h2>
            </div>
        );
    };

}

/**========Intro Component========**/

class Intro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            news: my_news
        };
    };

    componentDidMount() {
        let self = this;
        eventEmitter.addListener('News.add', function(item) {
            let nextNews = item.concat(self.state.news);
            self.setState({news: nextNews});
        });
    };

    static componentWillUnmount() {
        eventEmitter.removeListener('News.add');
    };

    render(){
        return (
            <div className="App-intro">
                <Add />
                <News data={this.state.news} />
            </div>
        );
    };

}

/**========News Component========**/

class News extends Component {

    render() {
        let data = this.props.data;
        let newsTemplate;

        if (data.length > 0) {
            newsTemplate = data.map(function(item, index) {
                return (
                    <div key={index}>
                        <Article data={item} />
                    </div>
                );
            });
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }

        return (
            <div className="news">
                {newsTemplate}
                <strong className={'news__count ' + (data.length > 0 ? '':'none')}>
                    Всего новостей: {data.length}
                </strong>
            </div>
        );
    };

}

News.propTypes = {
    data: PropTypes.array.isRequired
};

/**========Article Component========**/

class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.readmoreClick = this.readmoreClick.bind(this);
    };

    readmoreClick(e) {
        e.preventDefault();
        if (this.state.visible) {
            this.setState({visible: false});
        } else {
            this.setState({visible: true});
        }
    };

    render() {
        let author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible;

        return (
            <div className='article'>
                <p className='news__author'>{author}:</p>
                <p className='news__text'>{text}</p>
                <a href="#"
                   onClick={this.readmoreClick}
                   className={'news__readmore ' + (visible ? 'clicked': '')}>
                    Подробнее
                </a>
                <p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
            </div>
        );
    };

}

Article.propTypes = {
    data: React.PropTypes.shape({
        author: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        bigText: React.PropTypes.string.isRequired
    })
};

/**========Add Component========**/

class Add extends Component {

    constructor(props) {
        super(props);
        this.state = {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true,
            bidTextIsEmpty: true
        };
        this.onBtnClickHandler = this.onBtnClickHandler.bind(this);
        this.onCheckRuleClick = this.onCheckRuleClick.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
    };

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.author).focus();
    };

    /*
    componentWillReceiveProps(nextProps) {
        this.setState({
            likesIncreasing: nextProps.likeCount > this.props.likeCount
        });
    };
    */

    onCheckRuleClick() {
        this.setState({agreeNotChecked: !this.state.agreeNotChecked});
    };

    onBtnClickHandler(e) {
        e.preventDefault();
        let textEl = ReactDOM.findDOMNode(this.refs.text);
        let bigTextEl = ReactDOM.findDOMNode(this.refs.bigText);

        let author = ReactDOM.findDOMNode(this.refs.author).value;
        let text = textEl.value;
        let bigText = bigTextEl.value;

        let item = [{
            author: author,
            text: text,
            bigText: bigText
        }];

        eventEmitter.emit('News.add', item);

        textEl.value = '';
        bigTextEl.value = '';
        this.setState({textIsEmpty: true});
    };

    onFieldChange(fieldName, e) {
        if (e.target.value.trim().length > 0) {
            this.setState({[''+fieldName]:false});
        } else {
            this.setState({[''+fieldName]:true});
        }
    };

    render() {
        return (
            <form className='add cf'>
                <input
                    type='text'
                    className='add__author'
                    onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
                    placeholder='Ваше имя'
                    ref='author'
                />
                <input
                    type='text'
                    className='add__text'
                    onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
                    placeholder='Заголовок новости'
                    ref='text'
                />
                <textarea
                    className='add__big__text'
                    onChange={this.onFieldChange.bind(this, 'bidTextIsEmpty')}
                    placeholder='Текст новости'
                    ref='bigText'
                />
                <label className='add__checkrule'>
                    <input type='checkbox'
                           ref='checkrule'
                           onChange={this.onCheckRuleClick}/>
                    Я согласен с правилами
                </label>
                <button
                    className='add__btn'
                    onClick={this.onBtnClickHandler}
                    ref='alert_button'
                    disabled={this.state.agreeNotChecked || this.state.authorIsEmpty ||
                    this.state.textIsEmpty || this.state.bidTextIsEmpty}>
                    Добавить новость
                </button>
            </form>
        );
    };

}

export default App;

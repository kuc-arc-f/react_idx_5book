
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import $ from 'jquery';
import moment from 'moment';
import LibBook from '../../libs/LibBook';
//
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '', 
            content: '',
            type: 0,
            radio_1: 1,
            check_1: false,
            check_2: false,
            date_1 : null,
        }        
        this.id = 0
        this.handleClick = this.handleClick.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.db = null
    }
    componentDidMount(){
        this.id  = parseInt(this.props.match.params.id)
        var config = LibBook.get_const()
        this.db = new Dexie( config.DB_NAME );
        this.db.version(config.DB_VERSION).stores( config.DB_STORE );         
//console.log( this.id);
        this.get_item( this.id )
    }
    async get_item(id){
        const item = await this.db.books.get(id);
        await this.setState({ 
            title: item.title, 
            content: item.content,
            type: item.type,
            radio_1: item.radio_1,
            check_1: item.check_1,
            check_2: item.check_2,
            date_1: moment(item.date_1).format('YYYY-MM-DD'),
        }); 
        $('input[name=radio_1]').val([ item.radio_1 ])    
        $('input[name=date_1]').val(this.state.date_1 )    
console.log(this.state); 
//console.log(item );
    }
    update_item(){
        var date_str = this.state.date_1 + "T00:00:00.000Z"
        this.db.books.update(parseInt( this.id ) , {
            title: this.state.title,
            content: this.state.content,
            type: this.state.type,
            date_1: new Date( date_str ),
            radio_1: this.state.radio_1,
            check_1: this.state.check_1,
            check_2: this.state.check_2,
        });
        console.log( this.state )
        this.props.history.push("/book");
    }    
    handleClickDelete(){
//        console.log("#-handleClickDelete")
        this.db.books.delete(parseInt(this.id) );
        this.props.history.push("/book");
    }
    handleClick(){
        console.log("#-handleClick")
        this.update_item()
//        console.log( this.state )
    }
    handleChange(e){
        const target = e.target;
        const name = target.name;
        const value = target.value;
console.log(name, value)
        this.setState({
            [name]: value,
        })
    }            
    handleChangeTitle(e){
        this.setState({ title: e.target.value })
    }
    handleChangeContent(e){
        this.setState({ content: e.target.value })
    }
    handleChangeType(e){
        this.setState({type: e.target.value})
    }  
    handleChangeRadio(e){
        const target = e.target;
        const value = target.value;
 //       var radio_val  = $('input[name=radio_1]:checked').val()
        const name = target.name;
console.log(value)
//console.log(name)
        this.setState({
            [name]: parseInt(value),
        });        
    }
    handleChangeCheck(e){
        const target = e.target;
        const value = target.checked;
        const name = target.name;
//console.log(target.checked )
        this.setState({
            [name]: value,
        });
    }    
    render(){
        return (
        <div className="container">
            <Link to="/book" className="btn btn-outline-primary mt-2">Back</Link>
            <hr className="mt-2 mb-2" />            
            <h3>Book - Edit</h3>
            <hr className="mt-2 mb-2" />
            <div className="form-group">
                <label>Title:</label>
                <div className="col-sm-6">
                    <input type="text" className="form-control"
                    value={this.state.title}
                    onChange={this.handleChangeTitle.bind(this)}/>                    
                </div>
            </div>
            <div className="form-group">
                <label>Content:</label>
                <div className="col-sm-8">
                    <textarea type="text" className="form-control" rows="3"
                    onChange={this.handleChangeContent.bind(this)}
                    value={this.state.content} ></textarea>
                </div>
            </div>
            <div className="form-group">
                <label>Type:</label>
                <div className="col-sm-6">
                    <select value={this.state.type} onChange={this.handleChangeType.bind(this)}
                    className="form-control">
                        <option value="0">select please</option>
                        <option value="1">option-1</option>
                        <option value="2">option-2</option>
                        <option value="3">option-3</option>
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label>Date:</label>
                <div className="col-sm-6">
                    <input type="date" name="date_1" className="form-control" 
                    onChange={this.handleChange.bind(this)} />
                </div>
            </div>            
            <div className="form-group">
                <label>Radio:</label>
                <div className="col-sm-6">
                    <input type="radio" name="radio_1" value="1"
                     onChange={this.handleChangeRadio.bind(this)} /> radio-1
                    <br />
                    <input type="radio" name="radio_1" value="2"
                    onChange={this.handleChangeRadio.bind(this)} /> radio-2
                    <br />
                    <input type="radio" name="radio_1" value="3" 
                    onChange={this.handleChangeRadio.bind(this)} /> radio-3
                    <br />
                </div>
            </div>
            <div className="form-group">
                <label>Checkbox:</label>
                <div className="col-sm-6">
                    <input type="checkbox" name="check_1" checked={this.state.check_1}
                     onChange={this.handleChangeCheck.bind(this)} /> check_1  <br />
                    <input type="checkbox" name="check_2" checked={this.state.check_2}
                     onChange={this.handleChangeCheck.bind(this)} /> check_2  <br />
                </div>
            </div>            
            <div className="form-group">
                <button className="btn btn-primary" onClick={this.handleClick}>Save
                </button>
            </div>
            <hr />
            <div className="form-group">
                <button className="btn btn-outline-danger btn-sm mt-2"
                onClick={this.handleClickDelete}>Delete
                </button>
            </div>
            <br />
            <br />
        </div>
        )
    }
}
export default Edit;
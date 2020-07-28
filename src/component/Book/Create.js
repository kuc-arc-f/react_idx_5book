
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import $ from 'jquery';
import moment from 'moment';
import LibBook from '../../libs/LibBook';

//
class Create extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '', 
            content: '',
            type: 0,
            radio_1: 1,
            check_1: false,
            check_2: false,
            date_1 : null,
        }
        this.handleClick = this.handleClick.bind(this);
        this.db = null
    }
    componentDidMount(){
        var config = LibBook.get_const()
        this.db = new Dexie( config.DB_NAME );
        this.db.version(config.DB_VERSION).stores( config.DB_STORE );
        console.log( this.state.radio_1)
        $('input[name=radio_1]').val([ this.state.radio_1 ])
        var dt = moment().format('YYYY-MM-DD')
        $('input[name=date_1]').val( dt )
        this.setState({date_1: dt })        
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
        this.setState({title: e.target.value})
    }
    handleChangeContent(e){
        this.setState({content: e.target.value})
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
    add_item(){
        var date_str = this.state.date_1 + "T00:00:00.000Z"
        var item = {
            title: this.state.title,
            content: this.state.content,
            type: this.state.type,
            date_1: new Date( date_str ),
            radio_1: this.state.radio_1,
            check_1: this.state.check_1,
            check_2: this.state.check_2,
            created_at: new Date(),
        }
        this.db.books.add( item )
console.log( this.state )
//console.log( item )
//        console.log( task )
        this.props.history.push("/book");
    }
    handleClick(){
        console.log("#-handleClick")
        this.add_item()
//        console.log( this.state )
    }
    render() {
        return (
        <div className="container">
            <Link to="/book" className="btn btn-outline-primary mt-2">Back</Link>
            <hr className="mt-2 mb-2" />
            <h3 className="mt-2">Book - Create</h3>
            <hr className="mt-2 mb-2" />
            <div className="form-group">
                <label>Title:</label>
                <div className="col-sm-6">
                    <input type="text" className="form-control"
                    onChange={this.handleChangeTitle.bind(this)}/>                    
                </div>
            </div>            
            <div className="form-group">
                <label>Content:</label>
                <div className="col-sm-8">
                    <textarea type="text" className="form-control" rows="3"
                    onChange={this.handleChangeContent.bind(this)} ></textarea>
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

            <br />
            <div className="form-group">
                <button className="btn btn-primary" onClick={this.handleClick}>Create
                </button>
            </div>
        
        </div>
        )
    }
}
export default Create;


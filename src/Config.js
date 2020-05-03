import React from 'react';
import './css/Config.css'; 

class Config extends React.Component {
    constructor(props){
        super(props);
        this.changeValue = this.changeValue.bind(this);
        this.state = {
            rows: props.rows,
            columns: props.columns,
            mines: props.mines
        };
    }

    changeValue(event){
        const target = event.target;    
        this.setState({
            [target.name]: target.value
          });
    }
    
    renderInputField(name,max_value){
        return <input type="number" name={name} min={1} max={max_value} defaultValue={this.state[name]} onChange={this.changeValue}/>
    }

    render(){
        return (<div className="settings">
            <form onSubmit={this.props.onSubmit}>
                Rows:
                {this.renderInputField('rows',300)}
                Columns:
                {this.renderInputField('columns',300)}
                Mines:
                {this.renderInputField('mines',this.state.rows * this.state.columns)}
                <input type="submit" value="New Game" />
            </form>
            <input type="checkbox" onChange={this.props.toggleSuperman}/>
            Superman mode
        </div>)
    }
}

export default Config;